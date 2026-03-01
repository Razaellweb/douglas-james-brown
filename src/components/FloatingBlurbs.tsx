// Subtle floating blurb quotes that drift in the page background
const blurbSnippets = [
  "Quirky, original, and most of all — fun.",
  "Brown's range is extraordinary.",
  "Tactile yet surreal, angelic and absurd.",
  "A writer working at the very top of his craft.",
  "Where there's light, there will always be shadow.",
  "Lyrical writing almost tactile in its intensity.",
  "Something genuinely unique in contemporary short fiction.",
];

const positions = [
  { top: "8%",  left: "3%",  rotation: "-4deg", delay: "0s",    duration: "18s" },
  { top: "20%", right: "2%", rotation: "3deg",  delay: "4s",    duration: "22s" },
  { top: "38%", left: "1%",  rotation: "-2deg", delay: "8s",    duration: "20s" },
  { top: "55%", right: "3%", rotation: "5deg",  delay: "2s",    duration: "24s" },
  { top: "70%", left: "4%",  rotation: "-3deg", delay: "12s",   duration: "19s" },
  { top: "82%", right: "2%", rotation: "2deg",  delay: "6s",    duration: "21s" },
  { top: "93%", left: "2%",  rotation: "-5deg", delay: "10s",   duration: "23s" },
];

const FloatingBlurbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {blurbSnippets.map((snippet, i) => {
        const pos = positions[i];
        return (
          <div
            key={i}
            className="absolute max-w-[200px] md:max-w-[240px]"
            style={{
              top: pos.top,
              left: (pos as { left?: string }).left,
              right: (pos as { right?: string }).right,
              transform: `rotate(${pos.rotation})`,
              animation: `float ${pos.duration} ease-in-out ${pos.delay} infinite alternate`,
              opacity: 0.055,
            }}
          >
            <p className="font-cormorant italic text-foreground leading-snug text-sm md:text-base text-center">
              "{snippet}"
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingBlurbs;
