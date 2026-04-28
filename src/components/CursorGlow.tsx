import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
        background:
          "radial-gradient(circle, oklch(0.78 0.2 210 / 0.12), transparent 60%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
