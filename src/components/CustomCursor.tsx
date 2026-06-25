import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const curr = useRef({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only run on pointer-fine devices (desktop/mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovered(true);
      }
    };

    const onLeave = () => setHovered(false);

    // Smooth lerp loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      curr.current.x = lerp(curr.current.x, pos.current.x, 0.18);
      curr.current.y = lerp(curr.current.y, pos.current.y, 0.18);
      if (dot) {
        dot.style.transform = `translate(${curr.current.x - 3}px, ${curr.current.y - 3}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: "#ededed",
        opacity: hovered ? 0.5 : 0.7,
        transform: "translate(-100px, -100px)",
        transition: "opacity 200ms ease, width 200ms ease, height 200ms ease",
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    />
  );
}
