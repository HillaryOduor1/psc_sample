// src/components/SocialFAB.tsx
import * as React from "react";

interface FABProps {
  facebookHref?: string;
  twitterHref?: string;
}

export default function SocialFAB(props: FABProps) {
  var facebookHref = props.facebookHref || "https://www.facebook.com/PSCKenya";
  var twitterHref = props.twitterHref || "https://twitter.com/PSCKenya";

  var [expanded, setExpanded] = React.useState(true);
  var [isChatbotOpen, setIsChatbotOpen] = React.useState(false);

  // Collapse by default on very small screens to save space
  React.useEffect(function () {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 380) {
      setExpanded(false);
    }
  }, []);

  // Prevent background scrolling when chatbot modal is open
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
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      marginTop: "12px",
      pointerEvents: "auto",
    };
  }

  /*
   * Theme-aware colors:
   * - Light mode: X and Chatbot are black (high contrast on white).
   * - Dark mode: X and Chatbot are white (high contrast on dark).
   * - Facebook stays brand blue in both.
   * We use CSS variables from index.css so the flip is automatic.
   */
  var contrastBg = "var(--psc-on-surface, #1a1a1a)";
  var contrastFg = "var(--psc-surface, #ffffff)";

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
        {expanded && (
          <button
            type="button"
            onClick={function () { track("chatbot"); setIsChatbotOpen(true); }}
            aria-label="Open chatbot"
            style={baseButtonStyle(contrastBg, contrastFg)}
            onMouseEnter={function (e) {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.28)";
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.22)";
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}

        {/* X / Twitter */}
        {expanded && (
          <a
            href={twitterHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={function () { track("twitter"); }}
            aria-label="Follow us on X (Twitter)"
            style={baseButtonStyle(contrastBg, contrastFg)}
            onMouseEnter={function (e) {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.28)";
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.22)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        )}

        {/* Facebook */}
        {expanded && (
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={function () { track("facebook"); }}
            aria-label="Follow us on Facebook"
            style={baseButtonStyle("#1877f2", "#ffffff")}
            onMouseEnter={function (e) {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.28)";
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.22)";
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        )}

        {/* Trigger */}
        <button
          type="button"
          onClick={toggle}
          aria-label={expanded ? "Hide social links" : "Show social links"}
          aria-expanded={expanded}
          style={Object.assign(baseButtonStyle("var(--psc-surface-container, #ffffff)", "var(--psc-on-surface, #1a1a1a)"), {
            border: "1px solid var(--psc-border, #d0d5dd)",
            marginTop: "12px",
          })}
          onMouseEnter={function (e) { e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = "scale(1)"; }}
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
      </div>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          style={{
            position: "fixed",
            inset: 0,
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
            {/* Header */}
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
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

            {/* Body */}
            <div
              style={{
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "var(--psc-surface, #f9f7f0)",
              }}
            >
              
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--psc-on-surface, #1a1a1a)",
                }}
              >
                Coming Soon!
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--psc-on-surface-variant, #4a4a4a)",
                }}
              >
                We are working hard to bring you a smart virtual assistant to help you navigate PSC services effortlessly. Check back later!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}