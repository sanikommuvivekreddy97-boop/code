import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";

// Constants to avoid duplication
const GREED_FONT_FAMILY = "Greed Standard VF, sans-serif";
const SUBTLE_FOOTER_TOP_SHADOW = "0px -2px 8px 0px rgba(0, 0, 0, 0.06)";
const RADIUS_XL = "var(--radius-xl)";
const SHADOW_LIFT_UP_SOFT = "0px -2px 12px 0px rgba(0, 0, 0, 0.06)";
const STROKE_1_2 = "var(--stroke-1-2)";
const STROKE_1_5 = "var(--stroke-1-5)";
const ROTATE_X_180 = "rotateX(180deg)";
const ROTATE_X_360 = "rotateX(360deg)";

const IH_ICON_SIZES: Record<string, number> = {
  "2": 8,
  "2.5": 10,
  "3": 12,
  "3.5": 14,
  "4": 16,
  "4.5": 18,
  "5": 20,
  "5.5": 22,
  "6": 24,
  "6.5": 26,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
};

const IH_ICON_STROKES = ["1", "1-2", "1-4", "1-5", "1-6", "2"];

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        // Additional background tokens from Figma
        bg: {
          lightBeige: "#FBFAF8",
          section: "#ffffff",
          /** Headshot preview album picker row hover/selected (Figma). */
          albumRowHover: "#F5F5F6",
          /**
           * Edit-flow nav rail / toolbar (preview-deploy list): idle row hover — cool gray.
           */
          editFlowNavItem: {
            hover: "#F3F4F6",
            /** Emerald-100 — selected row wash */
            selected: "#D1FAE5",
          },
          surface: {
            warm: "#f6f5f3",
          },
          inputs: "#ffffff",
        },
        foreground: "var(--foreground)",
        // Design tokens from Figma
        text: {
          white: "var(--color-text-white)",
          body: "var(--color-text-primary)",
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          /** Reference upload tile title (Figma magic-edit / change-feature grid). */
          "reference-upload-heading": "#615C51",
          /** Reference upload tile dashed stroke and + icon (Figma). */
          "reference-upload-stroke": "#D6D6D6",
          beige: "#d6cfc1",
          /** Disabled label on light surfaces (secondary outline button; Figma + `border.nav-panel`). */
          disabled: "var(--color-text-disabled)",
          /** Empty-slot / DS card-button default number (#e0e1e1). */
          placeholder: "var(--color-text-placeholder)",
          highlight: "#00a36d",
          /** "astronaut" accent in the UI-like upsell banner chat prompt (Figma redesign). */
          "prompt-accent": "#00875a",
          error: "#DB4848",
          emphasis: "#003000",
          /** Another variant of primary for overlay headings */
          primaryDark: "#1A293A",
          "upsell-olive": "#484D05",
        },
        backdrop: {
          "overlay-cta": "var(--color-overlay-cta-scrim)",
          modal: "rgba(0, 4, 9, 0.6)",
          scrim: "rgba(0, 4, 9, 0.6)",
        },
        button: {
          primary: {
            default: "var(--color-button-primary-primary)",
            hover: "#000811",
            disabled: "var(--color-button-primary-disabled)",
            special: "#003000",
            "special-hover": "#002100",
            highlighted: "#858d96",
          },
          secondary: {
            "default-bg": "var(--color-button-secondary-secondary)",
            "hover-bg": "#fafafb",
            "default-stroke": "#e7e8ea",
            "hover-stroke": "#011124",
          },
          link: {
            default: "var(--color-button-link-link)",
            hover: "#006846",
          },
          /** Thin vertical divider between price and label inside the primary CTA (Figma). */
          divider: "#ffffff",
          icon: {
            black: "#011124",
            white: "#ffffff",
            green: "#00a36d",
            disabled: "#e7e8ea",
          },
        },
        border: {
          primary: "var(--color-stroke-grey)",
          grey: "var(--colors-greys-12)",
          white: "var(--color-stroke-white)",
          /** Reference upload tile dashed border (Figma). */
          "reference-upload-dashed": "#D6D6D6",
          /** Edit-flow navigation rail (Figma: #E1E2E5) */
          "nav-panel": "#E1E2E5",
          /** Referral-invite input / divider / thumbnail border (Figma #E1E2E5). */
          input: "#E1E2E5",
          secondary: "var(--color-stroke-black)",
          warm: "#dad5c9",
          "upload-card": "#C2BBAD",
          error: "#db4848",
          "neon-green": "#00EA9C",
          "beige-dark": "#BEB6B3",
          "deleted-expiring": "var(--color-deleted-expiring-tint)",
          /** Edit-flow nav: selected row stroke (emerald-200) */
          editFlowNavItemSelected: "#A7F3D0",
        },
        opacity: {
          30: "#0111244d",
          60: "#01112499",
          80: "#011124cc",
        },
        shapes: {
          green: "#003000",
          "upsell-lime": "#EEF774",
          neon: "var(--color-shapes-green-neon-green)",
          forestGreen: "var(--color-shapes-green-forest-green)",
          seafoam: "var(--color-shapes-green-seafoam)",
          "seafoam-light": "var(--color-shapes-green-seafoam-light)",
          "seafoam-pale": "var(--color-shapes-green-seafoam-pale)",
          white: "#ffffff",
          midnight: "#011124",
          /** Large-Imagine banner looks-section background (Figma 3161-14616; ≠ midnight). */
          evergreen: "#132020",
          grey: "#ebeced",
          carousels: "#344150",
          beige: "#F6F5F3",
          black: "var(--color-shapes-black)",
        },
        redo: {
          "selected-tint":
            "color-mix(in srgb, var(--color-shapes-black) 40%, transparent)",
        },
        section: {
          background: "#ffffff",
        },
        black: {
          12: "#e7e8ea",
        },
        // New design-system scales (semantic vars in globals.css)
        greys: {
          "02": "var(--color-shapes-greys-02)",
          "03": "var(--color-shapes-greys-03)",
          "08": "var(--color-shapes-greys-08)",
          10: "var(--color-shapes-greys-10)",
          12: "var(--color-shapes-greys-12)",
          20: "var(--color-shapes-greys-20)",
          40: "var(--color-shapes-greys-40)",
          60: "var(--color-shapes-greys-60)",
          80: "var(--color-shapes-greys-80)",
        },
        teal: {
          "01": "var(--color-shapes-teal-01)",
          "02": "var(--color-shapes-teal-02)",
          "03": "var(--color-shapes-teal-03)",
          "04": "var(--color-shapes-teal-04)",
        },
        promo: "var(--color-shapes-promo)",
        "promo-deep": "var(--color-shapes-promo-deep)",
        referral: {
          "tile-from": "var(--color-referral-tile-from)",
          "tile-to": "var(--color-referral-tile-to)",
          "tile-stroke": "var(--color-referral-tile-stroke)",
          "tile-badge": "var(--color-referral-tile-badge)",
          "tile-earned-from": "var(--color-referral-tile-earned-from)",
          "tile-earned-to": "var(--color-referral-tile-earned-to)",
          "tile-dash": "var(--color-referral-tile-dash)",
          "tile-earned-label": "var(--color-referral-tile-earned-label)",
          "tile-amount-base": "var(--color-referral-tile-amount-base)",
          "tile-amount-earned": "var(--color-referral-tile-amount-earned)",
          "tile-amount-overlay": "var(--color-referral-tile-amount-overlay)",
          "tile-amount-overlay-to":
            "var(--color-referral-tile-amount-overlay-to)",
          "tile-amount-shadow": "var(--color-referral-tile-amount-shadow)",
          lime: "var(--color-referral-lime)",
          "lime-soft": "var(--color-referral-lime-soft)",
          "banner-from": "var(--color-referral-banner-from)",
          "banner-to": "var(--color-referral-banner-to)",
          "banner-heading": "var(--color-referral-banner-heading)",
          "cell-from": "var(--color-referral-cell-from)",
          "cell-to": "var(--color-referral-cell-to)",
          "cell-glow": "var(--color-referral-cell-glow)",
          "cell-heading-from": "var(--color-referral-cell-heading-from)",
          "cell-heading-to": "var(--color-referral-cell-heading-to)",
          "discount-from": "var(--color-referral-reward-from)",
          "discount-to": "var(--color-referral-reward-to)",
          "discount-stroke": "var(--color-referral-reward-stroke)",
          "discount-percent": "var(--color-referral-reward-percent)",
          "discount-off": "var(--color-referral-reward-off)",
          "hero-from": "var(--color-referral-hero-from)",
          "hero-to": "var(--color-referral-hero-to)",
          "hero-stroke": "var(--color-referral-hero-stroke)",
          "heading-from": "var(--color-referral-heading-from)",
          "heading-to": "var(--color-referral-heading-to)",
          "trustpilot-from": "var(--color-referral-trustpilot-from)",
          "trustpilot-divider": "var(--color-referral-trustpilot-divider)",
        },
        "upload-scrim": "var(--color-hairstylist-upload-scrim)",
        "try-it-on-preview-scrim": "var(--color-try-it-on-preview-scrim)",
        "try-it-on-chip": "var(--color-try-it-on-chip-bg)",
        "preview-scrim": "var(--color-hairstylist-preview-scrim)",
        "preview-scrim-mob": "var(--color-hairstylist-preview-scrim-mob)",
        "preview-action-scrim": "var(--color-hairstylist-preview-action-scrim)",
        "preview-failure-scrim":
          "var(--color-hairstylist-preview-failure-scrim)",
        "splash-wheel-scrim": "var(--color-hairstylist-splash-wheel)",
        "lock-chip": "var(--color-overlay-lock-chip)",
        "tile-scrim": "var(--color-overlay-tile-scrim)",
        "tile-stroke": "var(--color-border-tile-stroke)",
        avatar: {
          "team-initials": "var(--color-avatar-team-initials)",
          "team-header-initials": "var(--color-avatar-team-header-initials)",
          "doodle-border": "var(--color-avatar-doodle-border)",
          "letter-bg": "var(--color-avatar-letter-bg)",
          "letter-border": "var(--color-avatar-letter-border)",
          "letter-text": "var(--color-avatar-letter-text)",
        },
        "team-fallback": {
          triangle: "var(--color-team-fallback-triangle)",
        },
        "team-member": {
          "tint-started": "var(--color-team-member-tint-started)",
          "tint-started-hover": "var(--color-team-member-tint-started-hover)",
          "tint-invited": "var(--color-team-member-tint-invited)",
          "tint-invited-hover": "var(--color-team-member-tint-invited-hover)",
          "tint-disabled": "var(--color-team-member-tint-disabled)",
          "status-completed": "var(--color-team-member-status-completed)",
          "status-started": "var(--color-team-member-status-started)",
          "status-invited": "var(--color-team-member-status-invited)",
          "status-disabled": "var(--color-team-member-status-disabled)",
          "status-tab": "var(--color-team-member-status-tab)",
          initial: "var(--color-team-member-initial)",
          "you-tag": "var(--color-team-member-you-tag)",
        },
        "looks-card": {
          checkbox: "var(--color-looks-card-checkbox)",
        },
        system: {
          success: "var(--color-system-success)",
          "success-soft": "var(--color-system-success-soft)",
          info: "var(--color-system-info)",
          alert: "var(--color-system-alert)",
          "alert-soft": "var(--color-system-alert-soft)",
          error: "var(--color-system-error)",
          warning: "var(--color-system-warning)",
          "success-subtle": "var(--color-system-success-subtle)",
          "success-surface": "var(--color-system-success-surface)",
          "success-tint": "var(--color-system-success-tint)",
          heart: "var(--color-system-heart)",
          "error-subtle": "var(--color-system-error-subtle)",
          "warning-subtle": "var(--color-system-warning-subtle)",
        },
        /** Uploaded-image card state tints (ink/error at 10% alpha). */
        overlay: {
          loading: "var(--color-overlay-loading)",
          error: "var(--color-overlay-error)",
          deleted: "var(--color-overlay-deleted)",
          cta: "var(--color-overlay-cta)",
          alert: "var(--color-overlay-alert)",
          selected: "var(--color-overlay-selected)",
          "upscale-pill": "var(--color-overlay-upscale-pill)",
          sheet: "var(--color-overlay-sheet)",
        },
        pill: {
          selected: "var(--color-pill-selected)",
        },
        "promo-tile": {
          bg: "var(--color-promo-tile-bg)",
          cta: "var(--color-promo-tile-cta)",
        },
        "promo-strip-text": "var(--color-promo-strip-text)",
        explore: {
          section: "var(--color-explore-section-bg)",
          "toggle-ring": "var(--color-explore-toggle-ring)",
          "day-muted": "var(--color-explore-day-muted)",
          "banner-try-it-on-bg": "var(--color-explore-banner-try-it-on)",
          "banner-hairstylist-bg": "var(--color-explore-banner-hairstylist-bg)",
          "promo-refer-ink": "var(--color-explore-promo-refer-ink)",
          "promo-gift-ink": "var(--color-explore-promo-gift-ink)",
          "promo-feedback-ink": "var(--color-explore-promo-feedback-ink)",
          "promo-teams-ink": "var(--color-explore-promo-teams-ink)",
          "promo-unlock-with-credits-ink":
            "var(--color-explore-promo-unlock-with-credits-ink)",
        },
        "new-badge": {
          "text-from": "var(--colors-new-badge-text-from)",
          "text-to": "var(--colors-new-badge-text-to)",
        },
        accent: {
          neon: "var(--color-accent-neon)",
        },
        surface: {
          inverse: "var(--color-surface-inverse)",
          "hover-wash":
            "color-mix(in srgb, var(--color-shapes-greys-03) 30%, white)",
          "selection-wash":
            "color-mix(in srgb, var(--color-shapes-greys-03) 60%, white)",
          "range-wash":
            "color-mix(in srgb, var(--color-shapes-teal-01) 30%, white)",
        },
        "reuse-fan-surface": "var(--color-reuse-fan-surface)",
        "reuse-fan-placeholder": "var(--color-reuse-fan-placeholder)",
        "team-tab-count-pill": "var(--colors-team-tab-count-pill)",
      },
      backdropBlur: {
        // Uploaded-image uploading-state overlay blur (Figma 3px).
        3: "3px",
        2: "2px",
        4: "4px",
        6: "6px",
        12: "12px",
        15: "15px",
        16: "16px",
        50: "50px",
        62: "62px",
        100: "100px",
      },
      fontFamily: {
        fustat: ["Fustat", "sans-serif"],
        greed: ["Greed Standard VF", "sans-serif"], // Keep for backward compatibility
        momo: ["var(--font-momo-signature)", "cursive"],
        baskerville: ["Libre Baskerville", "Georgia", "serif"],
      },
      fontSmooth: {
        antialiased: "antialiased",
        subpixel: "subpixel-antialiased",
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "var(--weight-light)", // 350
        normal: "var(--weight-regular)", // 420
        medium: "var(--weight-medium)", // 450
        semibold: "var(--weight-semibold)", // 480
        bold: "600",
        extraBold: "700",
        black: "800",
        heavy: "900",
      },
      fontSize: {
        8: "0.5rem", // 8px
        10: "0.625rem", // 10px
        12: "0.75rem", // 12px
        14: "0.875rem", // 14px
        base: "1rem", // 16px
        18: "1.125rem", // 18px
        20: "1.25rem", // 20px
        22: "1.375rem", // 22px
        24: "1.5rem", // 24px
        26: "1.625rem", // 26px
        28: "1.75rem", // 28px
        32: "2rem", // 32px
        /** Large-Imagine banner "Create" title, mobile (Figma 3161-14636). */
        34: "2.125rem", // 34px
        36: "2.25rem", // 36px
        40: "2.5rem", // 40px
        44: "2.75rem", // 44px
        48: "3rem", // 48px
        56: "3.5rem", // 56px
        100: "6.25rem", // 100px
        /** Pricing badge / discount pill: 11px size, 14px line-height, 0.88px tracking. */
        "pricing-badge": [
          "0.6875rem",
          { lineHeight: "0.875rem", letterSpacing: "0.88px" },
        ],
      },
      lineHeight: {
        12: "0.75rem", // 12px
        14: "0.875rem", // 14px
        15: "0.9375rem", // 15px
        16: "1rem", // 16px
        18: "1.125rem", // 18px
        20: "1.25rem", // 20px
        22: "1.375rem", // 22px
        24: "1.5rem", // 24px
        26: "1.625rem", // 26px
        28: "1.75rem", // 28px
        32: "2rem", // 32px
        36: "2.25rem", // 36px
        40: "2.5rem", // 40px
        44: "2.75rem", // 44px
        48: "3rem", // 48px
        56: "3.5rem", // 56px
        // Relative line heights for Figma design
        "1.3": "1.3",
        "1.4": "1.4",
        "1.5": "1.5",
      },
      letterSpacing: {
        tighter: "-0.02rem",
        tight: "-0.01rem",
        normal: "0rem",
        wide: "0.01rem",
        wider: "0.02rem",
        "pos-8pct": "0.08em",
        "neg-0.2": "-0.2px",
        "neg-3pct": "-0.03em",
        "neg-0.64": "-0.64px",
        "neg-0.56": "-0.56px",
        "neg-0.48": "-0.48px",
        "neg-0.4": "-0.4px",
        "neg-0.32": "-0.32px",
        "neg-0.288": "-0.288px",
        "neg-0.256": "-0.256px",
        "neg-0.224": "-0.224px",
        "neg-0.192": "-0.192px",
      },
      gap: {
        // Figma gap tokens
        text: "4px",
        fields: "16px",
        tabs: "12px",
        section: "40px",
      },
      spacing: {
        0.75: "0.1875rem",
        1.6: "0.4rem",
        1.25: "0.3125rem",
        1.75: "0.4375rem",
        42.5: "10.625rem",
        8.5: "2.125rem",
        12.5: "3.125rem",
        3.75: "0.9375rem",
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "14.5": "3.625rem",
        10.5: "2.625rem",
        11.25: "2.8125rem",

        6.5: "1.625rem",
        7.5: "1.875rem",
        // Header dropdown row box (52px) — uniform hover-state height across items.
        13: "var(--spacing-52)",
        13.5: "3.375rem",
        // Imagine header height (60px) — enables top-15 for header-docked overlays.
        15: "3.75rem",
        18: "4.5rem",
        // Team member profile drawer avatar: 120px mweb / 132px md+.
        30: "7.5rem",
        25: "6.25rem",
        33: "8.25rem",
        2.25: "0.5625rem",
        // Custom look request textarea once references are attached (200px).
        50: "12.5rem",
        2.75: "0.6875rem",
        3.25: "0.8125rem",
        13.75: "3.4375rem",
        22: "5.5rem",
        22.5: "5.625rem",
        26.5: "6.625rem",
        27.25: "6.8125rem",
        28.75: "7.1875rem",
        37: "9.25rem",
        35.5: "8.875rem",
        36.25: "9.0625rem",
        39: "9.75rem",
        40.5: "10.125rem",
        78.5: "19.625rem",
        92.5: "23.125rem",
        97: "24.25rem",
        97.5: "24.375rem",
        138.75: "34.6875rem",
        140: "35rem",
        "profile-badge-top": "6.75rem",
        "profile-ring-glow": "0.265625rem",
        // Promo timer banner copy: 35px inset, 15px stack gap on mobile.
        "promo-tile-inset": "2.1875rem",
        "promo-tile-gap": "0.9375rem",
        // How far the mobile gallery sheet tucks over the welcome name's
        // bottom edge (Figma 13617-25390). Lands on the name's baseline, so a
        // lowercase name keeps its letterforms — 15 clipped them.
        "gallery-sheet-overlap": "0.75rem",
        // Mobile gallery sheet tail: 40px clear air after the last row plus
        // the 100px docked CTA the content scrolls out from under. Keeps the
        // sheet's bottom edge — and its shadow — off-screen.
        "gallery-sheet-tail": "8.75rem",
        // Recently-deleted card: footer padding above the button row, so the row
        // clears the image it tucks under by 8px.
        "deleted-card-footer-top": "1.375rem",
        "referral-faq-cta": "5.4375rem",
        "preview-tool": "4.125rem",
        "preview-tool-lg": "4.8125rem",
        "preview-carousel-lane": "6.5rem",
        "preview-timer-lane": "2.375rem",
        "dashboard-header": "var(--spacing-60)",
        "upscale-print-ready-dashed-lg-top": "2.788125rem",
        "upscale-print-ready-dashed-sm-top": "5.526875rem",
        "upscale-print-ready-thumb-top": "8.0625rem",
        "upscale-print-ready-thumb-left": "0.78125rem",
        "try-it-on-product": "18rem",
        "try-it-on-product-image": "18.75rem",
        "try-it-on-product-mob": "14.5rem",
        "try-it-on-product-image-mob": "15.1875rem",
        "try-it-on-product-tab": "20.3125rem",
        "try-it-on-product-image-tab": "21.25rem",
        "try-it-on-sheet-cta": "21.375rem",
        "try-it-on-look-card": "10.25rem",
        "try-it-on-look-card-h": "12rem",
        "try-it-on-look-image": "10rem",
        "try-it-on-look-upload-badge": "2.625rem",
        "try-it-on-look-upload-tile": "10.4375rem",
        "try-it-on-detected-hero": "17.5rem",
        "try-it-on-detected-hero-sm": "12.5rem",
        "try-it-on-detected-hero-grid-web": "15rem",
        "try-it-on-suggestion-tab": "9.25rem",
        "try-it-on-suggestion-image-tab": "9rem",
        "try-it-on-option-card": "6.8125rem",
        "try-it-on-option-card-h": "8.875rem",
        "try-it-on-option-image": "7.125rem",
        "try-it-on-option-card-tab": "9.375rem",
        "try-it-on-option-card-tab-h": "12.3125rem",
        "try-it-on-option-image-tab": "9.875rem",
        "try-it-on-detected-row-thumb": "3.25rem",
        "try-it-on-detected-row-thumb-h": "3.5625rem",
        "try-it-on-compact-caption": "3.75rem",
        "try-it-on-tab-caption": "4.125rem",
        "try-it-on-tab-cta": "22.5rem",
        "try-it-on-sheet-grip": "3rem",
        "try-it-on-thumbnail-rail": "5.25rem",
        "try-it-on-slot-tab": "13.75rem",
        "try-it-on-slot-tab-h": "16.0625rem",
        "try-it-on-slot-tab-image": "13.5rem",
        "try-it-on-picker-tab-h": "12.5rem",
        "try-it-on-thumbnail": "3.75rem",
        "try-it-on-thumbnail-image": "3.25rem",
        "try-it-on-thumbnail-rule": "2.4375rem",
        "try-it-on-result-caption": "4.75rem",
        "try-it-on-result-caption-tab": "4.5rem",
        "try-it-on-complete-cta": "8.75rem",
        "try-it-on-dropzone": "25rem",
        "try-it-on-dropzone-mweb-h": "12.875rem",
        "try-it-on-dropzone-tab-h": "10.9375rem",
        "try-it-on-dropzone-tab-w": "31.25rem",
      },
      inset: {
        "profile-ring-glow": "0.265625rem",
        "explore-stack-back-x": "1.842rem",
        "explore-stack-caption": "0.6875rem",
        "hairstylist-divider": "23.5rem",
        "try-it-on-divider": "23.875rem",
        "try-it-on-dropzone-dash": "0.5rem",
        "try-it-on-picker-dash": "0.3125rem",
      },
      rotate: {
        coupon: "9.47deg",
        tilt: "4deg",
      },
      gridTemplateColumns: {
        "editing-tools": "repeat(3, 4.5rem)",
        "editing-tools-wide": "repeat(5, 4.5rem)",
        "headshot-select": "repeat(auto-fill, minmax(11.25rem, 1fr))",
        "explore-whats-new": "332fr 332fr 550fr",
        "explore-daily": "minmax(0, 1fr) 27.375rem minmax(0, 1fr)",
      },
      borderRadius: {
        // New design-system radius scale (semantic vars in globals.css)
        none: "var(--radius-none)", // 0
        "3xs": "var(--radius-3xs)", // 1
        "2xs": "var(--radius-2xs)", // 2
        xs: "var(--radius-xs)", // 4
        sm: "var(--radius-sm)", // 6
        DEFAULT: "var(--radius-m)", // 8
        md: "var(--radius-m)", // 8
        lg: "var(--radius-lg)", // 12
        chip: "var(--radius-chip)", // 14
        "card-ring": "var(--radius-card-ring)", // 18
        xl: RADIUS_XL, // 16
        "2xl": RADIUS_XL, // 16
        "3xl": RADIUS_XL, // 16
        "4xl": "var(--radius-28)", // 28
        full: "var(--radius-circle)", // 999
        // Figma redesign radii (UI-like upsell banner): numeric-px naming like fontSize/lineHeight.
        4: "0.25rem",
        8: "0.5rem",
        10: "var(--radius-10)",
        12: "0.75rem",
        20: "var(--radius-20)",
        14.4: "0.9rem",
      },
      opacity: {
        8: "0.08",
        64: "0.64",
        24: "0.24",
        44: "0.44",
      },
      scale: {
        // 28px preview sparkle badge drawn at the 24px mobile size.
        "hairstylist-sparkle-mob": "0.857143",
      },
      zIndex: {
        1: "1",
        2: "2",
        70: "70",
        80: "80",
        90: "90",
        // Delete theater: the preview lives inside a Radix modal portal whose
        // elevated/nested stacks reach z-230, so the can must clear that band.
        "trash-flight": "240",
      },
      textDecorationThickness: {
        1.5: "1.5px",
      },
      blur: {
        xs: "0.125rem",
      },
      transitionTimingFunction: {
        "soft-spring": "cubic-bezier(0.34, 1.2, 0.64, 1)",
        "spring-pop": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        standard: "ease",
      },
      transitionProperty: {
        "transform-opacity": "transform, opacity",
        height: "height",
        filter: "filter",
        "filter-transform": "filter, transform",
      },
      strokeWidth: {
        // New design-system stroke scale (primitive vars in globals.css)
        0.5: "var(--stroke-0-5)",
        1: "var(--stroke-1)",
        1.2: STROKE_1_2,
        1.4: "var(--stroke-1-4)",
        1.5: STROKE_1_5,
        1.6: "var(--stroke-1-6)",
        2: "var(--stroke-2)",
        2.2: "var(--stroke-2-2)",
        2.4: "var(--stroke-2-4)",
        2.5: "var(--stroke-2-5)",
        2.6: "var(--stroke-2-6)",
        4: "var(--stroke-4)",
      },
      aspectRatio: {
        "try-it-on-base-mweb": "374 / 429",
        "hairstylist-preview-mob": "374 / 389",
        "try-it-on-base-tab": "728 / 777",
        // Eras shoots render portrait 2.5x3.5 surfaces (photo-print ratio).
        eras: "2.5 / 3.5",
        "share-hero": "596 / 648",
        "looks-card-image": "220 / 222",
        "grid-promo-tile": "382 / 154",
        // Unpaid promo timer banner, mobile band (Figma 14927-8933: 382x154).
        "promo-tile": "382 / 154",
        envelope: "309 / 195",
        "upsell-video": "12 / 11",
        "selection-mode-collage": "526 / 436",
        "hairstylist-preview": "342 / 364",
        "explore-try-it-on-mobile": "342 / 299",
        "explore-try-it-on-tablet": "696 / 387",
        "explore-try-it-on-web": "1232 / 368",
      },
      outlineWidth: {
        1.2: STROKE_1_2,
      },
      ringWidth: {
        1.5: STROKE_1_5,
      },
      borderWidth: {
        0.5: "var(--stroke-0-5)",
        1.2: STROKE_1_2,
        1.4: "var(--stroke-1-4)",
        1.5: STROKE_1_5,
        1.6: "var(--stroke-1-6)",
        2.2: "var(--stroke-2-2)",
        2.4: "var(--stroke-2-4)",
        2.5: "var(--stroke-2-5)",
        2.6: "var(--stroke-2-6)",
        3: "var(--stroke-3)",
      },
      screens: {
        // Figma screen breakpoints (literal px — @media can't read CSS vars)
        mobile: "390px",
        tablet: "744px",
        web: "1280px",
      },
      padding: {
        "icon-button-y": "4px",
        "page-x": "16px",
        "page-y": "16px",
        // Desktop hairstylist preview: 56px air below the 36px base-look caption.
        "hairstylist-preview-tail": "5.75rem",
        "welcome-avatar-ring": "var(--welcome-avatar-ring-p)",
      },
      height: {
        "cta-divider": "0.8125rem",
        "upload-progress-marker": "1.1875rem",
        "upload-progress-marker-bar": "0.9375rem",
        "upload-tile-tablet": "6.625rem",
        "upload-tile-web": "6.25rem",
        "upload-qr": "6.875rem",
        "upload-illustration": "22.125rem",
        9.5: "2.375rem",
        "envelope-flap": "56.41%",
        "envelope-pocket": "44.62%",
        "flow-header": "3.75rem",
        "gift-card-fan-mobile": "22.5rem",
        "gift-card-fan-tablet": "38.375rem",
        "gift-card-fan-desktop": "24.5rem",
        "gift-create-banner": "11.125rem",
        "gift-card-artwork": "13rem",
        "gift-card-artwork-desktop": "11.5625rem",
        "gift-home-card-mobile": "19.125rem",
        "gift-home-card-tablet": "18.875rem",
        "gift-home-card-desktop": "18.0625rem",
        15: "3.75rem",
        "team-grid-card": "19.5rem",
        "team-grid-media": "15rem",
        "team-grid-media-hover": "13.75rem",
        "team-stat-tabs": "4.375rem",
        "team-tab-indicator": "0.1875rem",
        "upscale-print-ready-main": "14.9375rem",
        "upscale-print-ready-dashed-lg": "12.149375rem",
        "upscale-print-ready-dashed-sm": "9.410625rem",
        "upscale-print-ready-thumb": "6.6720625rem",
        "upscale-print-ready-thumb-box": "7.4484375rem",
        "package-card": "10.25rem", // 164px
        "payment-hero": "5.75rem", // 92px
        // Unpaid promo timer banner from `sm`: a fixed 299px band at every
        // width (Figma tablet 15340-9583, web 13617-35008).
        "promo-tile": "18.6875rem",
        "welcome-laurel": "var(--welcome-laurel-h)",
        "explore-tile": "15.625rem",
        "explore-banner": "11.25rem",
        "explore-promo": "11.125rem",
        "explore-day-thumb": "3.125rem",
        "explore-toggle-item": "3.25rem",
        "explore-stack-back": "14.0625rem",
        "save-wallet": "4.8125rem",
        "save-wallet-back": "6.8125rem",
        "save-wallet-pocket": "6.0625rem",
        "save-wallet-card": "23.75rem",
        "preference-sheet": "90dvh",
      },
      width: {
        "team-add-menu": "21.375rem",
        // Upload progress bar: distance from the track start to the minimum marker's centre.
        "upload-progress-min": "5.6875rem",
        "upload-progress-min-tablet": "6.9375rem",
        "upload-tile-tablet": "6.625rem",
        "upload-tile-web": "6.25rem",
        "upload-qr": "6.875rem",
        "upload-divider-line": "7.5rem",
        "upload-illustration": "22.75rem",
        "team-status-tab-curve": "2.125rem",
        "upsell-video": "21.875rem",
        68: "17rem",
        // Wax seal: 74px of the 309px envelope width.
        "envelope-seal": "23.95%",
        /** Full-bleed within p-6 sheet padding (24px × 2). */
        "bleed-p6": "calc(100% + 3rem)",
        /** Stripe checkout modal fluid width on tablet (Figma): 95vw, then capped by `max-w-checkout`. */
        checkout: "95vw",
        search: "19.125rem",
        "team-search": "22.5rem",
        "survey-cta": "22.5rem",
        "team-row-status": "5.5rem",
        "team-stat-pill": "6.375rem",
        "filter-menu": "11.25rem",
        "dashboard-view-toggle": "4.625rem",
        "dashboard-sort-trigger": "14.8125rem",
        "dashboard-sort-value": "9.9375rem",
        "dashboard-payment-filter": "9.9375rem",
        "dashboard-invited-filter": "6.875rem",
        "price-panel": "19rem", // 304px
        "welcome-laurel": "var(--welcome-laurel-w-splash)",
        "welcome-laurel-landed": "var(--welcome-laurel-w-landed)",
        "upscale-print-ready-main": "14.9375rem",
        "upscale-print-ready-dashed-lg": "12.149375rem",
        "upscale-print-ready-dashed-sm": "9.410625rem",
        "upscale-print-ready-thumb": "6.6720625rem",
        "upscale-print-ready-thumb-box": "7.4484375rem",
        "upscale-print-ready-badge": "7.125rem",
        "login-testimonial": "22.4375rem",
        /** Photo-style option card on tablet (Figma create-profile): 342px, centred in the 536px column. */
        "style-option-card": "21.375rem",
        /** Unlock pack-selection modal panel: 539px from tablet up. */
        "unlock-pack": "33.6875rem",
        "delete-toast": "21.375rem",
        "review-card": "21.375rem",
        "trustpilot-logo": "5.125rem",
        "trustpilot-logo-sm": "3.625rem",
        "explore-tile": "12.375rem",
        "explore-studio": "13.75rem",
        "explore-studio-mobile": "12.5rem",
        "explore-promo": "25.1875rem",
        "explore-carousel-mobile": "21.375rem",
        "explore-daily-photo": "27.375rem",
        "explore-day-thumb": "2.75rem",
        "explore-try-it-on-copy": "18.625rem",
        "explore-try-it-on-copy-web": "37.875rem",
        "explore-toggle-item": "5.625rem",
        "explore-stack-back": "11.1375rem",
        "save-wallet": "21.375rem",
        "save-wallet-card": "20.1875rem",
      },
      maxHeight: {
        "try-it-on-sheet": "88vh",
        /** Stripe checkout modal: full viewport height minus a 2rem top/bottom inset. */
        checkout: "calc(100vh - 4rem)",
        "team-members-modal": "36.6875rem", // 587px
        "bulk-edit-member-picker": "34.25rem", // 548px
        "pricing-modal-tablet": "54.6875rem",
        "credit-usage-table": "22.6875rem",
        "preference-sheet": "90dvh",
        "hairstylist-preview": "35rem",
      },
      minHeight: {
        "try-it-on-card": "9.25rem",
        "try-it-on-card-tab": "10.75rem",
        "try-it-on-card-web": "9.0625rem",
        "try-it-on-caption-web": "3.4375rem",
        "try-it-on-result-caption-web": "4.5rem",
        "try-it-on-compact-caption": "3.75rem",
        "try-it-on-tab-caption": "4.125rem",
        "try-it-on-result-caption": "4.75rem",
        "try-it-on-result-caption-tab": "4.5rem",
        "gift-intro-mobile": "42.1875rem",
        "gift-intro-tablet": "67.0625rem",
        "gift-intro-desktop": "41.875rem",
        "login-testimonial": "25.625rem",
      },
      minWidth: {
        "team-row-status": "5.5rem",
        "team-status-tab": "5.6875rem",
        "dashboard-sort-value": "9.9375rem",
        "hairstylist-pref-chip": "5.875rem",
        "hairstylist-pref-chip-tab": "12.5rem",
      },
      boxShadow: {
        "referral-hero": [
          "0px -2.179px 34.864px 0px rgba(0, 0, 0, 0.1)",
          "0px 2.179px 34.864px 0px rgba(0, 0, 0, 0.1)",
        ],
        "referral-discount-arc":
          "0px -4px 32px 0px rgba(0, 135, 90, 0.1), inset 0px 2px 32px 0px #ffffff",
        "referral-discount-card": [
          "0px -2.039px 32.62px 0px rgba(0, 0, 0, 0.1)",
          "0px 2.039px 32.62px 0px rgba(0, 0, 0, 0.1)",
        ],
        "referral-envelope": "0px 2px 16px 0px rgba(0, 71, 47, 0.08)",
        "referral-seal": "0px 1px 4px 0px rgba(37, 141, 96, 0.25)",
        // Sticky mobile "Pay & Download" footer: subtle upward shadow lifting it
        // off the gallery below (Figma 82-3123).
        "footer-top": "0px -4px 12px 0px rgba(0, 0, 0, 0.1)",
        // Delete-reason sheet: soft red-tinted glow above the docked sheet.
        "delete-sheet": "0px -2px 30px 0px rgba(219, 72, 72, 0.1)",
        "delete-sheet-lg": "0px -22px 30px 0px rgba(219, 72, 72, 0.1)",
        /** UI-like upsell banner chat input (Figma redesign: 0/6/32 @ 12%). */
        "banner-input": "0px 6px 32px 0px rgba(0, 0, 0, 0.12)",
        /** UI-like upsell banner send button (Figma redesign: 0/2/32 @ 12%). */
        "banner-send": "0px 2px 32px 0px rgba(0, 0, 0, 0.12)",
        dropdown: "0px 10px 16px 0px rgba(0, 0, 0, 0.1)",
        /** Create-profile style preview panel/tiles (Figma create-profile: 0/2/32 @ 10%). */
        "style-preview": "0px 2px 32px 0px rgba(0, 0, 0, 0.1)",
        /** Selected pack tier card. */
        "unlock-pack-card": "0px 3px 6px 0px rgba(0, 0, 0, 0.08)",
        "try-it-on-sheet-top": "0px -2px 6px 0px rgba(0, 0, 0, 0.06)",
        "upload-footer-top": SUBTLE_FOOTER_TOP_SHADOW,
        "redo-footer-top": SUBTLE_FOOTER_TOP_SHADOW,
        "gift-footer-top": SUBTLE_FOOTER_TOP_SHADOW,
        // Sticky select-looks header / tab bar: subtle downward shadow (mirror of footer-top).
        "header-bottom": "0px 3px 6px 0px rgba(0, 0, 0, 0.04)",
        "header-collapsed": "0px -2px 12px 0px rgba(0, 0, 0, 0.08)",
        // Onboarding profile thumbnail (Redesign 01 indiv-creator): soft drop shadow.
        thumbnail: "0px 2px 12px 0px rgba(0, 0, 0, 0.2)",
        "thumbnail-card": "0px 4px 32px 0px rgba(0, 0, 0, 0.1)",
        "reference-thumb": "0px 0px 16px 0px rgba(0, 0, 0, 0.16)",
        "gift-quantity-mobile":
          "inset 0 0 0 1px var(--color-stroke-grey), 0px 2px 6px 0px rgba(0, 0, 0, 0.02)",
        "gift-quantity-responsive":
          "0px 3.273px 9.818px 0px rgba(0, 0, 0, 0.02)",
        "survey-option": "inset 0 0 0 var(--stroke-1-5) var(--colors-greys-12)",
        "survey-option-selected":
          "inset 0 0 0 var(--stroke-1-5) var(--color-stroke-black)",
        "looks-card-stroke":
          "inset 0 0 0 var(--stroke-1-5) var(--color-stroke-grey)",
        "looks-card-stroke-disabled-mobile":
          "inset 0 0 0 var(--stroke-1-5) var(--color-shapes-greys-10)",
        // Primary button inner highlight (☄️ New Design System): subtle top-edge glow.
        "button-primary-glow":
          "inset 0px 2px 2px 0px rgba(255, 255, 255, 0.25)",
        "button-primary-glow-strong":
          "inset 0px 2px 2px 0px rgba(255, 255, 255, 0.3)",
        "button-primary-press": "inset 0px -2px 2px 0px rgba(0, 0, 0, 0.25)",
        "redo-glow":
          "0px 4px 24px 0px color-mix(in srgb, var(--color-shapes-green-neon-green) 25%, transparent)",
        "route-progress":
          "0 0 10px color-mix(in srgb, var(--color-shapes-green-neon-green) 45%, transparent)",
        "cta-docked": "0px -4px 12px 0px rgba(0, 0, 0, 0.1)",
        "cta-wrapper": SHADOW_LIFT_UP_SOFT,
        "bulk-bar": "0px 2px 8px 0px rgba(0, 0, 0, 0.1)",
        "prompt-wrapper": "0px 6px 16px 0px rgba(0, 0, 0, 0.12)",
        "prompt-box": "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
        "prompt-pill": "0px 6px 32px 0px rgba(0, 0, 0, 0.12)",
        "prompt-thumb": "0px 0px 16px 0px rgba(0, 0, 0, 0.16)",
        "prompt-send": "0px 2px 32px 0px rgba(0, 0, 0, 0.12)",
        toast: "0px 2px 16px 0px rgba(0, 0, 0, 0.1)",
        "settings-card": "0px 2px 8px 0px rgba(0, 0, 0, 0.1)",
        "chip-thumb": "0px 4px 12px 0px rgba(0, 0, 0, 0.12)",
        "chip-stack": "0px 13px 21px 0px rgba(0, 0, 0, 0.10)",
        "chip-stack-mobile": "0px 11px 18px 0px rgba(0, 0, 0, 0.10)",
        "giftcard-display": "0 0 22.85px 0 rgba(0, 0, 0, 0.13)",
        "promo-pill":
          "inset 2px 2px 1px 0px rgba(255, 255, 255, 0.6), inset 0px -2px 6px 0px var(--colors-promo-glow)",
        "looks-nav": "0px 4px 32px 0px rgba(0, 0, 0, 0.2)",
        "toggle-active": "0px 0px 3px 0px rgba(0, 0, 0, 0.08)",
        "sheet-footer": SHADOW_LIFT_UP_SOFT,
        "plan-card": "0px 3px 6px 0px rgba(0, 0, 0, 0.08)",
        // Mobile gallery sheet lifting off the welcome hero behind it.
        "gallery-sheet": "-33px 2px 48px 0px rgba(8, 8, 8, 0.08)",
        "reuse-fan-card": "0px 4.372px 7.286px 0px rgba(0, 0, 0, 0.12)",
        "explore-toggle": "0 0 0.5rem 0 rgba(0, 0, 0, 0.10)",
        "explore-photo": "0 1rem 1.125rem 0 rgba(0, 0, 0, 0.10)",
        "explore-try-it-on": "0 1rem 2.25rem 0 rgba(0, 0, 0, 0.10)",
        "hairstylist-splash-photo": "0px 4px 20px 0px rgba(0, 0, 0, 0.1)",
        "hairstylist-splash-thumb": "0px 2px 12px 0px rgba(0, 0, 0, 0.1)",
        "hairstylist-splash-pointer": "0px 4px 10px 0px rgba(0, 0, 0, 0.04)",
        "hairstylist-preview": "0px 2px 40px 0px rgba(0, 0, 0, 0.1)",
        "try-it-on-preview": "0px 2px 40px 0px rgba(0, 0, 0, 0.1)",
        "try-it-on-preview-mweb": "0px 2px 24px 0px rgba(0, 0, 0, 0.08)",
        "try-it-on-card": "0px 1px 40px 0px rgba(0, 0, 0, 0.02)",
        "try-it-on-upload-badge":
          "inset 2px 2px 12px 0px rgba(255, 255, 255, 0.3)",
        "hairstylist-cta-bar": "0px -2px 6px 0px rgba(0, 0, 0, 0.06)",
        "hairstylist-chip": "0px 4px 8px 0px rgba(165, 165, 165, 0.08)",
        "hairstylist-chip-thumb": "0px 4px 12px 0px rgba(0, 0, 0, 0.12)",
        "hairstylist-chip-thumb-web": "0px 1px 24px 0px rgba(0, 0, 0, 0.1)",
        "hairstylist-wallet-card": "0px 2px 20px 0px rgba(0, 0, 0, 0.08)",
        "hairstylist-result-active": SHADOW_LIFT_UP_SOFT,
        "hairstylist-result": "0px 4px 24px 0px rgba(0, 0, 0, 0.1)",
        "hairstylist-upload-ring":
          "inset 2px 2px 12px 0px rgba(255, 255, 255, 0.3)",
        "hairstylist-keep-original-ring":
          "0px 2px 36px 0px rgba(0, 0, 0, 0.1), inset 2px 2px 14px 0px rgba(255, 255, 255, 0.3)",
        "hairstylist-splash-wheel":
          "0px -8px 40px 0px rgba(0, 0, 0, 0.08), inset 0px 8px 12px 0px rgba(255, 255, 255, 0.4)",
      },
      dropShadow: {
        "gift-card": "0px 12px 12px rgba(0, 0, 0, 0.26)",
        "gift-envelope-card": [
          "0 0 1.665cqw rgba(0, 0, 0, 0.2)",
          "0 2.5cqw 2.5cqw rgba(0, 0, 0, 0.25)",
        ],
        "gift-envelope-pocket": [
          "0.67cqw -3.34cqw 7.58cqw rgba(0, 0, 0, 0.1)",
          "2.67cqw -13.82cqw 14.04cqw rgba(0, 0, 0, 0.09)",
          "5.79cqw -30.98cqw 18.94cqw rgba(0, 0, 0, 0.05)",
          "10.25cqw -54.82cqw 22.29cqw rgba(0, 0, 0, 0.01)",
        ],
      },
      flexBasis: {
        // Create-flow split shell: 612/596 columns + 24px gap in the 1232px row,
        // kept proportional below it. Both sides sum to 100% - 24px so the gap
        // never forces shrink.
        "split-main": "calc(50% - 4px)", // 612px at the 1232px row - left content card
        "split-side": "calc(50% - 20px)", // 596px at the 1232px row - right visual column
        // Team selection-mode row: 629 cards + 32px gap + 526 collage, kept proportional.
        "selection-mode-collage": "calc((100% - 2rem) * 0.4554)",
      },
      maxWidth: {
        "try-it-on-look-card": "10.25rem",
        "try-it-on-slot-tab": "13.75rem",
        "upsell-modal": "49.375rem",
        "upload-column-tablet": "33.5rem",
        "upload-cta-tablet": "22.5rem",
        "survey-tip": "21.375rem",
        "share-form": "360px",
        "referred-landing-form": "22.875rem",
        "share-image": "480px",
        "content-login": "22.5rem",
        "content-mobile": "26rem",
        "content-form": "30.5rem",
        "unlock-pack": "33.6875rem",
        checkout: "28.25rem", // 452px - Stripe checkout modal capped width on tablet (Figma)
        "gift-intro-copy": "35rem",
        "gift-create-copy": "8rem",
        "gift-grid": "67.125rem",
        "gift-list-col": "33.5rem",
        "selection-mode-content": "33.5rem", // 536px - Team selection-mode tablet column
        "content-dock": "22.5rem", // 360px - Tablet CTA docker
        "content-tablet": "37.5rem",
        chrome: "min(42rem, calc(100vw - 3rem))",
        "content-intro": "24.5rem", // 392px - Team onboarding intro tablet column: heading + benefits
        "content-cta": "21.375rem", // 342px - Team onboarding intro tablet CTA/trusted dock column
        "content-trusted-content": "17.75rem", // 294px - Team onboarding intro tablet trusted content column
        "team-pricing": "51.25rem", // 820px
        "team-pricing-sub": "32rem", // 512px
        "team-pricing-heading": "23.5rem", // 376px
        "upscale-sheet-content": "43.5rem",
        "promo-tile-copy": "15.25rem",
        "promo-tile-copy-mobile": "9.3125rem",
        "headshots-ready-copy-mobile": "10.6875rem",
        "referral-discount-copy": "16.125rem",
        "referral-envelope": "19.3125rem",
        "referral-invite-heading": "20.1875rem",
        "referral-hero-mobile": "17.5rem",
        "referral-hero-tablet": "30rem",
        "referral-discount-card": "15.375rem",
        "referral-discount-body": "10.75rem",
        "explore-composer": "43rem",
        "hairstylist-form": "20.875rem",
        "hairstylist-column": "22.375rem",
        "hairstylist-panel": "23.875rem",
        "hairstylist-preview": "35rem",
        "hairstylist-preview-copy": "19.625rem",
        "hairstylist-cta": "22.5rem",
        "hairstylist-pref-chip-tab": "32.5rem",
        "hairstylist-splash": "24.375rem",
        "hairstylist-splash-web": "31.25rem",
      },
      backgroundImage: {
        "gradient-tile-caption":
          "linear-gradient(180deg, transparent 0%, var(--color-tile-caption-scrim) 100%)",
        "team-member-primary-badge":
          "linear-gradient(135deg, var(--colors-primary-mint-light) 0%, var(--colors-primary-mint) 100%)",
        "button-primary-hover-glow": "var(--color-button-primary-hover-glow)",
        "referral-discount-arc":
          "linear-gradient(180deg, var(--color-referral-arc-from) 0%, var(--color-referral-arc-to) 11.8%)",
        "referral-discount-card":
          "linear-gradient(106.72deg, var(--color-referral-reward-from) 6.32%, var(--color-referral-reward-to) 62.93%)",
        "nudge-toast":
          "linear-gradient(90deg, var(--color-nudge-toast-from) 0%, var(--color-nudge-toast-via) 50%, var(--color-nudge-toast-to) 100%)",
        "referral-cell":
          "linear-gradient(40deg, var(--color-referral-cell-from) 10%, var(--color-referral-cell-to) 77%)",
        "referral-cell-heading":
          "linear-gradient(158deg, var(--color-referral-cell-heading-from) 3%, var(--color-referral-cell-heading-to) 64%)",
        "gradient-envelope":
          "radial-gradient(ellipse 90% 55% at 50% 27%, #bbfbe6 0%, #fffaea 100%)",
        "gradient-chip-edge-a":
          "linear-gradient(135deg, #e6fbf3 0%, #f4ece8 100%)",
        "gradient-chip-edge-b":
          "linear-gradient(135deg, #f4ece8 0%, #e5fcf4 100%)",
        "gradient-badge-more":
          "linear-gradient(180deg, #34bb87 0%, #08271f 67%)",
        "redo-tile-label-scrim":
          "linear-gradient(to top, var(--color-stroke-black) 0%, color-mix(in srgb, var(--color-stroke-black) 90%, transparent) 10%, color-mix(in srgb, var(--color-stroke-black) 78%, transparent) 20%, color-mix(in srgb, var(--color-stroke-black) 64%, transparent) 30%, color-mix(in srgb, var(--color-stroke-black) 50%, transparent) 40%, color-mix(in srgb, var(--color-stroke-black) 37%, transparent) 50%, color-mix(in srgb, var(--color-stroke-black) 26%, transparent) 60%, color-mix(in srgb, var(--color-stroke-black) 16%, transparent) 70%, color-mix(in srgb, var(--color-stroke-black) 9%, transparent) 80%, color-mix(in srgb, var(--color-stroke-black) 3%, transparent) 90%, transparent 100%)",
        "edit-flow-nav-mint-to-white":
          "linear-gradient(to right, rgba(183, 255, 231, 1) 0%, rgba(255, 255, 255, 1) 100%)",
        "promo-gradient":
          "linear-gradient(-80deg, var(--colors-promo-mint) 13.6%, var(--colors-promo-cream) 92.5%)",
        "docked-cta-gradient":
          "linear-gradient(to top, var(--colors-tertiary-accent-02) 0%, var(--colors-tertiary-accent-01) 100%)",
        "docked-cta-gradient-team":
          "linear-gradient(150.222deg, var(--colors-primary-mint) 5.9582%, var(--colors-primary-mint-light) 111.23%)",
        "list-divider-fade":
          "linear-gradient(to right, transparent 0%, var(--color-shapes-greys-12) 50%, transparent 100%)",
        "team-managed-divider":
          "linear-gradient(to right, var(--colors-promo-divider-sage) 0%, var(--colors-promo-divider-teal-fade) 58%)",
        "team-heading-accent":
          "linear-gradient(89.19deg, var(--colors-primary-forest-green) 93.982%, #95b7b5 120.58%)",
        /** Horizontal edge-fade mask over the mobile trusted-logos carousel. */
        "logo-carousel-fade-x":
          "linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 18.817%, rgba(255, 255, 255, 0) 85.194%, #ffffff 100%)",
        /** Same fade stops on greys-03 — for carousels on `bg-greys-03` parents. */
        "logo-carousel-fade-x-greys-03":
          "linear-gradient(90deg, var(--color-shapes-greys-03) 0%, transparent 18.817%, transparent 85.194%, var(--color-shapes-greys-03) 100%)",
        "divider-fade-x":
          "linear-gradient(90deg, transparent 0%, var(--color-stroke-grey) 50%, transparent 100%)",
        "you-badge": "linear-gradient(126.15deg, #d0ffdc 0%, #93ffdb 100%)",
        "canvas-dots":
          "radial-gradient(circle at center, var(--color-stroke-grey) 1px, transparent 1px)",
        "gradient-deleted-expiring-footer":
          "linear-gradient(180deg, var(--color-deleted-expiring-tint) 16.176%, var(--color-deleted-expiring-deep) 100%)",
        "gradient-deleted-expiring-tag":
          "linear-gradient(117.62deg, var(--color-deleted-tag-cream) 5.385%, var(--color-deleted-tag-blush) 100%)",
        "gradient-deleted-tag":
          "linear-gradient(90deg, var(--color-stroke-white) 0%, var(--color-deleted-tag-grey) 100%)",
        "gradient-discount-chip":
          "linear-gradient(134deg, #fdffde 5.96%, #93ffdb 111.23%)",
        "gradient-resolution-badge":
          "linear-gradient(to top, var(--colors-primary-mint-light) -47.5%, var(--colors-primary-mint) 164.8%)",
        "gradient-team-wallet":
          "linear-gradient(77.3deg, var(--color-referral-cell-from) 34%, var(--color-referral-cell-to) 90.6%)",
        "gradient-team-credits":
          "linear-gradient(11.52deg, var(--colors-imagine-more-ideas-from) 4.23%, var(--colors-imagine-more-ideas-to) 122.71%)",
        "gradient-new-badge":
          "linear-gradient(127.64deg, var(--colors-primary-mint-light) 5.96%, var(--colors-primary-mint) 111.23%)",
        "gradient-explore-daily-tag":
          "linear-gradient(145.13deg, var(--colors-primary-mint-light) 5.96%, var(--colors-primary-mint) 111.23%)",
        "gradient-explore-try-it-on-tag":
          "linear-gradient(114.87deg, var(--colors-primary-mint-light) 7.93%, var(--colors-primary-mint) 93.53%)",
        "gradient-avatar-team":
          "linear-gradient(to bottom, var(--color-avatar-team-tint-from), var(--color-avatar-team-tint-to))",
        "gradient-avatar-doodle":
          "linear-gradient(35.22deg, var(--color-avatar-doodle-tint-from) 47.6%, var(--color-avatar-doodle-tint-to) 109.8%)",
        "gradient-avatar-team-header":
          "linear-gradient(180deg, var(--color-avatar-team-header-from) 0%, var(--color-avatar-team-header-to) 112.23%)",
        "gradient-welcome-avatar-ring":
          "linear-gradient(167deg, var(--color-text-white) 15.255%, var(--color-shapes-greys-20) 166.75%)",
        "gradient-banner-row":
          "linear-gradient(180deg, #efeff1 52.8%, #fcfcfd 98.06%)",
        "gradient-banner-fade":
          "linear-gradient(to bottom, var(--color-shapes-greys-03) 0%, #ffffff 27.36%)",
        "gradient-edit-panel-header":
          "radial-gradient(ellipse 65% 1.40625rem at 50% 0%, #f4f4f4 0%, #ffffff 97.9%)",
        "gradient-login-testimonial":
          "linear-gradient(to bottom, rgba(102, 102, 102, 0) 63.66%, rgba(0, 0, 0, 0.73) 100%)",
        "gradient-reviews-glow":
          "radial-gradient(ellipse 70% 100% at 50% 0%, #e8fcf4 0%, #ffffff 100%)",
        "gradient-trustpilot-strip":
          "linear-gradient(to right, #e3fcf4 0%, rgba(227, 252, 244, 0) 100%)",

        "last-used-wrap":
          "linear-gradient(155.9deg, var(--colors-primary-mint-light) 5.96%, var(--colors-primary-mint) 111.23%)",
        "last-used-strip":
          "linear-gradient(169.05deg, var(--colors-primary-mint-light) 5.96%, var(--colors-primary-mint) 111.23%)",
        "explore-banner-try-it-on":
          "radial-gradient(ellipse 70% 130% at 0% 50%, var(--color-explore-banner-try-it-on) 0%, transparent 100%)",
        "explore-banner-halloween":
          "radial-gradient(ellipse 70% 130% at 0% 50%, var(--color-explore-banner-halloween-glow) 0%, transparent 100%)",
        "explore-banner-hairstylist":
          "radial-gradient(ellipse 70% 130% at 0% 50%, var(--color-explore-banner-hairstylist-glow) 0%, transparent 100%)",
        "explore-banner-looks":
          "radial-gradient(ellipse 70% 130% at 0% 50%, var(--color-explore-banner-looks-glow) 0%, transparent 100%)",
        "explore-promo-refer":
          "radial-gradient(circle 10.375rem at -1.5rem -2.25rem, var(--color-explore-promo-refer-glow) 0%, var(--color-explore-promo-refer-glow) 40%, transparent 100%)",
        "explore-promo-gift":
          "radial-gradient(circle 10.375rem at -1.375rem -3.8125rem, var(--color-explore-promo-gift-glow) 0%, var(--color-explore-promo-gift-glow) 40%, transparent 100%)",
        "explore-promo-feedback":
          "radial-gradient(circle 10.375rem at -1.5rem -2.25rem, var(--color-explore-promo-feedback-glow) 0%, var(--color-explore-promo-feedback-glow) 40%, transparent 100%)",
        "explore-promo-teams":
          "radial-gradient(circle 10.375rem at -1.5rem -2.25rem, var(--color-explore-promo-teams-glow) 0%, var(--color-explore-promo-teams-glow) 40%, transparent 100%)",
        "explore-promo-unlock-with-credits":
          "radial-gradient(circle 10.375rem at -1.5rem -2.25rem, var(--color-explore-promo-unlock-with-credits-glow) 0%, var(--color-explore-promo-unlock-with-credits-glow) 40%, transparent 100%)",
        "explore-daily-caption":
          "linear-gradient(to bottom, transparent 0%, var(--color-stroke-black) 59.8%)",
        "explore-prompt":
          "linear-gradient(90deg, var(--color-explore-prompt-from) 0%, var(--color-explore-prompt-to) 100%)",
        "try-it-on-rule":
          "linear-gradient(90deg, var(--color-try-it-on-rule-fade) 0%, var(--color-try-it-on-rule) 19.6%, var(--color-try-it-on-rule) 81.9%, var(--color-try-it-on-rule-fade) 100%)",
        "hairstylist-rule-left":
          "linear-gradient(90deg, var(--color-hairstylist-rule-fade) 0%, var(--color-hairstylist-rule) 100%)",
        "hairstylist-rule-right":
          "linear-gradient(90deg, var(--color-hairstylist-rule) 0%, var(--color-hairstylist-rule-fade) 100%)",
        "hairstylist-splash-pointer":
          "linear-gradient(286.46deg, var(--color-hairstylist-splash-pointer-from) -28.75%, var(--color-hairstylist-splash-pointer-mid) 21.65%, var(--color-hairstylist-splash-pointer-to) 83.16%)",
        "hairstylist-splash-hairstyle":
          "linear-gradient(96.85deg, var(--color-hairstylist-splash-hairstyle-from) 5.45%, var(--color-hairstylist-splash-hairstyle-to) 100.28%)",
      },
      keyframes: {
        "progress-fill": {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        "route-progress": {
          from: { transform: "scaleX(var(--route-progress-from, 0.15))" },
          to: { transform: "scaleX(0.9)" },
        },
        "route-progress-finish": {
          "0%": {
            transform: "scaleX(var(--route-progress-from, 0.9))",
            opacity: "1",
          },
          "50%": { transform: "scaleX(1)", opacity: "1" },
          "100%": { transform: "scaleX(1)", opacity: "0" },
        },
        "loading-bar-slide": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(300%)" },
        },
        earthworm: {
          "0%": {
            transform: "translateX(0) scaleX(1)",
            transformOrigin: "left",
          },
          "50%": {
            transform: "translateX(0) scaleX(5)",
            transformOrigin: "left",
          },
          "100%": {
            transform: "translateX(500%) scaleX(1)",
            transformOrigin: "left",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "waterfall-reveal": {
          from: {
            clipPath: "inset(0 0 100% 0)",
            opacity: "0",
          },
          to: {
            clipPath: "inset(0 0 0 0)",
            opacity: "1",
          },
        },
        "diag-track": {
          // single bar moves along BL->TR diagonal; returns to start at 100%
          "0%": {
            transform: "translate(-100%, 100%) rotate(45deg)",
            opacity: "1",
          },
          "50%": {
            transform: "translate(100%, -100%) rotate(45deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-100%, 100%) rotate(45deg)",
            opacity: "1",
          },
        },
        "loading-dot": {
          // Discrete steps to maintain strict left-to-right intensity order
          // t0:   0.3 0.6 0.9
          // t33%: 0.9 0.3 0.6
          // t66%: 0.6 0.9 0.3
          // t100: repeats t0
          "0%": { opacity: "0.3" },
          "33.333%": { opacity: "0.9" },
          "66.666%": { opacity: "0.6" },
          "100%": { opacity: "0.3" },
        },
        "loading-dot-2": {
          "0%": { opacity: "0.6" },
          "33.333%": { opacity: "0.3" },
          "66.666%": { opacity: "0.9" },
          "100%": { opacity: "0.6" },
        },
        "loading-dot-3": {
          "0%": { opacity: "0.9" },
          "33.333%": { opacity: "0.6" },
          "66.666%": { opacity: "0.3" },
          "100%": { opacity: "0.9" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInScale: {
          "0%": {
            opacity: "0",
            transform: "scale(0.2)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "flip-front": {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: ROTATE_X_180 },
          "75%": { transform: ROTATE_X_360 },
          "100%": { transform: ROTATE_X_360 },
        },
        "flip-back": {
          "0%": { transform: "rotateX(-180deg)" },
          "50%": { transform: "rotateX(0deg)" },
          "75%": { transform: ROTATE_X_180 },
          "100%": { transform: ROTATE_X_180 },
        },
        "timer-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
          },
          "50%": {
            transform: "scale(1.05)",
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
        /** A light highlight that travels left→right across a positioned parent. */
        "shimmer-sweep": {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(400%) skewX(-12deg)" },
        },
        "blink-caret": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "looks-card-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-5px)" },
          "45%": { transform: "translateX(4px)" },
          "70%": { transform: "translateX(-2px)" },
        },
      },
      animation: {
        "looks-card-shake": "looks-card-shake 360ms var(--ease-out)",
        "progress-fill": "progress-fill linear forwards",
        "route-progress":
          "route-progress 10s cubic-bezier(0.1, 0.6, 0.3, 1) forwards",
        "route-progress-finish":
          "route-progress-finish 400ms ease-out forwards",
        "loading-bar-slide": "loading-bar-slide 1.4s ease-in-out infinite",
        earthworm: "earthworm linear forwards",
        "fade-in": "fade-in 600ms ease-in-out forwards",
        "explore-image-in": "fade-in 0.2s ease-out both",
        "fade-out": "fade-out 300ms ease-in-out forwards",
        "waterfall-reveal": "waterfall-reveal 600ms ease-out forwards",
        "diag-track": "diag-track var(--sweep-duration, 2s) linear infinite",
        "loading-dot": "loading-dot 1.5s steps(3, end) infinite",
        "loading-dot-2": "loading-dot-2 1.5s steps(3, end) infinite",
        "loading-dot-3": "loading-dot-3 1.5s steps(3, end) infinite",
        scroll: "scroll linear infinite",
        fadeInScale: "fadeInScale 0.6s ease-out forwards",
        "flip-front": "flip-front 5s infinite",
        "flip-back": "flip-back 5s infinite",
        "timer-pulse": "timer-pulse 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "shimmer-sweep": "shimmer-sweep 2.5s ease-in-out infinite",
        "blink-caret": "blink-caret 1s step-end infinite",
      },
    },
  },
  plugins: [
    // Utility classes for gift card flip animation
    plugin((api) => {
      api.addUtilities({
        ".perspective": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".text-shadow-explore-banner": {
          "text-shadow": "0.0625rem 0 0.11875rem rgba(0, 0, 0, 0.25)",
        },
        /**
         * Selected Premium plan card (payment modal, desktop): 2px mint→neon
         * vertical gradient stroke over a midnight fill, via background-clip.
         * The Figma gradient stroke that lossy export flattens to a solid neon
         * border.
         */
        ".premium-selected-border": {
          border: "2px solid transparent",
          background:
            "linear-gradient(#011124, #011124) padding-box, linear-gradient(180deg, #aaf2cc 0%, #00ea9c 100%) border-box",
        },
        /**
         * UI-like upsell banner send button: 1px neon→mint gradient stroke
         * over a midnight fill, same background-clip technique as
         * `.premium-selected-border` (Figma flattens this to a solid border).
         */
        ".ui-banner-send-border": {
          border: "1px solid transparent",
          background:
            "linear-gradient(#011124, #011124) padding-box, linear-gradient(180deg, #00ea9c 0%, #c7ffec 100%) border-box",
        },
        /**
         * Large-Imagine banner send button: grey→ink gradient fill with a 1px
         * grey→transparent gradient rim, same background-clip technique as
         * `.premium-selected-border` (Figma 3161-14672 "icon button").
         */
        ".banner-send-rim": {
          border: "1px solid transparent",
          background:
            "linear-gradient(180deg, #7f7f7f 0%, #161616 100%) padding-box, linear-gradient(180deg, #8e8e8e 0%, rgba(0, 0, 0, 0) 100%) border-box",
        },
      });
    }),
    // Figma typography classes plugin
    plugin((api) => {
      // Icon stroke weights reference the shared --stroke-* scale in globals.css.
      const ihIconStroke = (token: string, boxPx: number): string =>
        `calc(var(--stroke-${token}) * var(--ih-vb, 26) / var(--ih-box, ${boxPx}))`;
      api.addComponents({
        /* Heading Display: 40px, 300 (Light), -3% */
        ".heading-display": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "40px",
          fontWeight: "300",
          lineHeight: "normal",
          letterSpacing: "-0.03em",
        },

        /* Heading Celebration: 32px, 480, 32px lineHeight, 0 — fixed at every breakpoint.
           Off the 450/600 weight ramp and between heading-display (40) and heading-1 (26);
           carries no Figma text style, so it is named by role rather than scale step. */
        ".heading-celebration": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "32px",
          fontWeight: "480",
          lineHeight: "32px",
          letterSpacing: "0",
        },

        /* Heading 1 - Mobile (M): 24px, 450, 26px lineHeight, -1.2% */
        /* Heading 1 - Web (W): 26px, 450, 28px lineHeight, -1.2% */
        ".heading-1": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "24px",
          fontWeight: "450",
          lineHeight: "26px",
          letterSpacing: "-0.012em", // -1.2%
          "@screen md": {
            fontSize: "26px",
            lineHeight: "28px",
          },
        },

        ".heading-1-w": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "26px",
          fontWeight: "450",
          lineHeight: "28px",
          letterSpacing: "-0.012em",
        },

        /* Heading 2 - Mobile: 18px, 450, 20px lineHeight */
        /* Heading 2 - Web: 20px, 450, 22px lineHeight */
        ".heading-2": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "20px",
          fontWeight: "450",
          lineHeight: "22px",
          letterSpacing: "-0.01em", // -1%
          "@screen md": {
            fontSize: "22px",
            fontWeight: "450",
            lineHeight: "24px",
          },
        },

        /* Heading 2 pinned to the web tuple at every breakpoint — Figma applies
           `heading 02/web` on the 390 frame too (pricing plan prices). */
        ".heading-2-fixed": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "22px",
          fontWeight: "450",
          lineHeight: "24px",
          letterSpacing: "-0.01em",
        },

        /* Heading 2 pinned to the mobile tuple at every breakpoint — Figma applies
           `heading 02/mob` on the web frame too (credits "know more" trigger row). */
        ".heading-2-fixed-mobile": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "20px",
          fontWeight: "450",
          lineHeight: "22px",
          letterSpacing: "-0.01em",
        },

        ".heading-2-w": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "22px",
          fontWeight: "450",
          lineHeight: "24px",
          letterSpacing: "-0.01em",
        },

        ".heading-2-m": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "20px",
          fontWeight: "450",
          lineHeight: "22px",
          letterSpacing: "-0.01em",
        },

        /* Subheading 1 - Regular: 18px, 420, 20px lineHeight */
        ".subheading-1-r": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "18px",
          fontWeight: "420",
          lineHeight: "20px",
          letterSpacing: "0px",
        },

        /* Subheading 1 - Medium: 18px, 450, 20px lineHeight */
        ".subheading-1-m": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "18px",
          fontWeight: "450",
          lineHeight: "20px",
          letterSpacing: "0px",
        },

        ".subheading-1-m-tall": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "1.125rem",
          fontWeight: "450",
          lineHeight: "1.375rem",
          letterSpacing: "-0.005em",
        },

        /* Subheading 2 - Regular: 16px, 420, 18px lineHeight */
        ".subheading-2-r": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "420",
          lineHeight: "18px",
          letterSpacing: "0px",
        },

        ".subheading-2-reg": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "18px",
          letterSpacing: "0px",
        },
        ".subheading-2-m": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "14px",
          fontWeight: "450",
          lineHeight: "18px",
          letterSpacing: "0px",
        },

        /* Redesign subheading 01 (responsive): mob 16/18 → web 18/20 (-0.5%) */
        ".subheading-1": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "420",
          lineHeight: "18px",
          letterSpacing: "0",
          "@screen md": {
            fontSize: "18px",
            lineHeight: "20px",
            letterSpacing: "-0.005em",
          },
        },

        /* Heading 1 with the 28px mobile line-height; flips at the 744 tablet artboard. */
        ".heading-1-loose": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "24px",
          fontWeight: "450",
          lineHeight: "28px",
          letterSpacing: "-0.012em",
          "@screen tablet": {
            fontSize: "26px",
          },
        },

        /* Subheading 1 with the 20px mobile line-height; flips at the 744 tablet artboard. */
        ".subheading-1-loose": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "420",
          lineHeight: "20px",
          letterSpacing: "0",
          "@screen tablet": {
            fontSize: "18px",
            letterSpacing: "-0.005em",
          },
        },

        ".subheading-1-fixed": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "18px",
          fontWeight: "420",
          lineHeight: "20px",
          letterSpacing: "-0.005em",
        },
        ".subheading-1-fixed-mobile": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "420",
          lineHeight: "20px",
          letterSpacing: "0",
        },

        /* Redesign subheading 02 (responsive): mob 14/16 → web 16/18 */
        ".subheading-2": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "14px",
          fontWeight: "420",
          lineHeight: "16px",
          letterSpacing: "0",
          "@screen md": {
            fontSize: "16px",
            lineHeight: "18px",
          },
        },

        /* Subheading 2 pinned to the mobile tuple at every breakpoint — Figma applies
           `subheading 02/mob` on the web frame too (credits usage card price subtitle). */
        ".subheading-2-fixed-mobile": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "14px",
          fontWeight: "420",
          lineHeight: "16px",
          letterSpacing: "0",
        },

        /* Body - Large: 16px, 420, 18px lineHeight */
        ".body-l": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "420",
          lineHeight: "18px",
          letterSpacing: "0px",
        },

        ".body-l-450": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "450",
          lineHeight: "18px",
          letterSpacing: "0px",
        },

        ".body-l-500": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "18px",
          letterSpacing: "0px",
        },

        ".label-badge": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "normal",
          letterSpacing: "-0.01em",
          "@screen md": {
            fontSize: "21px",
          },
        },

        ".body-m": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "14px",
          fontWeight: "420",
          lineHeight: "16px",
          letterSpacing: "0px",
        },

        ".body-m-450": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "14px",
          fontWeight: "450",
          lineHeight: "16px",
          letterSpacing: "0px",
        },
        ".body-m-450-count": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "14px",
          fontWeight: "450",
          lineHeight: "12px",
          letterSpacing: "0.08em",
        },

        ".body-s": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "12px",
          fontWeight: "420",
          lineHeight: "14px",
          letterSpacing: "0px",
        },

        ".body-s-450": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "12px",
          fontWeight: "450",
          lineHeight: "14px",
          letterSpacing: "0px",
        },

        ".body-xs-450": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "10px",
          fontWeight: "450",
          lineHeight: "12px",
          letterSpacing: "0.08em",
        },

        ".referral-discount-percent": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "4rem",
          fontWeight: "600",
          lineHeight: "3.5rem",
          letterSpacing: "0",
        },

        ".referral-discount-off": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "2.5rem",
          fontWeight: "600",
          lineHeight: "2.75rem",
          letterSpacing: "0",
        },

        ".referral-discount-ribbon": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "0.625rem",
          fontWeight: "600",
          lineHeight: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },
        ".referral-tile-amount": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "2.5rem",
          fontWeight: "600",
          lineHeight: "2.0625rem",
          letterSpacing: "0",
        },

        ".display-name": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "44px",
          fontWeight: "400",
          lineHeight: "48px",
          letterSpacing: "-0.03em",
          "@screen lg": {
            fontSize: "56px",
            lineHeight: "50px",
          },
        },

        ".navbar-name": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "24px",
          fontWeight: "400",
          lineHeight: "1.1",
          letterSpacing: "-0.03em",
        },

        ".team-ready-card-title-grid": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "20px",
          fontWeight: "450",
          lineHeight: "23px",
          letterSpacing: "0",
        },

        ".explore-display": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "2.25rem",
          fontWeight: "450",
          lineHeight: "2.6875rem",
          letterSpacing: "-0.012em",
        },

        ".body-xs": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "10px",
          fontWeight: "450",
          lineHeight: "12px",
          letterSpacing: "0.08em",
        },

        ".body-xs-600": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "10px",
          fontWeight: "600",
          lineHeight: "12px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },

        ".label-xs": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "0.6875rem",
          fontWeight: "450",
          lineHeight: "1rem",
          letterSpacing: "0.055rem",
        },

        ".navigation-section-label": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "0.6875rem",
          fontWeight: "450",
          lineHeight: "1rem",
          letterSpacing: "0.08em",
        },
        ".button-link": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "14px",
          fontWeight: "450",
          lineHeight: "16px",
        },
        ".buttons-primary": {
          fontFamily: GREED_FONT_FAMILY,
          fontSize: "16px",
          fontWeight: "450",
          lineHeight: "18px",
        },

        ".ih-icon": {
          display: "block",
          flexShrink: "0",
          width: "16px",
          height: "16px",
          "--ih-box": "16",
          strokeWidth: ihIconStroke("1-4", 16),
        },
        /* Heading 1 — mobile 24px / 2.4, web 26px / 2.6 */
        ".ih-icon-heading-1": {
          width: "24px",
          height: "24px",
          "--ih-box": "24",
          strokeWidth: ihIconStroke("2-4", 24),
          "@screen lg": {
            width: "26px",
            height: "26px",
            "--ih-box": "26",
            strokeWidth: ihIconStroke("2-6", 26),
          },
        },
        /* Heading 2 — mobile 20px / 2.0, web 22px / 2.2 */
        ".ih-icon-heading-2": {
          width: "20px",
          height: "20px",
          "--ih-box": "20",
          strokeWidth: ihIconStroke("2", 20),
          "@screen lg": {
            width: "22px",
            height: "22px",
            "--ih-box": "22",
            strokeWidth: ihIconStroke("2-2", 22),
          },
        },
        /* Subheading 1 — mobile 16px / 1.4, web 18px / 1.6 */
        ".ih-icon-subheading-1": {
          width: "16px",
          height: "16px",
          "--ih-box": "16",
          strokeWidth: ihIconStroke("1-4", 16),
          "@screen lg": {
            width: "18px",
            height: "18px",
            "--ih-box": "18",
            strokeWidth: ihIconStroke("1-6", 18),
          },
        },
        ".ih-icon-subheading-1-w": {
          width: "18px",
          height: "18px",
          "--ih-box": "18",
          strokeWidth: ihIconStroke("1-6", 18),
        },
        /* Subheading 2 — mobile 14px / 1.2, web 16px / 1.4 */
        ".ih-icon-subheading-2": {
          width: "14px",
          height: "14px",
          "--ih-box": "14",
          strokeWidth: ihIconStroke("1-2", 14),
          "@screen lg": {
            width: "16px",
            height: "16px",
            "--ih-box": "16",
            strokeWidth: ihIconStroke("1-4", 16),
          },
        },
      });

      api.addUtilities(
        Object.fromEntries(
          Object.entries(IH_ICON_SIZES).map(([name, px]) => [
            `.ih-size-${name.replace(".", "\\.")}`,
            { width: `${px}px`, height: `${px}px`, "--ih-box": `${px}` },
          ])
        )
      );
      api.addUtilities(
        Object.fromEntries(
          IH_ICON_STROKES.map((token) => [
            `.ih-stroke-${token}`,
            { strokeWidth: ihIconStroke(token, 16) },
          ])
        )
      );
    }),
  ],
};

export default config;
