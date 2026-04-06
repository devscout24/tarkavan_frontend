import { useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');

  .nf-body {
    font-family: 'Nunito', sans-serif;
    background: #f0f4ff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  @keyframes nf-float       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
  @keyframes nf-eyeMove     { 0%,100%{transform:translateX(0)} 30%{transform:translateX(3px)} 70%{transform:translateX(-3px)} }
  @keyframes nf-searchSwing { 0%,100%{transform:rotate(-20deg);transform-origin:80% 80%} 50%{transform:rotate(10deg);transform-origin:80% 80%} }
  @keyframes nf-fadeUp      { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes nf-dotBounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes nf-starPop     { 0%{opacity:0;transform:scale(0) rotate(0deg)} 50%{opacity:1;transform:scale(1.2) rotate(180deg)} 100%{opacity:0.7;transform:scale(1) rotate(360deg)} }

  .nf-float        { animation: nf-float 3.5s ease-in-out infinite; }
  .nf-search-swing { animation: nf-searchSwing 2.5s ease-in-out infinite; }
  .nf-eye-l        { animation: nf-eyeMove 3s ease-in-out infinite; }
  .nf-eye-r        { animation: nf-eyeMove 3s ease-in-out infinite 0.2s; }
  .nf-star1        { animation: nf-starPop 3s ease-in-out infinite; }
  .nf-star2        { animation: nf-starPop 3s ease-in-out infinite 1s; }
  .nf-star3        { animation: nf-starPop 3s ease-in-out infinite 2s; }
  .nf-star1d       { animation: nf-starPop 3s ease-in-out infinite 1.5s; }
  .nf-star2d       { animation: nf-starPop 3s ease-in-out infinite 0.5s; }
  .nf-dot1         { animation: nf-dotBounce 1.2s ease-in-out infinite; }
  .nf-dot2         { animation: nf-dotBounce 1.2s ease-in-out infinite 0.2s; }
  .nf-dot3         { animation: nf-dotBounce 1.2s ease-in-out infinite 0.4s; }
  .nf-page-in      { animation: nf-fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) both; }
  .nf-page-in-2    { animation: nf-fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) both 0.15s; opacity:0; }
  .nf-page-in-3    { animation: nf-fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) both 0.3s;  opacity:0; }
  .nf-page-in-4    { animation: nf-fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) both 0.45s; opacity:0; }

  .nf-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 100px;
    font-weight: 800; font-size: 15px; cursor: pointer;
    text-decoration: none; border: none;
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: 'Nunito', sans-serif;
  }
  .nf-btn:hover  { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.15); }
  .nf-btn:active { transform: scale(0.97); }
  .nf-btn-main   { background: #4f46e5; color: #fff; box-shadow: 0 6px 20px rgba(79,70,229,0.35); }
  .nf-btn-sec    { background: #fff; color: #4f46e5; box-shadow: 0 4px 14px rgba(0,0,0,0.08); border: 2px solid #e0e7ff !important; }
`;

export default function NotFoundPage() {
  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = styles;
    document.head.appendChild(tag);
    return () => { document.head.removeChild(tag); };
  }, []);

  return (
    <div className="nf-body">

      {/* Background blobs */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,#c7d2fe 0%,transparent 70%)", top: -100, right: -100, opacity: 0.5 }} />
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,#fde68a 0%,transparent 70%)", bottom: -80, left: -60, opacity: 0.4 }} />
        <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,#fbcfe8 0%,transparent 70%)", top: "40%", left: "5%", opacity: 0.5 }} />
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 560, textAlign: "center", padding: "32px 24px" }}>

        {/* SVG Illustration */}
        <div className="nf-float nf-page-in">
          <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 480, overflow: "visible" }}>

            <ellipse cx="240" cy="308" rx="90" ry="10" fill="#c7d2fe" opacity="0.5" />
            <line x1="80" y1="300" x2="400" y2="300" stroke="#c7d2fe" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" />

            {/* LEFT 4 */}
            <g transform="translate(58,50)">
              <rect x="0" y="0" width="78" height="92" rx="18" fill="#4f46e5" />
              <rect x="18" y="38" width="42" height="20" rx="8" fill="#f0f4ff" />
              <rect x="14" y="8" width="16" height="50" rx="8" fill="#f0f4ff" />
              <circle cx="39" cy="28" r="18" fill="#fef3c7" />
              <g className="nf-eye-l"><ellipse cx="32" cy="27" rx="4" ry="4.5" fill="#1e1b4b" /><circle cx="33.5" cy="25.5" r="1.5" fill="#fff" /></g>
              <g className="nf-eye-r"><ellipse cx="46" cy="27" rx="4" ry="4.5" fill="#1e1b4b" /><circle cx="47.5" cy="25.5" r="1.5" fill="#fff" /></g>
              <path d="M33 33 Q39 38 45 33" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />
              <circle cx="28" cy="33" r="5" fill="#fca5a5" opacity="0.5" />
              <circle cx="50" cy="33" r="5" fill="#fca5a5" opacity="0.5" />
              <rect x="15" y="88" width="16" height="30" rx="8" fill="#4f46e5" />
              <rect x="47" y="88" width="16" height="30" rx="8" fill="#4f46e5" />
              <ellipse cx="23" cy="120" rx="14" ry="8" fill="#1e1b4b" />
              <ellipse cx="55" cy="120" rx="14" ry="8" fill="#1e1b4b" />
              <rect x="-20" y="30" width="24" height="12" rx="6" fill="#4f46e5" transform="rotate(-30 -20 30)" />
              <rect x="74" y="24" width="24" height="12" rx="6" fill="#4f46e5" transform="rotate(30 74 24)" />
            </g>

            {/* MIDDLE 0 — magnifying glass */}
            <g className="nf-search-swing" transform="translate(190,40)">
              <rect x="70" y="90" width="14" height="50" rx="7" fill="#f59e0b" transform="rotate(35 70 90)" />
              <circle cx="50" cy="68" r="50" fill="none" stroke="#4f46e5" strokeWidth="14" />
              <circle cx="50" cy="68" r="43" fill="#dbeafe" />
              <circle cx="50" cy="64" r="28" fill="#fef3c7" />
              <g className="nf-eye-l"><ellipse cx="40" cy="60" rx="5" ry="5.5" fill="#1e1b4b" /><circle cx="41.5" cy="58" r="2" fill="#fff" /></g>
              <g className="nf-eye-r"><ellipse cx="60" cy="60" rx="5" ry="5.5" fill="#1e1b4b" /><circle cx="61.5" cy="58" r="2" fill="#fff" /></g>
              <path d="M40 72 Q50 67 60 72" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="70" cy="48" rx="5" ry="7" fill="#93c5fd" transform="rotate(15 70 48)" />
              <text x="46" y="50" fontSize="22" fontWeight="900" fill="#4f46e5" opacity="0.15">?</text>
              <circle cx="34" cy="68" r="6" fill="#fca5a5" opacity="0.45" />
              <circle cx="66" cy="68" r="6" fill="#fca5a5" opacity="0.45" />
            </g>

            {/* RIGHT 4 */}
            <g transform="translate(338,50)">
              <rect x="0" y="0" width="78" height="92" rx="18" fill="#7c3aed" />
              <rect x="18" y="38" width="42" height="20" rx="8" fill="#f0f4ff" />
              <rect x="14" y="8" width="16" height="50" rx="8" fill="#f0f4ff" />
              <circle cx="39" cy="28" r="18" fill="#fef3c7" />
              <path d="M29 27 Q33 23 37 27" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
              <g className="nf-eye-r"><ellipse cx="48" cy="27" rx="4" ry="4.5" fill="#1e1b4b" /><circle cx="49.5" cy="25.5" r="1.5" fill="#fff" /></g>
              <path d="M31 34 Q39 41 47 34" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="28" cy="33" r="5" fill="#fca5a5" opacity="0.5" />
              <circle cx="50" cy="33" r="5" fill="#fca5a5" opacity="0.5" />
              <rect x="15" y="88" width="16" height="30" rx="8" fill="#7c3aed" />
              <rect x="47" y="88" width="16" height="30" rx="8" fill="#7c3aed" />
              <ellipse cx="23" cy="120" rx="14" ry="8" fill="#1e1b4b" />
              <ellipse cx="55" cy="120" rx="14" ry="8" fill="#1e1b4b" />
              <rect x="-20" y="24" width="24" height="12" rx="6" fill="#7c3aed" transform="rotate(30 -20 24)" />
              <rect x="74" y="30" width="24" height="12" rx="6" fill="#7c3aed" transform="rotate(-30 74 30)" />
            </g>

            {/* Stars */}
            <g className="nf-star1"><text x="30"  y="80"  fontSize="18" fill="#fbbf24">✦</text></g>
            <g className="nf-star2"><text x="420" y="100" fontSize="14" fill="#a78bfa">✦</text></g>
            <g className="nf-star3"><text x="200" y="20"  fontSize="12" fill="#34d399">✦</text></g>
            <g className="nf-star1d"><text x="150" y="285" fontSize="10" fill="#f472b6">✦</text></g>
            <g className="nf-star2d"><text x="340" y="290" fontSize="10" fill="#60a5fa">✦</text></g>
          </svg>
        </div>

        {/* Badge */}
        <div className="nf-page-in-2">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#ede9fe", color: "#4f46e5", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: "0.05em" }}>
            <span>🔍</span> Whoops! Lost in space
          </div>
        </div>

        {/* Heading */}
        <h1 className="nf-page-in-3" style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 900, color: "#1e1b4b", lineHeight: 1.2, marginBottom: 12 }}>
          We couldn't find<br />that page!
        </h1>

        {/* Paragraph */}
        <p className="nf-page-in-4" style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, marginBottom: 32, maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
          The page you're looking for doesn't exist, was moved, or maybe it's just playing hide and seek.
        </p>

        {/* Bouncing dots */}
        <div className="nf-page-in-4" style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 28 }}>
          <div className="nf-dot1" style={{ width: 8, height: 8, borderRadius: "50%", background: "#4f46e5", opacity: 0.3 }} />
          <div className="nf-dot2" style={{ width: 8, height: 8, borderRadius: "50%", background: "#4f46e5", opacity: 0.5 }} />
          <div className="nf-dot3" style={{ width: 8, height: 8, borderRadius: "50%", background: "#4f46e5", opacity: 0.8 }} />
        </div>

        {/* Buttons */}
        <div className="nf-page-in-4" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <a href="/" className="nf-btn nf-btn-main">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12l9-9 9 9" /><path d="M5 10v10h5v-5h4v5h5V10" />
            </svg>
            Take me home
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="nf-btn nf-btn-sec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
            Go back
          </a>
        </div>

      </div>
    </div>
  );
}