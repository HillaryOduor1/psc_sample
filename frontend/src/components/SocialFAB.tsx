// src/components/SocialFAB.tsx
import * as React from "react";

interface FABProps {
  facebookHref?: string;
  twitterHref?: string;
  youtubeHref?: string;
  linkedinHref?: string;
}

/*
 * ES5-safe object merge. Avoids `Object.assign` (Chrome 45+)
 * and object spread (which compiles to Object.assign in an ES5
 * build with no polyfill).
 */
function mergeStyles(base: React.CSSProperties, override: React.CSSProperties): React.CSSProperties {
  var merged: any = {};
  var k: string;
  for (k in base) {
    if (Object.prototype.hasOwnProperty.call(base, k)) merged[k] = (base as any)[k];
  }
  for (k in override) {
    if (Object.prototype.hasOwnProperty.call(override, k)) merged[k] = (override as any)[k];
  }
  return merged as React.CSSProperties;
}

export default function SocialFAB(props: FABProps) {
  var facebookHref = props.facebookHref || "https://www.facebook.com/PSCKenya";
  var twitterHref = props.twitterHref || "https://twitter.com/PSCKenya";
  // TODO: confirm official PSC handles — these are placeholders.
  var youtubeHref = props.youtubeHref || "https://www.youtube.com/@PSCKenya";
  var linkedinHref = props.linkedinHref || "https://www.linkedin.com/company/psc-kenya";

  var [expanded, setExpanded] = React.useState(true);
  var [isChatbotOpen, setIsChatbotOpen] = React.useState(false);
  var [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(function () {
    if (typeof window === "undefined") return;

    function checkWidth() {
      var mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    }

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return function () {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  React.useEffect(function () {
    if (isChatbotOpen) {
      var originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return function () { document.body.style.overflow = originalOverflow; };
    }
  }, [isChatbotOpen]);

  function toggle() {
    setExpanded(!expanded);
  }

  function track(name: string) {
    try {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "social_fab_click", { platform: name });
      }
    } catch (e) { /* ignore */ }
  }

  function baseButtonStyle(bg: string, fg: string): React.CSSProperties {
    return {
      width: "48px",
      height: "48px",
      borderRadius: "9999px",
      backgroundColor: bg,
      color: fg,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
      marginTop: "12px",
      pointerEvents: "auto",
      outline: "none",
    };
  }

  function handleHoverIn(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.style.transform = "scale(1.08)";
    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.28)";
  }
  function handleHoverOut(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.22)";
  }

  var contrastBg = "var(--psc-on-surface, #1a1a1a)";
  var contrastFg = "var(--psc-surface, #ffffff)";

  var showStack = !isMobile || expanded;

  return (
    <>
      <div
        className="social-fab-container"
        style={{
          position: "fixed",
          right: "1.5rem",
          bottom: "6rem",
          zIndex: 49,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
        aria-label="Social media and support links"
      >
        {/* Chatbot */}
        {showStack && (
          <button
            type="button"
            onClick={function () { track("chatbot"); setIsChatbotOpen(true); }}
            aria-label="Open chatbot"
            style={baseButtonStyle(contrastBg, contrastFg)}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}

        {/* X / Twitter */}
        {showStack && (
          <a
            href={twitterHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={function () { track("twitter"); }}
            aria-label="Follow us on X (Twitter)"
            style={baseButtonStyle(contrastBg, contrastFg)}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        )}

        {/* Facebook */}
        {showStack && (
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={function () { track("facebook"); }}
            aria-label="Follow us on Facebook"
            style={baseButtonStyle("#1877f2", "#ffffff")}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: "block" }}>
              <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.196 2.238.196v2.476h-1.26c-1.243 0-1.63.777-1.63 1.573v1.885h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
            </svg>
          </a>
        )}

        {/* YouTube */}
        {showStack && (
          <a
            href={youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={function () { track("youtube"); }}
            aria-label="Subscribe to PSC on YouTube"
            style={baseButtonStyle("#ff0000", "#ffffff")}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </svg>
          </a>
        )}

        {/* LinkedIn */}
        {showStack && (
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={function () { track("linkedin"); }}
            aria-label="Follow PSC on LinkedIn"
            style={baseButtonStyle("#0a66c2", "#ffffff")}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
          </a>
        )}

        {/* Trigger — ONLY VISIBLE ON MOBILE */}
        {isMobile && (
          <button
            type="button"
            onClick={toggle}
            aria-label={expanded ? "Hide social links" : "Show social links"}
            aria-expanded={expanded}
            style={mergeStyles(
              baseButtonStyle("var(--psc-surface-container, #ffffff)", "var(--psc-on-surface, #1a1a1a)"),
              {
                border: "1px solid var(--psc-border, #d0d5dd)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
              }
            )}
            onMouseEnter={function (e) {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.backgroundColor = "var(--psc-surface-variant, #eeeeea)";
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "var(--psc-surface-container, #ffffff)";
            }}
          >
            {expanded ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          style={{
            /* inset: 0  →  explicit longhands (Chrome 87+ only). */
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "1.5rem",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          onClick={function () { setIsChatbotOpen(false); }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "360px",
              maxHeight: "calc(100vh - 3rem)",
              backgroundColor: "var(--psc-surface-container, #ffffff)",
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              border: "1px solid var(--psc-border, #d0d5dd)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={function (e) { e.stopPropagation(); }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderBottom: "1px solid var(--psc-border, #d0d5dd)",
                backgroundColor: "var(--psc-primary-container, #e68c00)",
                color: "var(--psc-on-primary, #ffffff)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
                <span style={{ marginRight: "8px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <h3 id="chatbot-title" style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>PSC Assistant</h3>
              </div>
              <button
                type="button"
                onClick={function () { setIsChatbotOpen(false); }}
                aria-label="Close chatbot"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              style={{
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "var(--psc-surface, #f9f7f0)",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: 700, color: "var(--psc-on-surface, #1a1a1a)" }}>
                Coming Soon!
              </h4>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "var(--psc-on-surface-variant, #4a4a4a)" }}>
                We are working hard to bring you a smart virtual assistant to help you navigate PSC services effortlessly. Check back later!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}