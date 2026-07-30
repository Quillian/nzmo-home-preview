/* @ds-bundle: {"format":4,"namespace":"DesignSystem_793649","components":[{"name":"BrandPattern","sourcePath":"components/brand/BrandPattern.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"PromiseStamp","sourcePath":"components/brand/PromiseStamp.jsx"},{"name":"SectionLabel","sourcePath":"components/brand/SectionLabel.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"SpecTable","sourcePath":"components/data/SpecTable.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Field.jsx"},{"name":"Select","sourcePath":"components/forms/Field.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Field.jsx"},{"name":"CtaPanel","sourcePath":"components/marketing/CtaPanel.jsx"},{"name":"Hero","sourcePath":"components/marketing/Hero.jsx"},{"name":"ProductCard","sourcePath":"components/marketing/ProductCard.jsx"},{"name":"PhotoFrame","sourcePath":"components/media/PhotoFrame.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"PageA4","sourcePath":"components/print/PageA4.jsx"},{"name":"AfterRequest","sourcePath":"components/proof/AfterRequest.jsx"},{"name":"CaseCard","sourcePath":"components/proof/CaseCard.jsx"},{"name":"DocumentBlock","sourcePath":"components/proof/DocumentBlock.jsx"},{"name":"ProofCard","sourcePath":"components/proof/ProofCard.jsx"},{"name":"SpecCaption","sourcePath":"components/proof/SpecCaption.jsx"},{"name":"StatusBadge","sourcePath":"components/proof/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/proof/StatusBadge.jsx"}],"sourceHashes":{"components/brand/BrandPattern.jsx":"69ce8c27a077","components/brand/Logo.jsx":"08b8d3c120de","components/brand/PromiseStamp.jsx":"ced98aa00fa6","components/brand/SectionLabel.jsx":"a988127c02d3","components/core/Button.jsx":"b85553ff1e67","components/core/Icon.jsx":"b5b12f465a25","components/data/SpecTable.jsx":"490bcbcff68a","components/forms/Field.jsx":"4b821311e407","components/marketing/CtaPanel.jsx":"ee4d43e751c6","components/marketing/Hero.jsx":"f62639dcef4e","components/marketing/ProductCard.jsx":"564275b45dca","components/media/PhotoFrame.jsx":"7abab0933607","components/navigation/SiteFooter.jsx":"0c31de29a244","components/navigation/SiteHeader.jsx":"825a881d4717","components/print/PageA4.jsx":"c5369ae4ffd3","components/proof/AfterRequest.jsx":"25369b1b59c6","components/proof/CaseCard.jsx":"e7b0cf2f7a5e","components/proof/DocumentBlock.jsx":"e880dc82e7ef","components/proof/ProofCard.jsx":"df16f7d53787","components/proof/SpecCaption.jsx":"4c7cd5335418","components/proof/StatusBadge.jsx":"d05b82384486","ui_kits/kp_a4/KpPages.jsx":"838224b4b57e","ui_kits/website/CasesScreen.jsx":"ec2e11eabc0a","ui_kits/website/HomeScreen.jsx":"ceedde5de3b9","ui_kits/website/ProductScreen.jsx":"4e278a1eeacc","ui_kits/website/RequestScreen.jsx":"bb8d544234e6","ui_kits/website/siteData.jsx":"3de6af749048"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_793649 = window.DesignSystem_793649 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BrandPattern.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const patternFills = {
  zigzag: (color, opacity) => ({
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='392.3' height='223' viewBox='0 -2.4 392.3 223'%3E%3Cpath d='M125.539%20193.608L227.9%20114.87C228.905%20114.119%20229.527%20113.617%20230.876%20113.107C232.028%20112.67%20233.277%20112.431%20234.581%20112.431C239.264%20112.431%20243.462%20115.445%20244.558%20119.755C244.759%20120.545%20245.027%20121.748%20245.035%20122.551L245.035%20192.11C245.156%20193.74%20246.881%20194.367%20248.048%20193.615L389.861%2084.53C390.562%2083.956%20391.126%2083.329%20391.533%2082.614C392.067%2081.616%20392.282%2080.439%20392.282%2078.912L392.284%2078.912L392.284%200.19C392.284%20-1.618%20390.389%20-2.312%20389.181%20-1.443L311.191%2058.549L311.191%2058.548L286.647%2077.428L286.028%2077.904Q285.464%2078.249%20285.308%2078.336C283.8%2079.181%20282.039%2079.616%20280.187%2079.616C274.793%2079.616%20270.327%2075.568%20269.767%2070.322L269.767%200.192L269.764%200.192C269.764%20-1.617%20267.868%20-2.31%20266.659%20-1.44L164.129%2077.428L163.511%2077.904Q162.946%2078.249%20162.79%2078.336C161.282%2079.181%20159.521%2079.616%20157.669%2079.616C152.275%2079.616%20147.809%2075.568%20147.249%2070.322L147.249%200C147.125%20-1.669%20145.32%20-2.286%20144.153%20-1.449L2.52%20107.499C0.656%20108.94%200%20110.54%200%20113.207L0%20191.921C0%20193.687%201.81%20194.39%203.02%20193.609L105.381%20114.872C106.387%20114.12%20107.009%20113.618%20108.359%20113.107C109.51%20112.67%20110.759%20112.431%20112.063%20112.431C116.746%20112.431%20120.944%20115.445%20122.04%20119.756C122.241%20120.545%20122.509%20121.748%20122.518%20122.551L122.518%20191.918L122.52%20191.919C122.52%20193.685%20124.329%20194.387%20125.539%20193.608Z' fill='none' stroke='" + encodeURIComponent(color) + "' stroke-width='7'/%3E%3C/svg%3E\")",
    backgroundSize: "162px 92px",
    opacity
  }),
  rail: (color, opacity) => ({
    backgroundImage: "repeating-linear-gradient(115deg," + color + " 0 5px,transparent 5px 13px)",
    opacity
  }),
  perforation: (color, opacity) => ({
    backgroundImage: "radial-gradient(circle at 4px 4px," + color + " 1.4px,transparent 1.5px)",
    backgroundSize: "14px 14px",
    opacity
  })
};
function BrandPattern({
  pattern = "zigzag",
  color = "var(--ochre-500)",
  opacity = 0.24,
  scale = 1,
  fade = "none",
  as = "div",
  style,
  children,
  ...rest
}) {
  const Tag = as;
  const fill = (patternFills[pattern] || patternFills.zigzag)(color, opacity);
  if (scale !== 1 && fill.backgroundSize) {
    const [w, h] = fill.backgroundSize.split(" ");
    fill.backgroundSize = parseFloat(w) * scale + "px " + (h ? parseFloat(h) * scale + "px" : "");
  }
  const masks = {
    none: null,
    right: "linear-gradient(to right,transparent 0%,#000 55%)",
    left: "linear-gradient(to left,transparent 0%,#000 55%)",
    bottom: "linear-gradient(to bottom,#000 30%,transparent 100%)",
    radial: "radial-gradient(120% 120% at 100% 0%,#000 20%,transparent 80%)"
  };
  const mask = masks[fade];
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      position: "relative",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      ...fill,
      ...(mask ? {
        WebkitMaskImage: mask,
        maskImage: mask
      } : null)
    }
  }), children != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, children));
}
Object.assign(__ds_scope, { BrandPattern });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BrandPattern.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Точный контур знака из NZMO_Brand_Identity.pdf (стр. 2), y-flip из PDF
const MARK_PATH = "M125.539 193.608L227.9 114.87C228.905 114.119 229.527 113.617 230.876 113.107C232.028 112.67 233.277 112.431 234.581 112.431C239.264 112.431 243.462 115.445 244.558 119.755C244.759 120.545 245.027 121.748 245.035 122.551L245.035 192.11C245.156 193.74 246.881 194.367 248.048 193.615L389.861 84.53C390.562 83.956 391.126 83.329 391.533 82.614C392.067 81.616 392.282 80.439 392.282 78.912L392.284 78.912L392.284 0.19C392.284 -1.618 390.389 -2.312 389.181 -1.443L311.191 58.549L311.191 58.548L286.647 77.428L286.028 77.904Q285.464 78.249 285.308 78.336C283.8 79.181 282.039 79.616 280.187 79.616C274.793 79.616 270.327 75.568 269.767 70.322L269.767 0.192L269.764 0.192C269.764 -1.617 267.868 -2.31 266.659 -1.44L164.129 77.428L163.511 77.904Q162.946 78.249 162.79 78.336C161.282 79.181 159.521 79.616 157.669 79.616C152.275 79.616 147.809 75.568 147.249 70.322L147.249 0C147.125 -1.669 145.32 -2.286 144.153 -1.449L2.52 107.499C0.656 108.94 0 110.54 0 113.207L0 191.921C0 193.687 1.81 194.39 3.02 193.609L105.381 114.872C106.387 114.12 107.009 113.618 108.359 113.107C109.51 112.67 110.759 112.431 112.063 112.431C116.746 112.431 120.944 115.445 122.04 119.756C122.241 120.545 122.509 121.748 122.518 122.551L122.518 191.918L122.52 191.919C122.52 193.685 124.329 194.387 125.539 193.608Z";
const MARK_VB = "0 -2.4 392.3 196.9";
const MARK_AR = 392.3 / 196.9;
const logoTones = {
  brand: {
    mark: "var(--ochre-500)",
    word: "var(--navy-800)",
    tag: "var(--steel-500)"
  },
  navy: {
    mark: "var(--navy-800)",
    word: "var(--navy-800)",
    tag: "var(--steel-500)"
  },
  petrol: {
    mark: "var(--petrol-800)",
    word: "var(--petrol-800)",
    tag: "var(--steel-500)"
  },
  white: {
    mark: "var(--white)",
    word: "var(--white)",
    tag: "rgba(255,255,255,.62)"
  },
  "white-ochre": {
    mark: "var(--ochre-500)",
    word: "var(--white)",
    tag: "rgba(255,255,255,.62)"
  },
  ochre: {
    mark: "var(--ochre-500)",
    word: "var(--ochre-500)",
    tag: "var(--ochre-400)"
  }
};
function Logo({
  variant = "lockup",
  tone = "brand",
  size = 28,
  tagline = true,
  href,
  style,
  ...rest
}) {
  const t = logoTones[tone] || logoTones.brand;
  const mark = /*#__PURE__*/React.createElement("svg", {
    viewBox: MARK_VB,
    width: size * MARK_AR,
    height: size,
    "aria-hidden": "true",
    style: {
      display: "block",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: MARK_PATH,
    fill: t.mark
  }));
  if (variant === "mark") {
    const el = /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: "inline-flex",
        ...style
      }
    }, rest), mark);
    return href ? /*#__PURE__*/React.createElement("a", {
      href: href,
      style: {
        borderBottom: "none",
        display: "inline-flex"
      },
      "aria-label": "\u041D\u0417\u041C\u041E"
    }, el) : el;
  }
  const wordSize = variant === "stacked" ? size * 1.15 : size * 1.02;
  const words = /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-regular)",
      fontSize: wordSize,
      lineHeight: 1,
      letterSpacing: "0.01em",
      color: t.word
    }
  }, "\u041D\u0417\u041C\u041E"), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: Math.max(3, size * 0.16),
      fontFamily: "var(--font-tech)",
      fontWeight: "var(--fw-medium)",
      fontSize: Math.max(6, size * 0.245),
      lineHeight: 1.25,
      letterSpacing: "0.17em",
      color: t.tag,
      textTransform: "uppercase"
    }
  }, "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A\u0438\u0439 \u0437\u0430\u0432\u043E\u0434", /*#__PURE__*/React.createElement("br", null), "\u043C\u0435\u0442\u0430\u043B\u043B\u043E\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438"));
  const inner = variant === "stacked" ? /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      flexDirection: "column",
      gap: size * 0.42,
      alignItems: "flex-start",
      ...style
    }
  }, rest), mark, words) : /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.62,
      ...style
    }
  }, rest), mark, words);
  return href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      borderBottom: "none",
      display: "inline-flex"
    },
    "aria-label": "\u041D\u0417\u041C\u041E"
  }, inner) : inner;
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/PromiseStamp.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PromiseStamp({
  children = "Железно",
  variant = "inline",
  tone = "ink",
  rotate = 0,
  style,
  ...rest
}) {
  const tones = {
    ink: {
      fg: "var(--navy-800)",
      bd: "var(--navy-800)",
      bg: "transparent"
    },
    accent: {
      fg: "var(--ochre-700)",
      bd: "var(--ochre-500)",
      bg: "transparent"
    },
    onDeep: {
      fg: "var(--white)",
      bd: "var(--border-on-deep-strong)",
      bg: "transparent"
    },
    solid: {
      fg: "var(--white)",
      bd: "var(--navy-800)",
      bg: "var(--navy-800)"
    }
  };
  const t = tones[tone] || tones.ink;
  if (variant === "inline") {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "var(--font-tech)",
        fontSize: "var(--fs-caption)",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: t.fg,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: 14,
        height: 0,
        borderTop: "2px solid " + (tone === "accent" ? "var(--ochre-500)" : t.fg)
      }
    }), children);
  }
  const big = variant === "tape";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-block",
      padding: big ? "10px 22px" : "7px 14px",
      background: t.bg,
      color: t.fg,
      border: (big ? 3 : 2) + "px solid " + t.bd,
      borderRadius: "var(--radius-badge)",
      fontFamily: "var(--font-tech)",
      fontSize: big ? 22 : 13,
      fontWeight: "var(--fw-bold)",
      lineHeight: 1,
      letterSpacing: big ? "0.24em" : "0.18em",
      textIndent: big ? "0.24em" : "0.18em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      transform: rotate ? "rotate(" + rotate + "deg)" : "none",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { PromiseStamp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PromiseStamp.jsx", error: String((e && e.message) || e) }); }

// components/brand/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionLabel({
  children,
  tone = "ink",
  index,
  style,
  ...rest
}) {
  const tones = {
    ink: {
      fg: "var(--text-muted)",
      rule: "var(--border-strong)",
      num: "var(--text-strong)"
    },
    accent: {
      fg: "var(--text-accent)",
      rule: "var(--border-accent)",
      num: "var(--text-accent)"
    },
    onDeep: {
      fg: "var(--text-on-deep-muted)",
      rule: "var(--border-on-deep-strong)",
      num: "var(--ochre-500)"
    }
  };
  const t = tones[tone] || tones.ink;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 28,
      height: 0,
      borderTop: "2px solid " + t.rule,
      flex: "none"
    }
  }), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      fontWeight: "var(--fw-bold)",
      color: t.num,
      letterSpacing: "0.08em"
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tr-label)",
      textTransform: "uppercase",
      color: t.fg
    }
  }, children));
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LUCIDE = "https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/";
function Icon({
  name,
  size = 16,
  strokeColor = "currentColor",
  style,
  ...rest
}) {
  const url = "url(" + LUCIDE + name + ".svg)";
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      flex: "none",
      width: size,
      height: size,
      backgroundColor: strokeColor,
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const btnSizes = {
  sm: {
    h: 34,
    px: 14,
    fs: "var(--fs-caption)",
    gap: 7,
    icon: 14
  },
  md: {
    h: 44,
    px: 20,
    fs: "var(--fs-body-sm)",
    gap: 9,
    icon: 16
  },
  lg: {
    h: 54,
    px: 28,
    fs: "var(--fs-body)",
    gap: 11,
    icon: 18
  }
};
const btnVariants = {
  primary: {
    bg: "var(--petrol-800)",
    fg: "var(--white)",
    bd: "var(--petrol-800)",
    bgHover: "var(--petrol-700)",
    bdHover: "var(--petrol-700)",
    bgActive: "var(--petrol-900)"
  },
  accent: {
    bg: "var(--ochre-500)",
    fg: "var(--navy-900)",
    bd: "var(--ochre-500)",
    bgHover: "var(--ochre-400)",
    bdHover: "var(--ochre-400)",
    bgActive: "var(--ochre-600)"
  },
  secondary: {
    bg: "transparent",
    fg: "var(--navy-800)",
    bd: "var(--border-strong)",
    bgHover: "rgba(27,45,66,.05)",
    bdHover: "var(--navy-800)",
    bgActive: "rgba(27,45,66,.10)"
  },
  ghost: {
    bg: "transparent",
    fg: "var(--petrol-700)",
    bd: "transparent",
    bgHover: "var(--petrol-050)",
    bdHover: "transparent",
    bgActive: "var(--petrol-100)"
  },
  onDeep: {
    bg: "var(--white)",
    fg: "var(--navy-900)",
    bd: "var(--white)",
    bgHover: "rgba(255,255,255,.86)",
    bdHover: "rgba(255,255,255,.86)",
    bgActive: "rgba(255,255,255,.74)"
  },
  onDeepOutline: {
    bg: "transparent",
    fg: "var(--white)",
    bd: "var(--border-on-deep-strong)",
    bgHover: "rgba(255,255,255,.10)",
    bdHover: "var(--white)",
    bgActive: "rgba(255,255,255,.16)"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  href,
  block = false,
  disabled = false,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const s = btnSizes[size] || btnSizes.md;
  const v = btnVariants[variant] || btnVariants.primary;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const base = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.h,
    padding: "0 " + s.px + "px",
    fontFamily: "var(--font-text)",
    fontSize: s.fs,
    fontWeight: "var(--fw-semibold)",
    lineHeight: 1,
    letterSpacing: "0.005em",
    borderRadius: "var(--radius-control)",
    border: "1px solid " + (hover && !disabled ? v.bdHover : v.bd),
    background: disabled ? "var(--steel-150)" : active ? v.bgActive : hover ? v.bgHover : v.bg,
    color: disabled ? "var(--text-faint)" : v.fg,
    borderColor: disabled ? "var(--steel-200)" : hover ? v.bdHover : v.bd,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "var(--transition-control)",
    transform: active && !disabled ? "scale(var(--press-scale))" : "none",
    textDecoration: "none",
    whiteSpace: "nowrap",
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  };
  const body = /*#__PURE__*/React.createElement(React.Fragment, null, icon && iconPosition === "left" && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }), /*#__PURE__*/React.createElement("span", null, children), icon && iconPosition === "right" && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }));
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: base
  }, handlers, rest), body);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: base
  }, handlers, rest), body);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/data/SpecTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SpecTable({
  caption,
  columns = [],
  rows = [],
  footnote,
  dense = false,
  tone = "light",
  style,
  ...rest
}) {
  const dark = tone === "deep";
  const pad = dense ? "8px 12px" : "12px 16px";
  const line = dark ? "var(--border-on-deep)" : "var(--border-hair)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "var(--sp-3)",
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tr-label)",
      textTransform: "uppercase",
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-muted)"
    }
  }, caption), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-text)",
      fontSize: dense ? "var(--fs-caption)" : "var(--fs-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      padding: pad,
      textAlign: c.align || (i === 0 ? "left" : "right"),
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-muted)",
      borderBottom: "2px solid " + (dark ? "var(--border-on-deep-strong)" : "var(--border-ink)"),
      whiteSpace: "nowrap"
    }
  }, c.label, c.unit && /*#__PURE__*/React.createElement("span", {
    style: {
      color: dark ? "var(--text-on-deep-faint)" : "var(--text-faint)"
    }
  }, ", ", c.unit))))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => {
    const cells = Array.isArray(r) ? r : r.cells;
    const highlight = !Array.isArray(r) && r.highlight;
    return /*#__PURE__*/React.createElement("tr", {
      key: ri,
      style: {
        background: highlight ? dark ? "rgba(209,162,80,.10)" : "var(--ochre-100)" : "transparent"
      }
    }, cells.map((cell, ci) => /*#__PURE__*/React.createElement("td", {
      key: ci,
      style: {
        padding: pad,
        textAlign: columns[ci] && columns[ci].align || (ci === 0 ? "left" : "right"),
        borderBottom: "1px solid " + line,
        color: ci === 0 ? dark ? "var(--white)" : "var(--text-strong)" : dark ? "var(--text-on-deep-muted)" : "var(--text-body)",
        fontFamily: ci === 0 ? "var(--font-text)" : "var(--font-tech)",
        fontWeight: ci === 0 ? "var(--fw-medium)" : "var(--fw-regular)",
        fontVariantNumeric: "tabular-nums"
      }
    }, cell)));
  }))), footnote && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--sp-3)",
      fontSize: "var(--fs-caption)",
      lineHeight: 1.5,
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-muted)"
    }
  }, footnote));
}
Object.assign(__ds_scope, { SpecTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SpecTable.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldLabelStyle = {
  display: "block",
  fontFamily: "var(--font-tech)",
  fontSize: "var(--fs-micro)",
  fontWeight: "var(--fw-medium)",
  letterSpacing: "var(--tr-label)",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: "var(--sp-2)"
};
const fieldHintStyle = {
  display: "block",
  fontSize: "var(--fs-caption)",
  color: "var(--text-muted)",
  marginTop: "var(--sp-2)"
};
function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "block",
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: fieldLabelStyle
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ochre-700)"
    }
  }, " *")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      ...fieldHintStyle,
      color: error ? "var(--err-fg)" : "var(--text-muted)"
    }
  }, error || hint));
}
function controlStyle({
  invalid,
  focused,
  disabled,
  size = "md"
}) {
  const h = size === "sm" ? 36 : size === "lg" ? 54 : 44;
  return {
    width: "100%",
    height: h,
    padding: "0 14px",
    fontFamily: "var(--font-text)",
    fontSize: "var(--fs-body-sm)",
    color: disabled ? "var(--text-faint)" : "var(--text-strong)",
    background: disabled ? "var(--steel-100)" : "var(--white)",
    border: "1px solid " + (invalid ? "var(--err-line)" : focused ? "var(--petrol-600)" : "var(--border-strong)"),
    borderRadius: "var(--radius-control)",
    outline: "none",
    boxShadow: focused ? "inset 0 0 0 1px var(--petrol-600)" : "none",
    transition: "var(--transition-control)"
  };
}
function Input({
  size = "md",
  invalid = false,
  disabled = false,
  multiline = false,
  rows = 4,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const cs = controlStyle({
    invalid,
    focused,
    disabled,
    size
  });
  const shared = {
    disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    ...rest
  };
  if (multiline) return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    style: {
      ...cs,
      height: "auto",
      padding: "12px 14px",
      lineHeight: "var(--lh-body)",
      resize: "vertical",
      ...style
    }
  }, shared));
  return /*#__PURE__*/React.createElement("input", _extends({
    style: {
      ...cs,
      ...style
    }
  }, shared));
}
function Select({
  size = "md",
  invalid = false,
  disabled = false,
  options = [],
  placeholder,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const cs = controlStyle({
    invalid,
    focused,
    disabled,
    size
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      ...cs,
      appearance: "none",
      paddingRight: 38,
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      width: 8,
      height: 8,
      marginTop: -6,
      borderRight: "1.5px solid var(--steel-500)",
      borderBottom: "1.5px solid var(--steel-500)",
      transform: "rotate(45deg)",
      pointerEvents: "none"
    }
  }));
}
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--sp-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      flex: "none",
      width: 18,
      height: 18,
      marginTop: 2,
      borderRadius: "var(--radius-xs)",
      border: "1px solid " + (checked ? "var(--petrol-800)" : "var(--border-strong)"),
      background: checked ? "var(--petrol-800)" : disabled ? "var(--steel-100)" : "var(--white)",
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: "inherit"
    }
  }), checked && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 5,
      top: 3,
      width: 6,
      height: 10,
      borderRight: "2px solid #fff",
      borderBottom: "2px solid #fff",
      transform: "rotate(40deg)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-sm)",
      color: disabled ? "var(--text-faint)" : "var(--text-body)",
      lineHeight: 1.4
    }
  }, label));
}
Object.assign(__ds_scope, { Field, Input, Select, Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CtaPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CtaPanel({
  title = "Посчитаем под ваш объект",
  body,
  primaryLabel = "Запросить расчёт",
  primaryHref = "#request",
  secondaryLabel,
  secondaryHref,
  contact,
  tone = "deep",
  pattern = "zigzag",
  style,
  ...rest
}) {
  const dark = tone !== "light";
  const bg = tone === "navy" ? "var(--surface-navy)" : tone === "light" ? "var(--surface-card)" : "var(--surface-deep)";
  return /*#__PURE__*/React.createElement(__ds_scope.BrandPattern, _extends({
    as: "section",
    pattern: pattern,
    color: dark ? "var(--ochre-500)" : "var(--ochre-500)",
    opacity: dark ? 0.15 : 0.2,
    fade: "right",
    style: {
      background: bg,
      border: dark ? "none" : "1px solid var(--border-hair)",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      ...style
    }
  }, dark ? {
    "data-on-deep": "true"
  } : null, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--sp-10)",
      padding: "var(--sp-16) var(--sp-12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-display-3)",
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tr-display)",
      color: dark ? "var(--white)" : "var(--text-strong)"
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-lead)",
      lineHeight: 1.45,
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-body)"
    }
  }, body), contact && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-2)",
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-caption)",
      letterSpacing: "0.04em",
      color: dark ? "var(--text-on-deep-faint)" : "var(--text-muted)"
    }
  }, contact)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? "onDeep" : "primary",
    size: "lg",
    icon: "arrow-right",
    href: primaryHref
  }, primaryLabel), secondaryLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? "onDeepOutline" : "secondary",
    size: "lg",
    href: secondaryHref
  }, secondaryLabel))));
}
Object.assign(__ds_scope, { CtaPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CtaPanel.jsx", error: String((e && e.message) || e) }); }

// components/media/PhotoFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PhotoFrame({
  src,
  alt = "",
  ratio = "4 / 3",
  caption,
  overlay,
  kind = "photo",
  objectPosition = "center",
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      position: "relative",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: ratio,
      overflow: "hidden",
      background: "var(--steel-200)",
      borderRadius: "var(--radius-image)"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--steel-150)",
      color: "var(--text-faint)",
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-caption)",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      textAlign: "center",
      padding: "var(--sp-4)"
    }
  }, alt || "документальное фото объекта"), kind === "render" && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      padding: "5px 9px",
      background: "var(--navy-900)",
      color: "var(--white)",
      fontFamily: "var(--font-tech)",
      fontSize: 9.5,
      fontWeight: "var(--fw-medium)",
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    }
  }, "\u0432\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"), overlay && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "var(--sp-5)",
      background: "var(--scrim-bottom)"
    }
  }, overlay), children), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: "var(--sp-3)"
    }
  }, caption));
}
Object.assign(__ds_scope, { PhotoFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/PhotoFrame.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SiteFooter({
  columns = [],
  phone,
  email,
  address,
  note,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    "data-on-deep": "true",
    style: {
      background: "var(--surface-deepest)",
      color: "var(--text-on-deep-muted)",
      padding: "var(--sp-16) var(--gutter) var(--sp-10)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(240px,1fr) repeat(auto-fit,minmax(160px,1fr))",
      gap: "var(--sp-10)",
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-5)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "stacked",
    tone: "white-ochre",
    size: 26
  }), address && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-body-sm)",
      lineHeight: 1.5
    }
  }, address), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-body-sm)",
      color: "var(--white)"
    }
  }, phone && /*#__PURE__*/React.createElement("span", null, phone), email && /*#__PURE__*/React.createElement("span", null, email))), columns.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      letterSpacing: "var(--tr-label)",
      textTransform: "uppercase",
      color: "var(--text-on-deep-faint)",
      marginBottom: "var(--sp-1)"
    }
  }, c.title), c.items.map((it, j) => /*#__PURE__*/React.createElement("a", {
    key: j,
    href: it.href || "#",
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-on-deep-muted)",
      textDecoration: "none",
      borderBottom: "none"
    }
  }, it.label))))), note && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "var(--sp-12) auto 0",
      paddingTop: "var(--sp-5)",
      borderTop: "1px solid var(--border-on-deep)",
      fontSize: "var(--fs-caption)",
      color: "var(--text-on-deep-faint)"
    }
  }, note));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SiteHeader({
  links = [],
  active,
  phone,
  ctaLabel = "Посчитаем под ваш объект",
  ctaHref = "#request",
  tone = "light",
  onNavigate,
  style,
  ...rest
}) {
  const dark = tone === "deep";
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-10)",
      height: "var(--header-h)",
      padding: "0 var(--gutter)",
      background: dark ? "var(--surface-deepest)" : "var(--surface-card)",
      borderBottom: "1px solid " + (dark ? "var(--border-on-deep)" : "var(--border-hair)"),
      ...style
    }
  }, dark ? {
    "data-on-deep": "true"
  } : null, rest), /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "lockup",
    tone: dark ? "white-ochre" : "brand",
    size: 22
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-6)",
      marginLeft: "auto"
    }
  }, links.map(l => {
    const isActive = active === l.id || active === l.label;
    return /*#__PURE__*/React.createElement("a", {
      key: l.id || l.label,
      href: l.href || "#",
      onClick: onNavigate ? e => {
        e.preventDefault();
        onNavigate(l.id || l.label);
      } : undefined,
      style: {
        fontSize: "var(--fs-body-sm)",
        fontWeight: isActive ? "var(--fw-semibold)" : "var(--fw-medium)",
        color: dark ? isActive ? "var(--white)" : "var(--text-on-deep-muted)" : isActive ? "var(--text-strong)" : "var(--text-body)",
        borderBottom: isActive ? "2px solid var(--ochre-500)" : "2px solid transparent",
        paddingBottom: 2,
        textDecoration: "none",
        transition: "var(--transition-control)",
        whiteSpace: "nowrap"
      }
    }, l.label);
  })), phone && /*#__PURE__*/React.createElement("a", {
    href: "tel:" + phone.replace(/[^\d+]/g, ""),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-body-sm)",
      color: dark ? "var(--white)" : "var(--text-strong)",
      textDecoration: "none",
      borderBottom: "none",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 15,
    strokeColor: "var(--ochre-600)"
  }), phone), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? "onDeep" : "primary",
    size: "sm",
    href: ctaHref
  }, ctaLabel));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/print/PageA4.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PageA4({
  children,
  variant = "content",
  pageNumber,
  pageTotal,
  documentTitle,
  meta,
  footerNote = "ООО «НЗМО» · Новосибирск · nzmo.ru",
  style,
  ...rest
}) {
  const cover = variant === "cover";
  return /*#__PURE__*/React.createElement("section", _extends({
    "data-page": "a4"
  }, cover ? {
    "data-on-deep": "true"
  } : null, {
    style: {
      position: "relative",
      width: "var(--page-a4-w)",
      height: "var(--page-a4-h)",
      background: cover ? "var(--surface-deep)" : "var(--white)",
      color: cover ? "var(--white)" : "var(--text-body)",
      boxShadow: "var(--shadow-card)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      flex: "none",
      ...style
    }
  }, rest), !cover && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--sp-6)",
      padding: "12mm var(--page-margin) 5mm",
      borderBottom: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "lockup",
    tone: "brand",
    size: 15,
    tagline: false
  }), documentTitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "7.5pt",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, documentTitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      padding: cover ? "var(--page-margin)" : "8mm var(--page-margin) 6mm",
      display: "flex",
      flexDirection: "column",
      gap: cover ? 0 : "6mm"
    }
  }, children), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--sp-4)",
      padding: "4mm var(--page-margin) 10mm",
      borderTop: "1px solid " + (cover ? "var(--border-on-deep)" : "var(--border-hair)"),
      fontFamily: "var(--font-tech)",
      fontSize: "7pt",
      letterSpacing: "0.08em",
      color: cover ? "var(--text-on-deep-faint)" : "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", null, meta || footerNote), pageNumber != null && /*#__PURE__*/React.createElement("span", null, pageTotal ? pageNumber + " / " + pageTotal : pageNumber)));
}
Object.assign(__ds_scope, { PageA4 });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/print/PageA4.jsx", error: String((e && e.message) || e) }); }

// components/proof/AfterRequest.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AfterRequest({
  title = "Что будет после заявки",
  steps = [],
  tone = "light",
  style,
  ...rest
}) {
  const dark = tone === "deep";
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: "var(--sp-8)",
      fontSize: "var(--fs-h2)",
      color: dark ? "var(--white)" : "var(--text-strong)"
    }
  }, title), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
      gap: 0,
      borderTop: "2px solid " + (dark ? "var(--border-on-deep-strong)" : "var(--border-ink)")
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      padding: "var(--sp-5) var(--sp-5) var(--sp-6) 0",
      borderRight: i === steps.length - 1 ? "none" : "1px solid " + (dark ? "var(--border-on-deep)" : "var(--border-hair)"),
      paddingRight: "var(--sp-6)",
      marginRight: i === steps.length - 1 ? 0 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--sp-3)",
      marginBottom: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-bold)",
      color: "var(--ochre-600)"
    }
  }, String(i + 1).padStart(2, "0")), s.when && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: dark ? "var(--text-on-deep-faint)" : "var(--text-faint)"
    }
  }, s.when)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-text)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--fs-h4)",
      lineHeight: 1.3,
      color: dark ? "var(--white)" : "var(--text-strong)",
      marginBottom: "var(--sp-2)"
    }
  }, s.title), s.body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-body-sm)",
      lineHeight: "var(--lh-body)",
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-body)"
    }
  }, s.body)))));
}
Object.assign(__ds_scope, { AfterRequest });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/AfterRequest.jsx", error: String((e && e.message) || e) }); }

// components/proof/DocumentBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const docKindIcon = {
  pdf: "file-text",
  dwg: "ruler",
  xls: "table",
  zip: "folder-archive",
  img: "image"
};
function DocumentBlock({
  title,
  documents = [],
  tone = "light",
  style,
  ...rest
}) {
  const dark = tone === "deep";
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      border: "1px solid " + (dark ? "var(--border-on-deep)" : "var(--border-hair)"),
      borderRadius: "var(--radius-card)",
      background: dark ? "rgba(255,255,255,.04)" : "var(--surface-card)",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("header", {
    style: {
      padding: "var(--sp-4) var(--pad-card)",
      borderBottom: "1px solid " + (dark ? "var(--border-on-deep)" : "var(--border-hair)"),
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tr-label)",
      textTransform: "uppercase",
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-muted)"
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, documents.map((d, i) => /*#__PURE__*/React.createElement(DocumentRow, _extends({
    key: i,
    dark: dark,
    last: i === documents.length - 1
  }, d)))));
}
function DocumentRow({
  name,
  kind = "pdf",
  size,
  note,
  href = "#",
  dark,
  last
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "grid",
      gridTemplateColumns: "22px 1fr auto auto",
      alignItems: "center",
      gap: "var(--sp-4)",
      padding: "var(--sp-4) var(--pad-card)",
      borderBottom: last ? "none" : "1px solid " + (dark ? "var(--border-on-deep)" : "var(--border-soft)"),
      background: hover ? dark ? "rgba(255,255,255,.06)" : "var(--surface-page)" : "transparent",
      color: dark ? "var(--white)" : "var(--text-strong)",
      textDecoration: "none",
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: docKindIcon[kind] || "file-text",
    size: 20,
    strokeColor: dark ? "var(--ochre-500)" : "var(--petrol-700)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1.35
    }
  }, name), note && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 2,
      fontSize: "var(--fs-caption)",
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-muted)"
    }
  }, note)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: dark ? "var(--text-on-deep-faint)" : "var(--text-faint)",
      whiteSpace: "nowrap"
    }
  }, kind, size ? " · " + size : ""), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "download",
    size: 16,
    strokeColor: dark ? "var(--text-on-deep-muted)" : "var(--text-muted)"
  })));
}
Object.assign(__ds_scope, { DocumentBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/DocumentBlock.jsx", error: String((e && e.message) || e) }); }

// components/proof/ProofCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProofCard({
  value,
  unit,
  title,
  body,
  source,
  tone = "light",
  accent = false,
  style,
  ...rest
}) {
  const dark = tone === "deep";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)",
      padding: "var(--pad-card)",
      background: dark ? "rgba(255,255,255,.05)" : "var(--surface-card)",
      border: "1px solid " + (dark ? "var(--border-on-deep)" : "var(--border-hair)"),
      borderTop: accent ? "3px solid var(--ochre-500)" : "1px solid " + (dark ? "var(--border-on-deep)" : "var(--border-hair)"),
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, rest), (value || unit) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-medium)",
      fontSize: 38,
      lineHeight: 1,
      letterSpacing: "var(--tr-display)",
      color: dark ? "var(--white)" : "var(--text-strong)"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-body-sm)",
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-muted)"
    }
  }, unit)), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-text)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "var(--fs-h4)",
      lineHeight: 1.3,
      color: dark ? "var(--white)" : "var(--text-strong)"
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-body-sm)",
      lineHeight: "var(--lh-body)",
      color: dark ? "var(--text-on-deep-muted)" : "var(--text-body)"
    }
  }, body), source && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "var(--sp-3)",
      borderTop: "1px solid " + (dark ? "var(--border-on-deep)" : "var(--border-soft)"),
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: dark ? "var(--text-on-deep-faint)" : "var(--text-faint)"
    }
  }, source));
}
Object.assign(__ds_scope, { ProofCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/ProofCard.jsx", error: String((e && e.message) || e) }); }

// components/proof/SpecCaption.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SpecCaption({
  city,
  object,
  section,
  pitch,
  ral,
  light,
  tone = "ink",
  separator = "→",
  items,
  style,
  ...rest
}) {
  const geometry = [section, pitch].filter(Boolean).join(" × ");
  const parts = items || [city, object, [geometry, ral].filter(Boolean).join(" × "), light].filter(Boolean);
  const tones = {
    ink: {
      fg: "var(--text-muted)",
      strong: "var(--text-strong)",
      sep: "var(--ochre-600)"
    },
    onDeep: {
      fg: "var(--text-on-deep-muted)",
      strong: "var(--white)",
      sep: "var(--ochre-500)"
    },
    onPhoto: {
      fg: "rgba(255,255,255,.78)",
      strong: "var(--white)",
      sep: "var(--ochre-400)"
    }
  };
  const t = tones[tone] || tones.ink;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
      gap: "0 8px",
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-caption)",
      lineHeight: 1.5,
      color: t.fg,
      ...style
    }
  }, rest), parts.map((p, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: t.sep
    }
  }, separator), /*#__PURE__*/React.createElement("span", {
    style: i === 0 ? {
      color: t.strong,
      fontWeight: "var(--fw-medium)"
    } : null
  }, p))));
}
Object.assign(__ds_scope, { SpecCaption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/SpecCaption.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Hero.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Hero({
  eyebrow,
  title,
  body,
  image,
  imageKind = "photo",
  spec,
  primaryLabel = "Посчитаем под ваш объект",
  primaryHref = "#request",
  secondaryLabel,
  secondaryHref,
  layout = "split",
  style,
  ...rest
}) {
  const full = layout === "full";
  const copy = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-6)",
      maxWidth: 640
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 34,
      borderTop: "2px solid var(--ochre-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--tr-label)",
      textTransform: "uppercase",
      color: full ? "var(--text-on-deep-muted)" : "var(--text-muted)"
    }
  }, eyebrow)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--fs-hero)",
      fontWeight: "var(--fw-semibold)",
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tr-display)",
      color: full ? "var(--white)" : "var(--text-strong)",
      textWrap: "balance"
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-lead)",
      lineHeight: 1.45,
      color: full ? "var(--text-on-deep-muted)" : "var(--text-body)",
      maxWidth: 560
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--sp-3)",
      marginTop: "var(--sp-2)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: full ? "onDeep" : "primary",
    size: "lg",
    icon: "arrow-right",
    href: primaryHref
  }, primaryLabel), secondaryLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: full ? "onDeepOutline" : "secondary",
    size: "lg",
    href: secondaryHref
  }, secondaryLabel)));
  if (full) {
    return /*#__PURE__*/React.createElement("section", _extends({
      "data-on-deep": "true",
      style: {
        position: "relative",
        minHeight: 620,
        display: "flex",
        alignItems: "flex-end",
        background: "var(--surface-deepest)",
        overflow: "hidden",
        ...style
      }
    }, rest), image && /*#__PURE__*/React.createElement("img", {
      src: image,
      alt: "",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: 0.5
      }
    }), /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top,rgba(11,20,32,.94) 0%,rgba(11,20,32,.62) 46%,rgba(11,20,32,.30) 100%)"
      }
    }), imageKind === "render" && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        padding: "6px 10px",
        background: "var(--navy-900)",
        color: "var(--white)",
        fontFamily: "var(--font-tech)",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase"
      }
    }, "\u0432\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: "100%",
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "var(--sp-20) var(--gutter) var(--sp-12)"
      }
    }, copy, spec && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--sp-10)",
        paddingTop: "var(--sp-5)",
        borderTop: "1px solid var(--border-on-deep)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.SpecCaption, _extends({
      tone: "onPhoto"
    }, spec)))));
  }
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: "var(--surface-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
      alignItems: "center",
      gap: "var(--sp-16)",
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--sp-20) var(--gutter)"
    }
  }, copy, /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 3",
      overflow: "hidden",
      background: "var(--steel-200)"
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), imageKind === "render" && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      padding: "5px 9px",
      background: "var(--navy-900)",
      color: "var(--white)",
      fontFamily: "var(--font-tech)",
      fontSize: 9.5,
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    }
  }, "\u0432\u0438\u0437\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F")), spec && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SpecCaption, spec)))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Hero.jsx", error: String((e && e.message) || e) }); }

// components/proof/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatusBadge({
  status = "produce",
  size = "md",
  label,
  style,
  ...rest
}) {
  const map = {
    produce: {
      text: "производим",
      bg: "var(--status-produce-bg)",
      fg: "var(--status-produce-fg)",
      bd: "var(--status-produce-line)"
    },
    supply: {
      text: "комплектуем",
      bg: "var(--status-supply-bg)",
      fg: "var(--status-supply-fg)",
      bd: "var(--status-supply-line)"
    }
  };
  const s = map[status] || map.produce;
  const h = size === "sm" ? 20 : size === "lg" ? 30 : 25;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      height: h,
      padding: "0 " + (size === "sm" ? 7 : 10) + "px",
      background: s.bg,
      color: s.fg,
      border: "1px solid " + s.bd,
      borderRadius: "var(--radius-badge)",
      fontFamily: "var(--font-tech)",
      fontSize: size === "sm" ? 9 : size === "lg" ? 12 : 10.5,
      fontWeight: "var(--fw-medium)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 5,
      height: 5,
      background: status === "produce" ? "var(--ochre-500)" : "var(--steel-400)",
      flex: "none"
    }
  }), label || s.text);
}
function Tag({
  children,
  tone = "neutral",
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: "var(--steel-100)",
      fg: "var(--text-body)",
      bd: "transparent"
    },
    outline: {
      bg: "transparent",
      fg: "var(--text-body)",
      bd: "var(--border-strong)"
    },
    petrol: {
      bg: "var(--petrol-050)",
      fg: "var(--petrol-800)",
      bd: "transparent"
    },
    accent: {
      bg: "var(--ochre-100)",
      fg: "var(--ochre-800)",
      bd: "transparent"
    },
    onDeep: {
      bg: "rgba(255,255,255,.10)",
      fg: "var(--text-on-deep)",
      bd: "var(--border-on-deep)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 26,
      padding: "0 10px",
      background: t.bg,
      color: t.fg,
      border: "1px solid " + t.bd,
      borderRadius: "var(--radius-badge)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { StatusBadge, Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProductCard({
  name,
  family,
  image,
  imageKind = "photo",
  status = "produce",
  specs = [],
  note,
  href = "#",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card)",
      border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border-hair)"),
      borderRadius: "var(--radius-card)",
      boxShadow: hover ? "var(--shadow-card)" : "none",
      textDecoration: "none",
      color: "inherit",
      overflow: "hidden",
      transition: "var(--transition-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.PhotoFrame, {
    src: image,
    kind: imageKind,
    ratio: "4 / 3",
    alt: name
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-3)",
      padding: "var(--pad-card)",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--sp-3)"
    }
  }, family && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-micro)",
      letterSpacing: "var(--tr-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, family), /*#__PURE__*/React.createElement(__ds_scope.StatusBadge, {
    status: status,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--fs-h4)",
      lineHeight: 1.25,
      letterSpacing: "var(--tr-heading)",
      color: "var(--text-strong)"
    }
  }, name), specs.length > 0 && /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "4px var(--sp-3)",
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-caption)"
    }
  }, specs.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      color: "var(--text-faint)"
    }
  }, s.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      color: "var(--text-body)",
      textAlign: "right",
      fontVariantNumeric: "tabular-nums"
    }
  }, s.value)))), note && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-body-sm)",
      lineHeight: 1.45,
      color: "var(--text-muted)"
    }
  }, note), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "auto",
      paddingTop: "var(--sp-4)",
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-semibold)",
      color: hover ? "var(--petrol-600)" : "var(--petrol-800)",
      transition: "var(--transition-control)"
    }
  }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0443", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15
  }))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/proof/CaseCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CaseCard({
  image,
  imageKind = "photo",
  city,
  object,
  section,
  pitch,
  ral,
  light,
  family,
  area,
  title,
  href = "#",
  layout = "vertical",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const horizontal = layout === "horizontal";
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: horizontal ? "grid" : "block",
      gridTemplateColumns: horizontal ? "minmax(0,1.1fr) minmax(0,1fr)" : undefined,
      gap: horizontal ? "var(--sp-8)" : undefined,
      background: "var(--surface-card)",
      border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border-hair)"),
      borderRadius: "var(--radius-card)",
      boxShadow: hover ? "var(--shadow-card)" : "none",
      textDecoration: "none",
      color: "inherit",
      overflow: "hidden",
      transition: "var(--transition-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.PhotoFrame, {
    src: image,
    kind: imageKind,
    ratio: horizontal ? "4 / 3" : "3 / 2",
    alt: [object, city].filter(Boolean).join(", "),
    style: {
      overflow: "hidden"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-4)",
      padding: "var(--pad-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--sp-2)"
    }
  }, family && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: "petrol"
  }, family), area && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: "outline"
  }, area)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--fs-h3)",
      lineHeight: 1.2,
      letterSpacing: "var(--tr-heading)",
      color: "var(--text-strong)"
    }
  }, title || object), /*#__PURE__*/React.createElement(__ds_scope.SpecCaption, {
    city: city,
    object: horizontal || !title ? undefined : object,
    section: section,
    pitch: pitch,
    ral: ral,
    light: light,
    style: {
      marginTop: "auto"
    }
  })));
}
Object.assign(__ds_scope, { CaseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/proof/CaseCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kp_a4/KpPages.jsx
try { (() => {
const {
  PageA4,
  Logo,
  SectionLabel,
  SpecTable,
  SpecCaption,
  StatusBadge,
  Tag,
  ProofCard,
  DocumentBlock,
  AfterRequest,
  PhotoFrame,
  BrandPattern
} = window.DesignSystem_793649;
const DOC = "Коммерческое предложение";
const TOTAL = 6;
const P = {
  lobby: "../../assets/photos/grillato-black-lobby-01.png",
  corridor: "../../assets/photos/rail-facade-corridor.png"
};
function Cover() {
  return /*#__PURE__*/React.createElement(PageA4, {
    variant: "cover"
  }, /*#__PURE__*/React.createElement(BrandPattern, {
    pattern: "zigzag",
    opacity: 0.16,
    fade: "radial",
    style: {
      position: "absolute",
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "stacked",
    tone: "white-ochre",
    size: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "onDeep"
  }, DOC, " \u2116 2026-114"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: "6mm",
      fontSize: "var(--fs-print-h1)",
      lineHeight: 1.06,
      letterSpacing: "-0.03em",
      color: "var(--white)",
      maxWidth: "150mm"
    }
  }, "\u041A\u0443\u0431\u043E\u043E\u0431\u0440\u0430\u0437\u043D\u0430\u044F \u0440\u0435\u0439\u043A\u0430 40\xD740 \u043D\u0430 1 240 \u043C\xB2"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "5mm",
      fontSize: "var(--fs-print-body)",
      color: "var(--text-on-deep-muted)",
      maxWidth: "120mm"
    }
  }, "\u0416\u041A \xAB\u0421\u0435\u0432\u0435\u0440\u043D\u044B\u0439\xBB, \u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A \u2014 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u0438 \u043B\u0438\u0444\u0442\u043E\u0432\u044B\u0435 \u0445\u043E\u043B\u043B\u044B. \u0414\u043B\u044F \u041E\u041E\u041E \xAB\u0413\u0435\u043D\u043F\u043E\u0434\u0440\u044F\u0434-\u0421\xBB, \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0421\u0435\u0440\u0433\u0435\u0439 \u0418\u043B\u044C\u0438\u043D."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8mm",
      paddingTop: "5mm",
      borderTop: "1px solid var(--border-on-deep)",
      display: "flex",
      gap: "10mm",
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-print-caption)",
      color: "var(--text-on-deep-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u0414\u0430\u0442\u0430: 14.07.2026"), /*#__PURE__*/React.createElement("span", null, "\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442: 30 \u0434\u043D\u0435\u0439"), /*#__PURE__*/React.createElement("span", null, "\u0421\u043E\u0441\u0442\u0430\u0432\u0438\u043B: \u043E\u0442\u0434\u0435\u043B \u0440\u0430\u0441\u0447\u0451\u0442\u0430 \u041D\u0417\u041C\u041E")))));
}
function ObjectPage() {
  return /*#__PURE__*/React.createElement(PageA4, {
    documentTitle: DOC,
    pageNumber: 2,
    pageTotal: TOTAL
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "01"
  }, "\u041E\u0431\u044A\u0435\u043A\u0442 \u0438 \u0437\u0430\u0434\u0430\u0447\u0430"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-print-h2)",
      lineHeight: 1.14,
      maxWidth: "140mm"
    }
  }, "\u0414\u0432\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u0438 \u0447\u0435\u0442\u044B\u0440\u0435 \u043B\u0438\u0444\u0442\u043E\u0432\u044B\u0445 \u0445\u043E\u043B\u043B\u0430 \u0432 \u043E\u0434\u043D\u043E\u0439 \u043F\u043B\u043E\u0441\u043A\u043E\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-print-body)",
      lineHeight: 1.5,
      maxWidth: "150mm"
    }
  }, "\u041F\u043E \u043F\u043B\u0430\u043D\u0443 \u043F\u043E\u0442\u043E\u043B\u043A\u0430 \u2014 1 240 \u043C\xB2 \u043A\u0443\u0431\u043E\u043E\u0431\u0440\u0430\u0437\u043D\u043E\u0439 \u0440\u0435\u0439\u043A\u0438 40\xD740 \u0441 \u0448\u0430\u0433\u043E\u043C 80 \u043C\u043C, \u043E\u043A\u0440\u0430\u0441\u043A\u0430 RAL 9005. \u0412 \u043B\u0438\u0444\u0442\u043E\u0432\u044B\u0445 \u0445\u043E\u043B\u043B\u0430\u0445 \u043F\u043B\u043E\u0441\u043A\u043E\u0441\u0442\u044C \u0438\u0434\u0451\u0442 \u043F\u043E \u0440\u0430\u0434\u0438\u0443\u0441\u0443, \u0432\u043E \u0432\u0445\u043E\u0434\u043D\u044B\u0445 \u0433\u0440\u0443\u043F\u043F\u0430\u0445 \u2014 \u0441 \u043D\u0430\u043A\u043B\u043E\u043D\u043D\u044B\u043C \u0443\u0447\u0430\u0441\u0442\u043A\u043E\u043C \u0443 \u0432\u0438\u0442\u0440\u0430\u0436\u0430. \u0421\u0432\u0435\u0442 \u2014 \u0442\u0440\u0435\u043A\u043E\u0432\u044B\u0439, \u0432\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u043F\u043B\u043E\u0441\u043A\u043E\u0441\u0442\u044C \u0440\u0435\u0439\u043A\u0438."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "6mm",
      marginTop: "2mm"
    }
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    src: P.lobby,
    ratio: "4 / 3",
    alt: "\u041F\u043E\u0445\u043E\u0436\u0438\u0439 \u043E\u0431\u044A\u0435\u043A\u0442: \u0432\u0445\u043E\u0434\u043D\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430",
    caption: /*#__PURE__*/React.createElement(SpecCaption, {
      city: "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A",
      object: "\u0411\u0426 \u043D\u0430 \u041A\u0440\u0430\u0441\u043D\u043E\u043C \u043F\u0440\u043E\u0441\u043F\u0435\u043A\u0442\u0435",
      section: "40\xD740",
      pitch: "\u0448\u0430\u0433 80",
      ral: "RAL 9005",
      light: "\u0442\u0440\u0435\u043A\u043E\u0432\u044B\u0439"
    })
  }), /*#__PURE__*/React.createElement(PhotoFrame, {
    src: P.corridor,
    ratio: "4 / 3",
    alt: "\u041F\u043E\u0445\u043E\u0436\u0438\u0439 \u043E\u0431\u044A\u0435\u043A\u0442: \u043B\u0438\u0444\u0442\u043E\u0432\u043E\u0439 \u0445\u043E\u043B\u043B \u043F\u043E \u0440\u0430\u0434\u0438\u0443\u0441\u0443",
    caption: /*#__PURE__*/React.createElement(SpecCaption, {
      city: "\u0418\u0436\u0435\u0432\u0441\u043A",
      object: "\u0422\u0426, \u043B\u0438\u0444\u0442\u043E\u0432\u044B\u0435 \u0445\u043E\u043B\u043B\u044B",
      section: "50\xD750",
      pitch: "\u0448\u0430\u0433 100",
      ral: "RAL 7016",
      light: "\u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043B\u0438\u043D\u0435\u0439\u043D\u044B\u0439"
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "4mm",
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: "2mm"
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: "produce"
  }), /*#__PURE__*/React.createElement(Tag, {
    tone: "outline"
  }, "\u0430\u043B\u044E\u043C\u0438\u043D\u0438\u0439"), /*#__PURE__*/React.createElement(Tag, {
    tone: "outline"
  }, "RAL 9005"), /*#__PURE__*/React.createElement(Tag, {
    tone: "outline"
  }, "\u0434\u043B\u0438\u043D\u0430 \u0434\u043E 4 000 \u043C\u043C")));
}
function SpecPage() {
  return /*#__PURE__*/React.createElement(PageA4, {
    documentTitle: DOC,
    pageNumber: 3,
    pageTotal: TOTAL
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "02"
  }, "\u0421\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0430"), /*#__PURE__*/React.createElement(SpecTable, {
    dense: true,
    caption: "\u0420\u0430\u0441\u0445\u043E\u0434 \u043D\u0430 1 \u043C\xB2 \u0438 \u043E\u0431\u044A\u0451\u043C \u043D\u0430 1 240 \u043C\xB2 \u2014 \u0440\u0435\u0439\u043A\u0430 40\xD740, \u0448\u0430\u0433 80",
    columns: [{
      label: "Позиция"
    }, {
      label: "Артикул"
    }, {
      label: "Расход",
      unit: "на 1 м²"
    }, {
      label: "Кол-во"
    }, {
      label: "Ед."
    }],
    rows: [["Рейка кубообразная 40×40×4000", "КР-40-4000", "8,2", "10 168", "м"], ["Траверса несущая 3000", "ТР-3000", "0,7", "868", "шт"], ["Подвес регулируемый 250–500", "ПД-250", "0,9", "1 116", "шт"], ["Пружинный зажим", "ПЗ-40", "1,8", "2 232", "шт"], ["Профиль пристенный", "ПП-40", "0,4", "496", "м"], ["Окраска порошковая RAL 9005", "ОК-9005", "1,0", "1 240", "м²"], {
      cells: ["Итого комплект на объект", "—", "—", "1 240", "м²"],
      highlight: true
    }],
    footnote: "\u0420\u0430\u0441\u0445\u043E\u0434 \u0443\u043A\u0430\u0437\u0430\u043D \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u043F\u043E\u0434\u0440\u0435\u0437\u043A\u0438; \u043D\u0430 \u0440\u0430\u0434\u0438\u0443\u0441\u043D\u044B\u0445 \u0443\u0447\u0430\u0441\u0442\u043A\u0430\u0445 \u043F\u043E\u0434\u0440\u0435\u0437\u043A\u0430 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E \u043F\u043E \u043F\u043B\u0430\u043D\u0443. \u041A\u0440\u0435\u043F\u0451\u0436 \u043A \u043F\u0435\u0440\u0435\u043A\u0440\u044B\u0442\u0438\u044E \u0432 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442 \u043D\u0435 \u0432\u0445\u043E\u0434\u0438\u0442 \u2014 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u043F\u043E \u0442\u0438\u043F\u0443 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u044F."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "6mm",
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(ProofCard, {
    title: "\u0426\u0435\u043D\u0430 \u0437\u0430 \u043C\xB2 \u0438 \u0437\u0430 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442",
    body: "\u0412 \u0441\u0432\u043E\u0434\u043D\u043E\u0439 \u0442\u0430\u0431\u043B\u0438\u0446\u0435 \u043D\u0438\u0436\u0435 \u2014 \u0446\u0435\u043D\u0430 \u0437\u0430 1 \u043C\xB2 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0438 \u0438\u0442\u043E\u0433 \u043F\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0443. \u041F\u043E\u0437\u0438\u0446\u0438\u0438 \u0441\u043E \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u043C \xAB\u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0443\u0435\u043C\xBB \u0432\u044B\u043D\u0435\u0441\u0435\u043D\u044B \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u043E\u0439.",
    source: "\u041F\u0440\u0430\u0439\u0441 \u043E\u0442 01.07.2026"
  }), /*#__PURE__*/React.createElement(ProofCard, {
    title: "\u0427\u0442\u043E \u0443\u0442\u043E\u0447\u043D\u044F\u0435\u043C \u0434\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430",
    body: "\u041E\u0442\u043C\u0435\u0442\u043A\u0438 \u0447\u0438\u0441\u0442\u043E\u0433\u043E \u043F\u043E\u0442\u043E\u043B\u043A\u0430, \u0443\u0437\u043B\u044B \u043F\u0440\u0438\u043C\u044B\u043A\u0430\u043D\u0438\u044F \u043A \u0432\u0438\u0442\u0440\u0430\u0436\u0443, \u0442\u043E\u0447\u043A\u0438 \u043F\u043E\u0434\u0432\u0435\u0441\u0430 \u043D\u0430 \u0440\u0430\u0434\u0438\u0443\u0441\u0435.",
    source: "\u0428\u0430\u0431\u043B\u043E\u043D \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445",
    accent: true
  })));
}
function DocsPage() {
  return /*#__PURE__*/React.createElement(PageA4, {
    documentTitle: DOC,
    pageNumber: 4,
    pageTotal: TOTAL
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "03"
  }, "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043A \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0443"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-print-body)",
      lineHeight: 1.5,
      maxWidth: "150mm"
    }
  }, "\u0412\u0441\u0451, \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0449\u0438\u043A\u0443 \u0438 \u043C\u043E\u043D\u0442\u0430\u0436\u043D\u043E\u0439 \u0441\u043B\u0443\u0436\u0431\u0435. \u0424\u0430\u0439\u043B\u044B \u043F\u0440\u0438\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0435\u043C \u043A \u043F\u0438\u0441\u044C\u043C\u0443 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u044D\u0442\u0438\u043C \u041A\u041F."), /*#__PURE__*/React.createElement(DocumentBlock, {
    title: "\u0412 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438",
    documents: [{
      name: "Кубообразная рейка 40×40 — узлы монтажа",
      kind: "dwg",
      size: "1,8 МБ",
      note: "Примыкания, компенсация, ревизионные участки"
    }, {
      name: "Спецификация комплекта на объект",
      kind: "xls",
      size: "112 КБ",
      note: "Позиции, артикулы, количество"
    }, {
      name: "Протокол пожарных испытаний",
      kind: "pdf",
      size: "2,4 МБ"
    }, {
      name: "Карта RAL — доступные цвета окраски",
      kind: "pdf",
      size: "640 КБ"
    }, {
      name: "Инструкция по монтажу и обслуживанию",
      kind: "pdf",
      size: "1,1 МБ"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      padding: "5mm",
      background: "var(--surface-tint)",
      border: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-print-caption)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: "2mm"
    }
  }, "\u041E\u0433\u043E\u0432\u043E\u0440\u043A\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-print-caption)",
      lineHeight: 1.5,
      color: "var(--text-body)"
    }
  }, "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0430\u0446\u0438\u044F \u0438 \u0441\u0435\u0447\u0435\u043D\u0438\u044F \u0443\u0442\u043E\u0447\u043D\u044F\u044E\u0442\u0441\u044F \u043F\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0443. \u0426\u0435\u043D\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u043D\u0430 \u0434\u0430\u0442\u0443 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u041A\u041F. \u0421\u0440\u043E\u043A\u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430 \u0441\u043E\u0433\u043B\u0430\u0441\u0443\u044E\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0446\u0432\u0435\u0442\u0430 \u043E\u0431\u0440\u0430\u0437\u0446\u043E\u043C.")));
}
function ProcessPage() {
  return /*#__PURE__*/React.createElement(PageA4, {
    documentTitle: DOC,
    pageNumber: 5,
    pageTotal: TOTAL
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "04"
  }, "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0440\u0430\u0431\u043E\u0442\u044B"), /*#__PURE__*/React.createElement(AfterRequest, {
    title: "\u0427\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F",
    steps: [{
      title: "Подтверждаем исходные",
      body: "План с отметками, узлы примыканий, тип основания под крепёж."
    }, {
      title: "Согласуем цвет образцом",
      body: "Красим пробную рейку по RAL 9005, отправляем на объект."
    }, {
      title: "Запускаем производство",
      body: "Резка в размер, окраска, упаковка под транспортное плечо."
    }, {
      title: "Отгружаем комплектом",
      body: "Маркировка по зонам объекта, чтобы монтаж шёл без разбора."
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(SpecTable, {
    dense: true,
    caption: "\u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442 \u0438 \u0447\u0442\u043E \u043D\u0435 \u0432\u0445\u043E\u0434\u0438\u0442",
    columns: [{
      label: "Позиция"
    }, {
      label: "Статус",
      align: "right"
    }],
    rows: [["Рейка, траверсы, подвесы, зажимы, пристенный профиль", "производим"], ["Порошковая окраска по RAL", "производим"], ["Резка в размер и маркировка по зонам", "производим"], ["Крепёж к перекрытию", "комплектуем"], ["Трековые светильники и драйверы", "комплектуем"], ["Монтаж на объекте", "по отдельному договору"]]
  })));
}
function ContactPage() {
  return /*#__PURE__*/React.createElement(PageA4, {
    documentTitle: DOC,
    pageNumber: 6,
    pageTotal: TOTAL
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "05"
  }, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-print-h2)",
      lineHeight: 1.14,
      maxWidth: "130mm"
    }
  }, "\u041F\u043E\u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E\u0434 \u0432\u0430\u0448 \u043E\u0431\u044A\u0435\u043A\u0442"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-print-body)",
      lineHeight: 1.5,
      maxWidth: "140mm"
    }
  }, "\u0415\u0441\u043B\u0438 \u043F\u043E \u0441\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0435\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u2014 \u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u0432 \u043E\u0442\u0434\u0435\u043B \u0440\u0430\u0441\u0447\u0451\u0442\u0430. \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043E \u043F\u043B\u043E\u0449\u0430\u0434\u0438 \u0438 \u0448\u0430\u0433\u0443 \u043F\u0435\u0440\u0435\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u043C \u0432 \u0442\u043E\u0442 \u0436\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8mm",
      marginTop: "4mm",
      fontSize: "var(--fs-print-body)",
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-print-caption)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: "2mm"
    }
  }, "\u041E\u0444\u0438\u0441 \u041D\u0417\u041C\u041E"), "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A, \u0443\u043B. \u0427\u0435\u043B\u044E\u0441\u043A\u0438\u043D\u0446\u0435\u0432 30/2, \u043E\u0444. 410", /*#__PURE__*/React.createElement("br", null), "+7 (496) 325-40-42", /*#__PURE__*/React.createElement("br", null), "nzmo_ru@mail.ru"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-print-caption)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: "2mm"
    }
  }, "\u0417\u0430\u0432\u043E\u0434 \u041D\u0417\u041C\u041E"), "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A, \u041A\u0440\u0430\u0441\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043F\u0435\u043A\u0442", /*#__PURE__*/React.createElement("br", null), "nzmo.ru")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(BrandPattern, {
    pattern: "rail",
    color: "var(--navy-800)",
    opacity: 0.14,
    style: {
      padding: "6mm",
      border: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6mm"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "mark",
    tone: "ochre",
    size: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "13pt",
      letterSpacing: "-0.015em",
      color: "var(--text-strong)"
    }
  }, "\u0412 \u0440\u0430\u0437\u043C\u0435\u0440, \u043A \u0441\u0440\u043E\u043A\u0443")))));
}
function KpDocument() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Cover, null), /*#__PURE__*/React.createElement(ObjectPage, null), /*#__PURE__*/React.createElement(SpecPage, null), /*#__PURE__*/React.createElement(DocsPage, null), /*#__PURE__*/React.createElement(ProcessPage, null), /*#__PURE__*/React.createElement(ContactPage, null));
}
window.KpDocument = KpDocument;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kp_a4/KpPages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CasesScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  SectionLabel,
  CaseCard,
  Button,
  Tag,
  PhotoFrame,
  SpecCaption,
  CtaPanel
} = window.DesignSystem_793649;
const FILTERS = ["Все", "Кубообразная рейка", "Грильято", "Hook-On и Clip-In"];
function CasesScreen({
  go
}) {
  const [filter, setFilter] = React.useState("Все");
  const all = [...window.CASES, ...window.CASES.map(c => ({
    ...c,
    title: c.title,
    city: c.city
  }))].slice(0, 6);
  const list = filter === "Все" ? all : all.filter(c => c.family === filter || filter.indexOf(c.family) === 0);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-hair)",
      padding: "var(--sp-16) 0 var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "01",
    style: {
      marginBottom: "var(--sp-5)"
    }
  }, "\u041E\u0431\u044A\u0435\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--fs-display-2)",
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tr-display)",
      maxWidth: 720,
      marginBottom: "var(--sp-4)"
    }
  }, "\u0421\u0432\u043E\u044E \u0440\u0430\u0431\u043E\u0442\u0443 \u0443\u0437\u043D\u0430\u0451\u0448\u044C \u0441\u0440\u0430\u0437\u0443"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 620,
      fontSize: "var(--fs-lead)",
      color: "var(--text-body)",
      marginBottom: "var(--sp-8)"
    }
  }, "\u041F\u043E\u0434\u043D\u044F\u043B \u0433\u043B\u0430\u0437\u0430 \u0432 \u0430\u044D\u0440\u043E\u043F\u043E\u0440\u0442\u0443 \u2014 \u043D\u0430\u0448 \u043F\u043E\u0442\u043E\u043B\u043E\u043A. \u041A\u0430\u0436\u0434\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442 \u0437\u0434\u0435\u0441\u044C \u0441\u043E \u0441\u043F\u0435\u043A\u043E\u043C: \u0433\u043E\u0440\u043E\u0434, \u043E\u0431\u044A\u0435\u043A\u0442, \u0441\u0435\u0447\u0435\u043D\u0438\u0435 \xD7 \u0448\u0430\u0433 \xD7 RAL, \u0441\u0432\u0435\u0442."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)",
      flexWrap: "wrap"
    }
  }, FILTERS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFilter(f),
    style: {
      padding: "9px 14px",
      cursor: "pointer",
      fontFamily: "var(--font-text)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-medium)",
      borderRadius: "var(--radius-control)",
      border: "1px solid " + (f === filter ? "var(--navy-800)" : "var(--border-strong)"),
      background: f === filter ? "var(--navy-800)" : "transparent",
      color: f === filter ? "var(--white)" : "var(--text-body)",
      transition: "var(--transition-control)"
    }
  }, f))))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(CaseCard, _extends({
    layout: "horizontal"
  }, window.CASES[2], {
    style: {
      marginBottom: "var(--gap-grid)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "var(--gap-grid)"
    }
  }, list.map((c, i) => /*#__PURE__*/React.createElement(CaseCard, _extends({
    key: i
  }, c)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-navy)",
      padding: "var(--sp-20) 0"
    },
    "data-on-deep": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
      gap: "var(--sp-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "02",
    tone: "onDeep",
    style: {
      marginBottom: "var(--sp-6)"
    }
  }, "\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044F"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "var(--white)",
      fontSize: "var(--fs-display-3)",
      letterSpacing: "var(--tr-display)",
      lineHeight: "var(--lh-display)",
      marginBottom: "var(--sp-5)"
    }
  }, "\u041E\u0442 \u0412\u043B\u0430\u0434\u0438\u0432\u043E\u0441\u0442\u043E\u043A\u0430 \u0434\u043E \u0418\u0436\u0435\u0432\u0441\u043A\u0430"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-on-deep-muted)",
      fontSize: "var(--fs-body)",
      marginBottom: "var(--sp-6)"
    }
  }, "\u0417\u0430\u0432\u043E\u0434 \u0432 \u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A\u0435. \u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0442 \u0443\u043F\u0430\u043A\u043E\u0432\u044B\u0432\u0430\u0435\u043C \u043F\u043E\u0434 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u0435 \u043F\u043B\u0435\u0447\u043E \u2014 \u0434\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u0434\u043E\u0445\u043E\u0434\u0438\u0442 \u0446\u0435\u043B\u044B\u043C."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)",
      flexWrap: "wrap"
    }
  }, ["Новосибирск", "Владивосток", "Ижевск", "Красноярск", "Тюмень"].map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    tone: "onDeep"
  }, c)))), /*#__PURE__*/React.createElement(PhotoFrame, {
    src: window.PHOTOS.lobbyAlt,
    ratio: "16 / 9",
    alt: "\u0421\u043C\u043E\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043F\u043E\u0442\u043E\u043B\u043E\u043A \u0432 \u0445\u043E\u043B\u043B\u0435",
    overlay: /*#__PURE__*/React.createElement(SpecCaption, {
      tone: "onPhoto",
      city: "\u0412\u043B\u0430\u0434\u0438\u0432\u043E\u0441\u0442\u043E\u043A",
      object: "\u0422\u0435\u0440\u043C\u0438\u043D\u0430\u043B, \u0437\u043E\u043D\u0430 \u0432\u044B\u0434\u0430\u0447\u0438",
      section: "40\xD740",
      pitch: "\u0448\u0430\u0433 80",
      ral: "RAL 9005",
      light: "\u0442\u0440\u0435\u043A\u043E\u0432\u044B\u0439"
    })
  }))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(CtaPanel, {
    body: "\u041F\u043E\u0445\u043E\u0436\u0438\u0439 \u043E\u0431\u044A\u0435\u043A\u0442? \u041F\u0440\u0438\u0448\u043B\u0438\u0442\u0435 \u043F\u043B\u0430\u043D \u2014 \u043F\u043E\u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442 \u0438 \u043F\u043E\u0434\u0440\u0435\u0437\u043A\u0443.",
    primaryHref: "#request",
    contact: "+7 (496) 325-40-42"
  }))));
}
window.CasesScreen = CasesScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CasesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Hero,
  SectionLabel,
  ProductCard,
  ProofCard,
  CaseCard,
  CtaPanel,
  Button,
  BrandPattern,
  SpecCaption
} = window.DesignSystem_793649;
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    layout: "full",
    eyebrow: "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A\u0438\u0439 \u0437\u0430\u0432\u043E\u0434 \u043C\u0435\u0442\u0430\u043B\u043B\u043E\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438",
    image: window.PHOTOS.lobby,
    title: "\u041D\u0430\u0448\u0443 \u0440\u0430\u0431\u043E\u0442\u0443 \u0432\u0438\u0434\u043D\u043E \u043F\u043E \u0432\u0441\u0435\u0439 \u0420\u043E\u0441\u0441\u0438\u0438",
    body: "\u041F\u0440\u0438\u0434\u0443\u043C\u044B\u0432\u0430\u0435\u0442 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u043E\u0440. \u0421\u0442\u0440\u043E\u0438\u0442 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C. \u0410 \u043C\u044B \u2014 \u0437\u0430\u0432\u043E\u0434 \u0432 \u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A\u0435: \u0434\u0435\u043B\u0430\u0435\u043C \u0442\u043E, \u0438\u0437 \u0447\u0435\u0433\u043E \u0432\u0441\u0451 \u044D\u0442\u043E \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F.",
    secondaryLabel: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0431\u044A\u0435\u043A\u0442\u044B",
    secondaryHref: "#cases",
    spec: {
      city: "Новосибирск",
      object: "БЦ на Красном проспекте",
      section: "40×40",
      pitch: "шаг 80",
      ral: "RAL 9005",
      light: "трековый"
    }
  }), /*#__PURE__*/React.createElement("section", {
    className: "sec",
    style: {
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "01",
    style: {
      marginBottom: "var(--sp-6)"
    }
  }, "\u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u043C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--sp-10)",
      marginBottom: "var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-display-3)",
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tr-display)",
      maxWidth: 620
    }
  }, "\u041F\u043E\u0442\u043E\u043B\u043A\u0438, \u0441\u0432\u0435\u0442, \u0444\u0430\u0441\u0430\u0434\u044B, \u0441\u043A\u0443\u043B\u044C\u043F\u0442\u0443\u0440\u044B, \u043C\u0435\u0431\u0435\u043B\u044C"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 420,
      color: "var(--text-muted)",
      fontSize: "var(--fs-body-sm)"
    }
  }, "\u0412 \u0440\u0430\u0437\u043C\u0435\u0440, \u043A \u0441\u0440\u043E\u043A\u0443, \u0431\u0435\u0437 \u0441\u043A\u0430\u0437\u043E\u043A: \u044D\u0442\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u043C \u0441\u0430\u043C\u0438, \u044D\u0442\u043E \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0443\u0435\u043C.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "var(--gap-grid)"
    }
  }, window.PRODUCTS.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.name
  }, p, {
    href: "#ceilings",
    onClick: e => {
      e.preventDefault();
      go("ceilings");
    }
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-deep)",
      padding: "var(--sp-24) 0"
    },
    "data-on-deep": "true"
  }, /*#__PURE__*/React.createElement(BrandPattern, {
    pattern: "zigzag",
    opacity: 0.15,
    fade: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "02",
    tone: "onDeep",
    style: {
      marginBottom: "var(--sp-6)"
    }
  }, "\u0420\u0430\u0431\u043E\u0442\u0430 \u043D\u0430 \u0432\u0438\u0434\u0443 \u043E\u0431\u044F\u0437\u044B\u0432\u0430\u0435\u0442"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "var(--white)",
      fontSize: "var(--fs-display-3)",
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tr-display)",
      maxWidth: 640,
      marginBottom: "var(--sp-10)"
    }
  }, "\u0414\u0435\u0440\u0436\u0438\u043C \u043F\u043B\u0430\u043D\u043A\u0443"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "var(--gap-grid)"
    }
  }, /*#__PURE__*/React.createElement(ProofCard, {
    tone: "deep",
    value: "40\xD740",
    unit: "\u043C\u043C",
    title: "\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u043E\u0435 \u0441\u0435\u0447\u0435\u043D\u0438\u0435",
    body: "\u0414\u0435\u0440\u0436\u0438\u043C \u043D\u0430 \u0441\u043A\u043B\u0430\u0434\u0435, \u0440\u0435\u0436\u0435\u043C \u0432 \u0440\u0430\u0437\u043C\u0435\u0440 \u043F\u043E\u0434 \u043F\u0440\u043E\u0451\u043C.",
    source: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 2025, \u043B\u0438\u0441\u0442 4"
  }), /*#__PURE__*/React.createElement(ProofCard, {
    tone: "deep",
    title: "\u041A\u0440\u0430\u0441\u0438\u043C \u043F\u043E RAL \u0438\u0437 \u043A\u0430\u0440\u0442\u044B",
    body: "\u041F\u043E\u0440\u043E\u0448\u043A\u043E\u0432\u0430\u044F \u043E\u043A\u0440\u0430\u0441\u043A\u0430 \u043D\u0430 \u0441\u0432\u043E\u0435\u0439 \u043B\u0438\u043D\u0438\u0438. \u0426\u0432\u0435\u0442 \u0441\u043E\u0433\u043B\u0430\u0441\u0443\u0435\u043C \u043E\u0431\u0440\u0430\u0437\u0446\u043E\u043C \u0434\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
    source: "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043A\u0430\u0440\u0442\u0430 \u043E\u043A\u0440\u0430\u0441\u043A\u0438",
    accent: true
  }), /*#__PURE__*/React.createElement(ProofCard, {
    tone: "deep",
    title: "\u041E\u0442\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u043F\u043E \u0432\u0441\u0435\u0439 \u0420\u043E\u0441\u0441\u0438\u0438",
    body: "\u041E\u0431\u044A\u0435\u043A\u0442\u044B \u043E\u0442 \u0412\u043B\u0430\u0434\u0438\u0432\u043E\u0441\u0442\u043E\u043A\u0430 \u0434\u043E \u0418\u0436\u0435\u0432\u0441\u043A\u0430. \u0423\u043F\u0430\u043A\u043E\u0432\u043A\u0430 \u043F\u043E\u0434 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u043E\u0435 \u043F\u043B\u0435\u0447\u043E.",
    source: "\u0420\u0435\u0435\u0441\u0442\u0440 \u043E\u0442\u0433\u0440\u0443\u0437\u043E\u043A"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--sp-8)",
      marginBottom: "var(--sp-8)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "03",
    style: {
      marginBottom: "var(--sp-5)"
    }
  }, "\u041E\u0431\u044A\u0435\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-display-3)",
      letterSpacing: "var(--tr-display)"
    }
  }, "\u0421\u0432\u043E\u044E \u0440\u0430\u0431\u043E\u0442\u0443 \u0443\u0437\u043D\u0430\u0451\u0448\u044C \u0441\u0440\u0430\u0437\u0443")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "arrow-right",
    onClick: () => go("cases")
  }, "\u0412\u0441\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u044B")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,minmax(0,1fr))",
      gap: "var(--gap-grid)"
    }
  }, window.CASES.map(c => /*#__PURE__*/React.createElement(CaseCard, _extends({
    key: c.title
  }, c, {
    href: "#cases",
    onClick: e => {
      e.preventDefault();
      go("cases");
    }
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBottom: "var(--sp-24)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(CtaPanel, {
    body: "\u041F\u0440\u0438\u0448\u043B\u0438\u0442\u0435 \u043F\u043B\u0430\u043D \u043F\u043E\u0442\u043E\u043B\u043A\u0430 \u0438\u043B\u0438 \u043F\u043B\u043E\u0449\u0430\u0434\u044C \u2014 \u0432\u0435\u0440\u043D\u0451\u043C\u0441\u044F \u0441\u043E \u0441\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0435\u0439 \u0438 \u0446\u0435\u043D\u043E\u0439 \u0437\u0430 \u043C\xB2.",
    primaryHref: "#request",
    secondaryLabel: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433",
    contact: "+7 (496) 325-40-42 \xB7 nzmo_ru@mail.ru"
  }))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductScreen.jsx
try { (() => {
const {
  Hero,
  SectionLabel,
  SpecTable,
  StatusBadge,
  Tag,
  DocumentBlock,
  AfterRequest,
  CtaPanel,
  PhotoFrame,
  SpecCaption,
  ProofCard
} = window.DesignSystem_793649;
function ProductScreen({
  go
}) {
  const [variant, setVariant] = React.useState("40×40");
  const variants = [{
    key: "40×40",
    pitch: "шаг 60–150",
    rows: [["Рейка кубообразная 40×40×4000", "8,2", "м"], ["Траверса несущая 3000", "0,7", "шт"], ["Подвес регулируемый", "0,9", "шт"], ["Пружинный зажим", "1,8", "шт"]]
  }, {
    key: "50×50",
    pitch: "шаг 80–200",
    rows: [["Рейка кубообразная 50×50×4000", "6,7", "м"], ["Траверса несущая 3000", "0,7", "шт"], ["Подвес регулируемый", "0,9", "шт"], ["Пружинный зажим", "1,5", "шт"]]
  }];
  const active = variants.find(v => v.key === variant) || variants[0];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    layout: "split",
    eyebrow: "\u041F\u043E\u0442\u043E\u043B\u043E\u0447\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B",
    image: window.PHOTOS.lobbyAlt,
    title: "\u0426\u0438\u0444\u0440\u044B \u043D\u0435 \u0441 \u043F\u043E\u0442\u043E\u043B\u043A\u0430. \u041F\u043E\u0442\u043E\u043B\u043A\u0438 \u2014 \u0441 \u0437\u0430\u0432\u043E\u0434\u0430",
    body: "\u041A\u0443\u0431\u043E\u043E\u0431\u0440\u0430\u0437\u043D\u0430\u044F \u0440\u0435\u0439\u043A\u0430 40\xD740: \u0430\u043B\u044E\u043C\u0438\u043D\u0438\u0435\u0432\u044B\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C, \u043E\u043A\u0440\u0430\u0441\u043A\u0430 \u043F\u043E RAL, \u0448\u0430\u0433 \u043F\u043E\u0434 \u043F\u0440\u043E\u0435\u043A\u0442. \u0421\u0447\u0438\u0442\u0430\u0435\u043C \u0440\u0430\u0441\u0445\u043E\u0434 \u043D\u0430 1 \u043C\xB2 \u0438 \u043F\u043E\u0434\u0440\u0435\u0437\u043A\u0443 \u043F\u043E \u043F\u043B\u0430\u043D\u0443 \u043F\u043E\u0442\u043E\u043B\u043A\u0430.",
    secondaryLabel: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0443\u0437\u043B\u044B \u043C\u043E\u043D\u0442\u0430\u0436\u0430",
    spec: {
      city: "Новосибирск",
      object: "БЦ, входная группа",
      section: "40×40",
      pitch: "шаг 80",
      ral: "RAL 9005",
      light: "трековый"
    }
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border-hair)",
      padding: "var(--sp-16) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: "produce",
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "outline"
  }, "\u0430\u043B\u044E\u043C\u0438\u043D\u0438\u0439"), /*#__PURE__*/React.createElement(Tag, {
    tone: "outline"
  }, "\u043E\u043A\u0440\u0430\u0441\u043A\u0430 \u043F\u043E RAL"), /*#__PURE__*/React.createElement(Tag, {
    tone: "outline"
  }, "\u0434\u043B\u0438\u043D\u0430 \u0434\u043E 4 000 \u043C\u043C"), /*#__PURE__*/React.createElement(Tag, {
    tone: "petrol"
  }, active.pitch)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 0,
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-control)",
      overflow: "hidden"
    }
  }, variants.map(v => /*#__PURE__*/React.createElement("button", {
    key: v.key,
    onClick: () => setVariant(v.key),
    style: {
      padding: "10px 18px",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-body-sm)",
      background: v.key === variant ? "var(--petrol-800)" : "transparent",
      color: v.key === variant ? "var(--white)" : "var(--text-body)",
      transition: "var(--transition-control)"
    }
  }, v.key))))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.15fr) minmax(0,1fr)",
      gap: "var(--sp-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "01",
    style: {
      marginBottom: "var(--sp-6)"
    }
  }, "\u0420\u0430\u0441\u0445\u043E\u0434 \u0438 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442"), /*#__PURE__*/React.createElement(SpecTable, {
    caption: "Расход на 1 м² — рейка " + active.key + ", " + active.pitch,
    columns: [{
      label: "Позиция"
    }, {
      label: "Расход",
      unit: "на 1 м²"
    }, {
      label: "Ед."
    }],
    rows: [...active.rows, {
      cells: ["Итого комплект", "—", "1 м²"],
      highlight: true
    }],
    footnote: "\u0420\u0430\u0441\u0445\u043E\u0434 \u0443\u043A\u0430\u0437\u0430\u043D \u0431\u0435\u0437 \u0443\u0447\u0451\u0442\u0430 \u043F\u043E\u0434\u0440\u0435\u0437\u043A\u0438. \u0422\u043E\u0447\u043D\u044B\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442 \u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E \u043F\u043B\u0430\u043D\u0443 \u043F\u043E\u0442\u043E\u043B\u043A\u0430."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement(DocumentBlock, {
    title: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u043F\u043E \u0441\u0438\u0441\u0442\u0435\u043C\u0435",
    documents: [{
      name: "Кубообразная рейка " + active.key + " — узлы монтажа",
      kind: "dwg",
      size: "1,8 МБ",
      note: "Примыкания, компенсация, ревизия"
    }, {
      name: "Спецификация комплекта на 100 м²",
      kind: "xls",
      size: "96 КБ"
    }, {
      name: "Протокол пожарных испытаний",
      kind: "pdf",
      size: "2,4 МБ"
    }, {
      name: "Карта RAL — доступные цвета окраски",
      kind: "pdf",
      size: "640 КБ"
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    src: window.PHOTOS.corridor,
    ratio: "3 / 4",
    alt: "\u0420\u0435\u0439\u043A\u0430 \u043F\u043E \u0440\u0430\u0434\u0438\u0443\u0441\u0443 \u0432 \u043B\u0438\u0444\u0442\u043E\u0432\u043E\u043C \u0445\u043E\u043B\u043B\u0435",
    caption: /*#__PURE__*/React.createElement(SpecCaption, {
      city: "\u0418\u0436\u0435\u0432\u0441\u043A",
      object: "\u0422\u0426, \u043B\u0438\u0444\u0442\u043E\u0432\u044B\u0435 \u0445\u043E\u043B\u043B\u044B",
      section: "50\xD750",
      pitch: "\u0448\u0430\u0433 100",
      ral: "RAL 7016",
      light: "\u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043B\u0438\u043D\u0435\u0439\u043D\u044B\u0439"
    })
  }), /*#__PURE__*/React.createElement(ProofCard, {
    title: "\u041D\u0430\u043A\u043B\u043E\u043D\u043D\u044B\u0435 \u0438 \u043A\u0440\u0438\u0432\u043E\u043B\u0438\u043D\u0435\u0439\u043D\u044B\u0435 \u0443\u0447\u0430\u0441\u0442\u043A\u0438",
    body: "\u0413\u043D\u0451\u043C \u0442\u0440\u0430\u0432\u0435\u0440\u0441\u0443 \u043F\u043E \u0440\u0430\u0434\u0438\u0443\u0441\u0443 \u0438 \u0440\u0435\u0436\u0435\u043C \u0440\u0435\u0439\u043A\u0443 \u043F\u043E\u0434 \u0443\u0433\u043E\u043B \u2014 \u043F\u043B\u043E\u0441\u043A\u043E\u0441\u0442\u044C \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0431\u0435\u0437 \u0434\u043E\u0431\u043E\u0440\u043E\u0432 \u043D\u0430 \u043C\u0435\u0441\u0442\u0435.",
    source: "\u0423\u0437\u043B\u044B \u043C\u043E\u043D\u0442\u0430\u0436\u0430, \u043B\u0438\u0441\u0442 7",
    accent: true
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      padding: "var(--sp-20) 0",
      borderTop: "1px solid var(--border-hair)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "02",
    style: {
      marginBottom: "var(--sp-8)"
    }
  }, "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0440\u0430\u0431\u043E\u0442\u044B"), /*#__PURE__*/React.createElement(AfterRequest, {
    title: "\u0427\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438",
    steps: [{
      title: "Смотрим план потолка",
      body: "Нужен план с отметками и узлы примыканий. Если плана нет — работаем по обмеру."
    }, {
      title: "Считаем комплект",
      body: "Сечение, шаг, подвесы, расход на 1 м², упаковка под транспортное плечо."
    }, {
      title: "Присылаем КП со спецификацией",
      body: "Позиции с артикулами, статусом и ценой за м² и за комплект."
    }, {
      title: "Согласуем цвет и запускаем",
      body: "Образец окраски по RAL, дальше производство и отгрузка."
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(CtaPanel, {
    tone: "navy",
    title: "\u041F\u043E\u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E\u0434 \u0432\u0430\u0448 \u043E\u0431\u044A\u0435\u043A\u0442",
    body: "\u041F\u043B\u043E\u0449\u0430\u0434\u044C, \u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u0438 \u0448\u0430\u0433 \u2014 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u043C\u0438.",
    primaryHref: "#request",
    contact: "+7 (496) 325-40-42 \xB7 nzmo_ru@mail.ru"
  }))));
}
window.ProductScreen = ProductScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/RequestScreen.jsx
try { (() => {
const {
  SectionLabel,
  Field,
  Input,
  Select,
  Checkbox,
  Button,
  AfterRequest,
  DocumentBlock,
  BrandPattern,
  PromiseStamp
} = window.DesignSystem_793649;
function RequestScreen() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    city: "",
    system: "",
    area: "",
    plan: false,
    mount: true,
    name: "",
    contact: ""
  });
  const set = k => e => setForm({
    ...form,
    [k]: e.target.value
  });
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-hair)",
      padding: "var(--sp-16) 0 var(--sp-12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "01",
    style: {
      marginBottom: "var(--sp-5)"
    }
  }, "\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u0440\u0430\u0441\u0447\u0451\u0442"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--fs-display-2)",
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tr-display)",
      maxWidth: 700
    }
  }, "\u041F\u043E\u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E\u0434 \u0432\u0430\u0448 \u043E\u0431\u044A\u0435\u043A\u0442"))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
      gap: "var(--sp-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hair)",
      borderTop: "3px solid var(--ochre-500)",
      padding: "var(--pad-card-lg)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-h2)"
    }
  }, "\u0417\u0430\u044F\u0432\u043A\u0430 \u0443 \u043D\u0430\u0441"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-body)"
    }
  }, "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u043C \u043F\u043B\u0430\u043D \u0438 \u0432\u0435\u0440\u043D\u0451\u043C\u0441\u044F \u0441\u043E \u0441\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0435\u0439. \u0415\u0441\u043B\u0438 \u0447\u0435\u0433\u043E-\u0442\u043E \u043D\u0435 \u0445\u0432\u0430\u0442\u0438\u0442 \u2014 \u043D\u0430\u043F\u0438\u0448\u0435\u043C \u0438 \u0441\u043F\u0440\u043E\u0441\u0438\u043C, \u0430 \u043D\u0435 \u0431\u0443\u0434\u0435\u043C \u0434\u043E\u0433\u0430\u0434\u044B\u0432\u0430\u0442\u044C\u0441\u044F. ", /*#__PURE__*/React.createElement(PromiseStamp, null)), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setSent(false)
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0451 \u043E\u0434\u043D\u0443")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--sp-5) var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u0413\u043E\u0440\u043E\u0434 \u043E\u0431\u044A\u0435\u043A\u0442\u0430",
    required: true,
    htmlFor: "city"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "city",
    placeholder: "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A",
    value: form.city,
    onChange: set("city")
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u0443",
    value: form.system,
    onChange: set("system"),
    options: ["Кубообразная рейка", "Грильято", "Hook-On", "Clip-In", "Линейный свет", "МАФ", "Фасады", "Мебель"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u041F\u043B\u043E\u0449\u0430\u0434\u044C, \u043C\xB2",
    hint: "\u041C\u043E\u0436\u043D\u043E \u043E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u043E"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "1 240",
    value: form.area,
    onChange: set("area")
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u0421\u0435\u0447\u0435\u043D\u0438\u0435 \u0438 \u0448\u0430\u0433",
    hint: "\u0415\u0441\u043B\u0438 \u0443\u0436\u0435 \u0432\u044B\u0431\u0440\u0430\u043B\u0438"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "40\xD740, \u0448\u0430\u0433 80"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u041A\u0442\u043E \u0432\u044B",
    htmlFor: "name",
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    id: "name",
    placeholder: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u0438 \u0438\u043C\u044F",
    value: form.name,
    onChange: set("name")
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 \u043F\u043E\u0447\u0442\u0430",
    required: true,
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "+7 \xB7\xB7\xB7 / \u043F\u043E\u0447\u0442\u0430",
    value: form.contact,
    onChange: set("contact")
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u0417\u0430\u0434\u0430\u0447\u0430",
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    multiline: true,
    rows: 3,
    placeholder: "\u0427\u0442\u043E \u0437\u0430 \u043E\u0431\u044A\u0435\u043A\u0442, \u043A \u043A\u0430\u043A\u043E\u043C\u0443 \u0441\u0440\u043E\u043A\u0443 \u043D\u0443\u0436\u0435\u043D \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      display: "flex",
      gap: "var(--sp-8)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u0415\u0441\u0442\u044C \u043F\u043B\u0430\u043D \u043F\u043E\u0442\u043E\u043B\u043A\u0430",
    checked: form.plan,
    onChange: () => setForm({
      ...form,
      plan: !form.plan
    })
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u041D\u0443\u0436\u0435\u043D \u043C\u043E\u043D\u0442\u0430\u0436",
    checked: form.mount,
    onChange: () => setForm({
      ...form,
      mount: !form.mount
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-5)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg",
    icon: "arrow-right"
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, "\u041F\u043B\u0430\u043D \u043F\u043E\u0442\u043E\u043B\u043A\u0430 \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u0441\u043B\u0430\u0442\u044C \u043F\u0438\u0441\u044C\u043C\u043E\u043C \u043D\u0430 nzmo_ru@mail.ru")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--sp-10)"
    }
  }, /*#__PURE__*/React.createElement(AfterRequest, {
    title: "\u0427\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438",
    steps: [{
      title: "Смотрим план потолка",
      body: "Нужен план с отметками и узлы примыканий."
    }, {
      title: "Считаем комплект",
      body: "Сечение, шаг, подвесы, расход на 1 м²."
    }, {
      title: "Присылаем КП",
      body: "Позиции с артикулами, статусом и ценой за м²."
    }]
  }), /*#__PURE__*/React.createElement(DocumentBlock, {
    title: "\u0417\u0430\u0431\u0440\u0430\u0442\u044C \u0434\u043E \u0437\u0432\u043E\u043D\u043A\u0430",
    documents: [{
      name: "Каталог потолочных систем",
      kind: "pdf",
      size: "8,1 МБ"
    }, {
      name: "Шаблон исходных данных для расчёта",
      kind: "xls",
      size: "48 КБ",
      note: "Площади, отметки, RAL"
    }]
  }), /*#__PURE__*/React.createElement(BrandPattern, {
    pattern: "rail",
    color: "var(--navy-800)",
    opacity: 0.14,
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hair)",
      padding: "var(--pad-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-tech)",
      fontSize: "var(--fs-caption)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: "var(--sp-2)"
    }
  }, "\u0417\u0430\u0432\u043E\u0434"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-body)",
      lineHeight: 1.6
    }
  }, "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A, \u0443\u043B. \u0427\u0435\u043B\u044E\u0441\u043A\u0438\u043D\u0446\u0435\u0432 30/2, \u043E\u0444. 410", /*#__PURE__*/React.createElement("br", null), "+7 (496) 325-40-42 \xB7 nzmo_ru@mail.ru"))))));
}
window.RequestScreen = RequestScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/RequestScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/siteData.jsx
try { (() => {
const NZMO_LINKS = [{
  id: "ceilings",
  label: "Потолочные системы"
}, {
  id: "light",
  label: "Свет"
}, {
  id: "maf",
  label: "МАФ и фасады"
}, {
  id: "cases",
  label: "Объекты"
}, {
  id: "about",
  label: "Завод"
}];
const NZMO_FOOTER = [{
  title: "Потолки",
  items: [{
    label: "Кубообразная рейка"
  }, {
    label: "Hook-On"
  }, {
    label: "Clip-In"
  }, {
    label: "Грильято"
  }]
}, {
  title: "Ещё производим",
  items: [{
    label: "Линейный свет"
  }, {
    label: "МАФ"
  }, {
    label: "Фасады"
  }, {
    label: "Мебель"
  }]
}, {
  title: "Компания",
  items: [{
    label: "Завод"
  }, {
    label: "Объекты"
  }, {
    label: "Документы"
  }, {
    label: "Дилерам"
  }]
}];
const PHOTOS = {
  lobby: "../../assets/photos/grillato-black-lobby-01.png",
  lobbyAlt: "../../assets/photos/grillato-black-lobby-02.png",
  corridor: "../../assets/photos/rail-facade-corridor.png",
  render: "../../assets/photos/rail-ceiling-linear-light.png"
};
const CASES = [{
  image: PHOTOS.lobby,
  family: "Грильято",
  area: "640 м²",
  title: "Чёрный грильято в холле высотой 7 м",
  city: "Новосибирск",
  object: "БЦ на Красном проспекте",
  section: "40×40",
  pitch: "шаг 80",
  ral: "RAL 9005",
  light: "трековый"
}, {
  image: PHOTOS.corridor,
  family: "Кубообразная рейка",
  area: "310 м²",
  title: "Рейка по радиусу в лифтовом холле",
  city: "Ижевск",
  object: "ТЦ, лифтовые холлы",
  section: "50×50",
  pitch: "шаг 100",
  ral: "RAL 7016",
  light: "встроенный линейный"
}, {
  image: PHOTOS.lobbyAlt,
  family: "Грильято",
  area: "1 240 м²",
  title: "Грильято и трек в одной плоскости",
  city: "Владивосток",
  object: "Терминал, зона выдачи",
  section: "40×40",
  pitch: "шаг 80",
  ral: "RAL 9005",
  light: "трековый"
}];
const PRODUCTS = [{
  family: "Потолочные системы",
  name: "Кубообразная рейка 40×40",
  status: "produce",
  image: PHOTOS.lobbyAlt,
  specs: [{
    label: "Сечение",
    value: "40×40 мм"
  }, {
    label: "Шаг",
    value: "60–150 мм"
  }, {
    label: "Цвет",
    value: "по RAL"
  }],
  note: "Режем в размер под проём, включая наклонные и криволинейные участки."
}, {
  family: "Потолочные системы",
  name: "Грильято",
  status: "produce",
  image: PHOTOS.lobby,
  specs: [{
    label: "Ячейка",
    value: "40×40 · 75×75 · 100×100"
  }, {
    label: "Высота",
    value: "30–50 мм"
  }],
  note: "Открытая структура: инженерия остаётся доступной."
}, {
  family: "Потолочные системы",
  name: "Hook-On и Clip-In",
  status: "produce",
  image: PHOTOS.corridor,
  specs: [{
    label: "Кассета",
    value: "300–1 200 мм"
  }, {
    label: "Clip-In",
    value: "для чистых помещений"
  }],
  note: "Clip-In собирается в закрытую плоскость с уплотнением."
}, {
  family: "Свет",
  name: "Линейный светильник 35 Вт",
  status: "supply",
  image: PHOTOS.render,
  imageKind: "render",
  specs: [{
    label: "Длина",
    value: "1 200 мм"
  }, {
    label: "Встройка",
    value: "в рейку 40×40"
  }],
  note: "Встраиваем в плоскость потолка одной линией с рейкой."
}];
Object.assign(window, {
  NZMO_LINKS,
  NZMO_FOOTER,
  PHOTOS,
  CASES,
  PRODUCTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/siteData.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BrandPattern = __ds_scope.BrandPattern;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.PromiseStamp = __ds_scope.PromiseStamp;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.SpecTable = __ds_scope.SpecTable;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.CtaPanel = __ds_scope.CtaPanel;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.PhotoFrame = __ds_scope.PhotoFrame;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.PageA4 = __ds_scope.PageA4;

__ds_ns.AfterRequest = __ds_scope.AfterRequest;

__ds_ns.CaseCard = __ds_scope.CaseCard;

__ds_ns.DocumentBlock = __ds_scope.DocumentBlock;

__ds_ns.ProofCard = __ds_scope.ProofCard;

__ds_ns.SpecCaption = __ds_scope.SpecCaption;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

})();
