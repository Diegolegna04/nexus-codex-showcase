import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { usePhantomMode } from "./PhantomModeContext";

/**
 * Custom cursor + smooth ribbon trail.
 * Active ONLY when phantom mode is on, OR when on the /anteroom route.
 * On anteroom the cursor shifts to a calmer cyan-blue palette.
 */
export default function PhantomCursor() {
  const { active, intense } = usePhantomMode();
  const location = useLocation();
  const onAnteroom = location.pathname.startsWith("/anteroom");
  const enabled = active || onAnteroom;
  const variant: "phantom" | "velvet" = onAnteroom ? "velvet" : "phantom";

  const cursorRef = useRef<HTMLDivElement>(null);
  const trailLayerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  // Hide native cursor body-wide when enabled.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!enabled) {
      document.documentElement.classList.remove("cursor-phantom");
      return;
    }
    // Disable on touch devices.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("cursor-phantom");
    return () => document.documentElement.classList.remove("cursor-phantom");
  }, [enabled]);

  // Mouse tracking + rAF interpolation for smooth follow + trail.
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let lastTrail = 0;
    const tick = (now: number) => {
      // smooth lerp toward target
      const ease = variant === "velvet" ? 0.18 : 0.32;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;
      const cur = cursorRef.current;
      if (cur) {
        cur.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      // spawn trail particle
      const interval = variant === "velvet" ? 28 : intense ? 14 : 22;
      if (now - lastTrail > interval && trailLayerRef.current) {
        lastTrail = now;
        const dot = document.createElement("span");
        dot.className = "phantom-ribbon";
        dot.dataset.variant = variant;
        if (intense) dot.dataset.intense = "1";
        dot.style.left = `${pos.current.x}px`;
        dot.style.top = `${pos.current.y}px`;
        trailLayerRef.current.appendChild(dot);
        const life = variant === "velvet" ? 900 : intense ? 700 : 500;
        window.setTimeout(() => dot.remove(), life);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled, variant, intense, visible]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={trailLayerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80]"
      />
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        {variant === "phantom" ? (
          // Stylized dagger — red blade, white edge, gold hilt.
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            style={{
              transform: "translate(-4px, -4px) rotate(-32deg)",
              filter: intense
                ? "drop-shadow(0 0 8px oklch(0.62 0.27 25 / 0.85)) drop-shadow(0 0 18px oklch(0.62 0.27 25 / 0.5))"
                : "drop-shadow(0 0 6px oklch(0.62 0.27 25 / 0.55))",
            }}
          >
            {/* blade */}
            <path
              d="M5 5 L22 22 L18 26 L3 11 Z"
              fill="oklch(0.98 0.005 60)"
              stroke="oklch(0.62 0.27 25)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* blade red edge */}
            <path
              d="M5 5 L22 22 L20 24 L3 7 Z"
              fill="oklch(0.62 0.27 25)"
              opacity="0.55"
            />
            {/* crossguard */}
            <path
              d="M19 19 L28 16 L31 19 L22 22 Z"
              fill="oklch(0.78 0.16 70)"
              stroke="oklch(0.35 0.08 40)"
              strokeWidth="0.8"
            />
            {/* hilt */}
            <rect
              x="24"
              y="22"
              width="4"
              height="6"
              rx="0.8"
              transform="rotate(45 26 25)"
              fill="oklch(0.2 0.02 30)"
              stroke="oklch(0.62 0.27 25)"
              strokeWidth="0.8"
            />
            {/* pommel */}
            <circle cx="30" cy="29" r="2" fill="oklch(0.78 0.16 70)" stroke="oklch(0.35 0.08 40)" strokeWidth="0.6" />
          </svg>
        ) : (
          // Velvet variant — calm blue diamond pointer.
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            style={{
              transform: "translate(-3px, -3px)",
              filter: "drop-shadow(0 0 8px oklch(0.65 0.18 250 / 0.8))",
            }}
          >
            <path
              d="M13 2 L20 13 L13 24 L6 13 Z"
              fill="oklch(0.98 0.01 250)"
              stroke="oklch(0.55 0.18 255)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="13" cy="13" r="2" fill="oklch(0.4 0.18 260)" />
          </svg>
        )}
      </div>
    </>
  );
}