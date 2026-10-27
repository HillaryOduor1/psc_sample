# ============================================================
# OpenGraph Image Converter (v2.4 — final, verified)
# Converts any image to a WhatsApp/LinkedIn/X/Facebook
# large-preview-compliant OG image (1200x630, 1.91:1, <300 KB)
# ============================================================
# Usage:
#   .\Make-OGImage.ps1 -Source "C:\path\to\input.png"
#   .\Make-OGImage.ps1 -Source "C:\path\to\input.png" -Output "C:\path\to\out.jpg"
#   .\Make-OGImage.ps1 -Source "input.png" -Quality 78 -MaxKB 250
#   .\Make-OGImage.ps1 -Source "input.png" -Fit Pad -Background "#ffffff"
#   .\Make-OGImage.ps1 -Source "input.png" -Force -Verbose
#
# Requires: Windows (uses System.Drawing / System.Drawing.Common).
# Works on Windows PowerShell 5.1 and PowerShell 7+.
# ============================================================

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$Source,

    [string]$Output = "",

    [ValidateRange(50, 100)]
    [int]$Quality = 82,

    [ValidateRange(100, 5000)]
    [int]$MaxKB = 280,

    [ValidateSet("Crop","Pad")]
    [string]$Fit = "Crop",

    [string]$Background = "#ffffff",

    [switch]$Force
)

# ------------------------------------------------------------
# Step 0: load System.Drawing (must come AFTER param()).
# ------------------------------------------------------------
$script:AssembliesLoaded = $false

try {
    Add-Type -AssemblyName System.Drawing.Common -ErrorAction Stop
    $script:AssembliesLoaded = $true
    Write-Verbose "Loaded assembly: System.Drawing.Common"
} catch {
    Write-Verbose "System.Drawing.Common not available, trying System.Drawing..."
}

if (-not $script:AssembliesLoaded) {
    try {
        Add-Type -AssemblyName System.Drawing -ErrorAction Stop
        $script:AssembliesLoaded = $true
        Write-Verbose "Loaded assembly: System.Drawing"
    } catch {
        Write-Verbose "System.Drawing not available either."
    }
}

if (-not $script:AssembliesLoaded) {
    try {
        $rid = if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64') { 'win-arm64' } else { 'win-x64' }
        $candidates = @(
            Join-Path $env:USERPROFILE ".nuget\packages\system.drawing.common\*\runtimes\$rid\lib\net*\System.Drawing.Common.dll"
            Join-Path $env:ProgramFiles "dotnet\shared\Microsoft.WindowsDesktop.App\*\System.Drawing.Common.dll"
        ) | ForEach-Object { Get-ChildItem -Path $_ -ErrorAction SilentlyContinue } |
            Select-Object -ExpandProperty FullName

        foreach ($c in $candidates) {
            try {
                Add-Type -Path $c -ErrorAction Stop
                $script:AssembliesLoaded = $true
                Write-Verbose "Loaded assembly from path: $c"
                break
            } catch { }
        }
    } catch { }
}

if (-not $script:AssembliesLoaded) {
    throw @"
Could not load System.Drawing. This script requires Windows.

Try running it from Windows PowerShell 5.1 (Start Menu -> "Windows PowerShell")
- System.Drawing is built in there. Or install the NuGet package once:

    Install-Package System.Drawing.Common -Source nuget.org ``
        -Destination "$env:USERPROFILE\.nuget\packages"
"@
}

try { [void][System.Drawing.Color]::White }
catch { throw "System.Drawing loaded but [System.Drawing.Color] is unresolvable: $($_.Exception.Message)" }

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ------------------------------------------------------------
# Helpers
# ------------------------------------------------------------
function ConvertTo-Color {
    param([string]$Hex)
    if ($Hex -notmatch '^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$') {
        throw "Invalid -Background color: $Hex (use #RRGGBB or #RGB)"
    }
    $h = $Hex.TrimStart('#')
    if ($h.Length -eq 3) {
        $h = "$($h[0])$($h[0])$($h[1])$($h[1])$($h[2])$($h[2])"
    }
    $r = [Convert]::ToInt32($h.Substring(0,2),16)
    $g = [Convert]::ToInt32($h.Substring(2,2),16)
    $b = [Convert]::ToInt32($h.Substring(4,2),16)
    [System.Drawing.Color]::FromArgb(255, $r, $g, $b)
}

function Get-JpegEncoder {
    $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
           Where-Object { $_.MimeType -eq 'image/jpeg' } |
           Select-Object -First 1
    if (-not $enc) { throw "JPEG encoder not available on this system." }
    $enc
}

function Get-ExifOrientedImage {
    param([string]$Path)
    $img = [System.Drawing.Image]::FromFile($Path)
    try {
        if ($img.PropertyIdList -contains 0x0112) {
            $prop = $img.GetPropertyItem(0x0112)
            $ori  = [BitConverter]::ToUInt16($prop.Value, 0)
            $rotate = 0; $flipX = $false; $flipY = $false
            switch ($ori) {
                2 { $flipX = $true }
                3 { $rotate = 180 }
                4 { $flipY = $true }
                5 { $rotate = 90;  $flipX = $true }
                6 { $rotate = 90 }
                7 { $rotate = 270; $flipX = $true }
                8 { $rotate = 270 }
            }
            if ($rotate -ne 0 -or $flipX -or $flipY) {
                Write-Verbose "Applying EXIF orientation $ori (rotate=$rotate, flipX=$flipX, flipY=$flipY)"
                $newW = if ($rotate -eq 90 -or $rotate -eq 270) { $img.Height } else { $img.Width }
                $newH = if ($rotate -eq 90 -or $rotate -eq 270) { $img.Width  } else { $img.Height }
                $rotated = New-Object System.Drawing.Bitmap($newW, $newH)
                $rg = [System.Drawing.Graphics]::FromImage($rotated)
                $rg.Clear([System.Drawing.Color]::Transparent)
                $rg.TranslateTransform(($rotated.Width / 2), ($rotated.Height / 2))
                $rg.RotateTransform($rotate)
                $sx = if ($flipX) { -1 } else { 1 }
                $sy = if ($flipY) { -1 } else { 1 }
                $rg.ScaleTransform($sx, $sy)
                $rg.TranslateTransform(-($img.Width / 2), -($img.Height / 2))
                $rg.DrawImage($img, 0, 0, $img.Width, $img.Height)
                $rg.Dispose()
                $img.Dispose()
                return $rotated
            }
        }
        return $img
    } catch {
        $img.Dispose()
        throw
    }
}

# ------------------------------------------------------------
# Validate source
# ------------------------------------------------------------
if (-not (Test-Path -LiteralPath $Source)) {
    throw "Source file not found: $Source"
}
$srcFull = (Resolve-Path -LiteralPath $Source).Path

# ------------------------------------------------------------
# Resolve output -- normalize with GetFullPath so .NET FromFile
# does not choke on a literal ".\" segment in the middle.
# ------------------------------------------------------------
if ([string]::IsNullOrWhiteSpace($Output)) {
    $dir  = [System.IO.Path]::GetDirectoryName($srcFull)
    $base = [System.IO.Path]::GetFileNameWithoutExtension($srcFull)
    $Output = Join-Path $dir "$base-og.jpg"
} else {
    if (-not [System.IO.Path]::IsPathRooted($Output)) {
        $Output = Join-Path (Get-Location).Path $Output
    }
}
$Output = [System.IO.Path]::GetFullPath($Output)

$outDir = [System.IO.Path]::GetDirectoryName($Output)
if (-not (Test-Path -LiteralPath $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}
if ((Test-Path -LiteralPath $Output) -and -not $Force) {
    throw "Output already exists: $Output  (use -Force to overwrite)"
}

$targetW = 1200
$targetH = 630
$targetRatio = $targetW / $targetH
$bgColor = ConvertTo-Color $Background

Write-Host ""
Write-Host "=== OpenGraph Image Converter (v2.4) ===" -ForegroundColor Cyan
Write-Host "Source      : $srcFull"
Write-Host "Target      : $Output"
Write-Host "Target size : ${targetW}x${targetH} (1.91:1, large preview)"
Write-Host "Fit         : $Fit"
Write-Host "Max size    : $MaxKB KB"
Write-Host ""

$src = $null; $dest = $null; $g = $null; $tmp = $null
try {
    $src = Get-ExifOrientedImage -Path $srcFull
    $srcW = $src.Width
    $srcH = $src.Height
    $srcRatio = $srcW / $srcH
    Write-Host "Source dims : ${srcW}x${srcH} (ratio $('{0:N3}' -f $srcRatio):1)"

    if ($srcW -lt $targetW -or $srcH -lt $targetH) {
        Write-Warning "Source is smaller than ${targetW}x${targetH} — it will be upscaled and may look soft."
    }

    $dest = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.CompositingMode    = [System.Drawing.Drawing2D.CompositingMode]::SourceOver

    $g.Clear($bgColor)

    if ($Fit -eq "Crop") {
        if ($srcRatio -gt $targetRatio) {
            $cropH = $srcH
            $cropW = [int][Math]::Round($srcH * $targetRatio)
            $cropX = [int][Math]::Floor(($srcW - $cropW) / 2)
            $cropY = 0
        } elseif ($srcRatio -lt $targetRatio) {
            $cropW = $srcW
            $cropH = [int][Math]::Round($srcW / $targetRatio)
            $cropX = 0
            $cropY = [int][Math]::Floor(($srcH - $cropH) / 2)
        } else {
            $cropW = $srcW; $cropH = $srcH; $cropX = 0; $cropY = 0
        }
        Write-Host "Crop region : ${cropW}x${cropH} at (${cropX},${cropY})"
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
        $srcRect  = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
        $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    }
    else {
        $scale = [Math]::Min($targetW / $srcW, $targetH / $srcH)
        $drawW = [int][Math]::Round($srcW * $scale)
        $drawH = [int][Math]::Round($srcH * $scale)
        $drawX = [int][Math]::Round(($targetW - $drawW) / 2)
        $drawY = [int][Math]::Round(($targetH - $drawH) / 2)
        Write-Host "Pad region  : draw ${drawW}x${drawH} at (${drawX},${drawY})"
        $g.DrawImage($src, $drawX, $drawY, $drawW, $drawH)
    }

    $dest.SetResolution(72, 72)

    $encoder = Get-JpegEncoder
    $attempts = @()
    $q = $Quality
    $acceptedQ = $null

    while ($q -ge 60) {
        $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, [int64]$q)

        $tmp = [System.IO.Path]::Combine($outDir, ".og_tmp_$([guid]::NewGuid().ToString('N')).jpg")
        $dest.Save($tmp, $encoder, $params)
        $params.Dispose()

        $tmpLen = (Get-Item -LiteralPath $tmp).Length
        $tmpKB  = $tmpLen / 1KB
        $attempts += "Q=$q -> $('{0:N1}' -f $tmpKB) KB"

        if ($tmpKB -lt $MaxKB) {
            if (Test-Path -LiteralPath $Output) { Remove-Item -LiteralPath $Output -Force }
            Move-Item -LiteralPath $tmp -Destination $Output -Force
            $tmp = $null
            $acceptedQ = $q
            break
        }
        Remove-Item -LiteralPath $tmp -Force
        $tmp = $null
        $q -= 5
    }

    if ($null -eq $acceptedQ) {
        Write-Warning "Could not get under $MaxKB KB even at quality 60 — saving at 60 anyway."
        $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, [int64]60)
        $dest.Save($Output, $encoder, $params)
        $params.Dispose()
        $acceptedQ = 60
    }

    # ---------- Verify (defensive) ----------
    if (-not (Test-Path -LiteralPath $Output)) {
        throw "Output missing after processing: $Output"
    }
    $finalFile = Get-Item -LiteralPath $Output
    $finalKB = $finalFile.Length / 1KB
    if ($finalKB -lt 1) {
        throw "Output file exists but is empty: $Output"
    }

    $verifyPath = (Resolve-Path -LiteralPath $Output).Path
    $verify = [System.Drawing.Image]::FromFile($verifyPath)
    try {
        $finalW = $verify.Width
        $finalH = $verify.Height
        $finalRatio = $finalW / $finalH
    } finally { $verify.Dispose() }

    Write-Host ""
    Write-Host "=== Attempts (quality -> size) ===" -ForegroundColor Cyan
    $attempts | ForEach-Object { Write-Host "  $_" }

    Write-Host ""
    Write-Host "=== Result ===" -ForegroundColor Cyan
    Write-Host "File      : $($finalFile.FullName)"
    Write-Host "Size      : $('{0:N0}' -f $finalFile.Length) bytes ($('{0:N1}' -f $finalKB) KB)"
    Write-Host "Dimensions: ${finalW} x ${finalH}"
    Write-Host "Aspect    : $('{0:N3}' -f $finalRatio) : 1"
    Write-Host "Format    : JPEG, 72 DPI"
    Write-Host "Quality   : $acceptedQ"

    Write-Host ""
    Write-Host "=== Compliance Checklist (large preview) ===" -ForegroundColor Cyan
    $script:allPass = $true
    function Check([string]$label, [bool]$cond) {
        if ($cond) { Write-Host "  PASS  $label" -ForegroundColor Green }
        else       { Write-Host "  FAIL  $label" -ForegroundColor Red; $script:allPass = $false }
    }

    Check "WhatsApp: width >= 300px"                       ($finalW -ge 300)
    Check "WhatsApp: min 100x100"                          ($finalW -ge 100 -and $finalH -ge 100)
    Check "WhatsApp: aspect <= 4:1"                        ($finalRatio -le 4.0)
    Check "WhatsApp: file size < 300 KB"                   ($finalKB -lt 300)
    Check "WhatsApp: hard limit < 600 KB"                  ($finalKB -lt 600)
    Check "LinkedIn: width >= 1200px"                      ($finalW -ge 1200)
    Check "LinkedIn: height >= 627px"                      ($finalH -ge 627)
    Check "LinkedIn: file size < 5 MB"                     ($finalKB -lt 5120)
    Check "X: min 300x157"                                 ($finalW -ge 300 -and $finalH -ge 157)
    Check "X: aspect between 1.85 and 2.1"                 ($finalRatio -ge 1.85 -and $finalRatio -le 2.1)
    Check "X: file size < 5 MB"                            ($finalKB -lt 5120)
    Check "Facebook: min 200x200"                          ($finalW -ge 200 -and $finalH -ge 200)
    Check "Facebook: file size < 8 MB"                     ($finalKB -lt 8192)

    Write-Host ""
    if ($script:allPass) {
        Write-Host "All checks PASSED — large-preview compliant for WhatsApp, LinkedIn, X, and Facebook." -ForegroundColor Green
    } else {
        Write-Host "One or more checks FAILED — see above." -ForegroundColor Yellow
    }

    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. The file is already at: $($finalFile.FullName)"
    Write-Host "  2. Update your <head>:"
    Write-Host "       <meta property='og:image'        content='https://your-site.com/assets/$($finalFile.Name)' />"
    Write-Host "       <meta property='og:image:type'   content='image/jpeg' />"
    Write-Host "       <meta property='og:image:width'  content='${finalW}' />"
    Write-Host "       <meta property='og:image:height' content='${finalH}' />"
    Write-Host "       <meta name='twitter:card'        content='summary_large_image' />"
    Write-Host "       <meta name='twitter:image'       content='https://your-site.com/assets/$($finalFile.Name)' />"
    Write-Host "  3. Deploy."
    Write-Host "  4. Clear caches:"
    Write-Host "       WhatsApp -> https://developers.facebook.com/tools/debug/  (Scrape Again)"
    Write-Host "       LinkedIn -> https://www.linkedin.com/post-inspector/"
    Write-Host "       X        -> https://cards-dev.twitter.com/validator"
    Write-Host "       Facebook -> https://developers.facebook.com/tools/debug/"
    Write-Host "  5. Force-refresh WhatsApp by sharing the URL with ?v=1 (bump the number each test)."
}
finally {
    if ($g)    { $g.Dispose() }
    if ($dest) { $dest.Dispose() }
    if ($src)  { $src.Dispose() }
    if ($tmp -and (Test-Path -LiteralPath $tmp)) {
        Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue
    }
}
##.\Make-OGImage.ps1 `
#  -Source ".\frontend\public\assets\Public Service Commission Kenya Banner.png" `
#  -Output ".\frontend\public\assets\psc-og.jpg" `
#  -Quality 82 `
#  -MaxKB 280 `
#  -Fit Crop `
#  -Force