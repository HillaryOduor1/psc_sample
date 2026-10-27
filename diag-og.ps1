# diag-og.ps1
[CmdletBinding()]
param(
    [string]$Source = ".\frontend\public\assets\Public Service Commission Kenya Banner.png",
    [string]$Output = ".\frontend\public\assets\psc-og.jpg"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing -ErrorAction SilentlyContinue
if (-not ('System.Drawing.Color' -as [type])) {
    Add-Type -AssemblyName System.Drawing.Common -ErrorAction SilentlyContinue
}

function Try-Step($label, [scriptblock]$block) {
    Write-Host ""
    Write-Host ">>> $label" -ForegroundColor Cyan
    try {
        & $block
        Write-Host "<<< OK" -ForegroundColor Green
    } catch {
        Write-Host "<<< FAILED: $($_.Exception.GetType().FullName)" -ForegroundColor Red
        Write-Host "    Message: $($_.Exception.Message)" -ForegroundColor Red
        throw
    }
}

$srcFull = (Resolve-Path -LiteralPath $Source).Path
if (-not [System.IO.Path]::IsPathRooted($Output)) {
    $Output = Join-Path (Get-Location).Path $Output
}
$Output = [System.IO.Path]::GetFullPath($Output)
$outDir = [System.IO.Path]::GetDirectoryName($Output)
if (-not (Test-Path -LiteralPath $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

Write-Host "Source : $srcFull"
Write-Host "Output : $Output"
Write-Host "OutDir : $outDir   exists=$(Test-Path -LiteralPath $outDir)"

$src = $null; $dest = $null; $g = $null; $tmp = $null
try {
    Try-Step "Load source image" {
        $script:src = [System.Drawing.Image]::FromFile($srcFull)
        Write-Host "  Loaded: $($script:src.Width)x$($script:src.Height)"
    }
    $src = $script:src

    $targetW = 1200; $targetH = 630; $targetRatio = $targetW / $targetH
    $srcW = $src.Width; $srcH = $src.Height; $srcRatio = $srcW / $srcH

    Try-Step "Create destination bitmap" {
        $script:dest = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        Write-Host "  Created: $($script:dest.Width)x$($script:dest.Height)"
    }
    $dest = $script:dest

    Try-Step "Create graphics" {
        $script:g = [System.Drawing.Graphics]::FromImage($script:dest)
    }
    $g = $script:g

    Try-Step "Set quality modes" {
        $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    }

    Try-Step "Clear background" {
        $g.Clear([System.Drawing.Color]::White)
    }

    Try-Step "Compute crop" {
        if ($srcRatio -gt $targetRatio) {
            $script:cropH = $srcH
            $script:cropW = [int][Math]::Round($srcH * $targetRatio)
            $script:cropX = [int][Math]::Floor(($srcW - $script:cropW) / 2)
            $script:cropY = 0
        } else {
            $script:cropW = $srcW
            $script:cropH = [int][Math]::Round($srcW / $targetRatio)
            $script:cropX = 0
            $script:cropY = [int][Math]::Floor(($srcH - $script:cropH) / 2)
        }
        Write-Host "  Crop: $($script:cropW)x$($script:cropH) at ($($script:cropX),$($script:cropY))"
    }

    Try-Step "DrawImage" {
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
        $srcRect  = New-Object System.Drawing.Rectangle($script:cropX, $script:cropY, $script:cropW, $script:cropH)
        $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    }

    Try-Step "Get JPEG encoder" {
        $script:encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
            Where-Object { $_.MimeType -eq 'image/jpeg' } | Select-Object -First 1
        Write-Host "  Encoder: $($script:encoder.FormatDescription) ($($script:encoder.Clsid))"
    }

    Try-Step "Save to temp file" {
        $script:tmp = [System.IO.Path]::Combine($outDir, "diag-og-tmp.jpg")
        $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, [int64]82)
        $dest.Save($script:tmp, $script:encoder, $params)
        $params.Dispose()
        $info = Get-Item -LiteralPath $script:tmp
        Write-Host "  Wrote $([int]$info.Length) bytes ($([math]::Round($info.Length/1KB,1)) KB)"
    }

    Try-Step "Move temp to final" {
        if (Test-Path -LiteralPath $Output) { Remove-Item -LiteralPath $Output -Force }
        Move-Item -LiteralPath $script:tmp -Destination $Output -Force
        Write-Host "  Moved to: $Output"
    }

    Try-Step "Verify final exists" {
        if (-not (Test-Path -LiteralPath $Output)) {
            throw "File missing after Move: $Output"
        }
        $info = Get-Item -LiteralPath $Output
        Write-Host "  Final size: $([int]$info.Length) bytes"
    }
}
finally {
    if ($g -and -not $g.IsDisposed)     { $g.Dispose() }
    if ($dest)                          { $dest.Dispose() }
    if ($src)                           { $src.Dispose() }
    if ($tmp -and (Test-Path -LiteralPath $tmp)) { Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue }
}