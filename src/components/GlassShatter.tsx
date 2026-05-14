import { useEffect, useRef } from "react";
import { usePhantomMode } from "./PhantomModeContext";

/**
 * Stylized glass-shatter / bullet impact effect on click while in phantom mode.
 * Throttled to feel cinematic (not on every micro-click).
 */
export default function GlassShatter() {
  const { active, intense } = usePhantomMode();
  const layerRef = useRef<HTMLDivElement>(null);
  const lastFire = useRef(0);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      // Only fire on "important" interactive blocks: cards, buttons, links inside content.
      const eligible = t.closest(
        "[data-shatter], a, button, [role='button'], .group, [class*='rounded-']"
      );
      if (!eligible) return;
      // Skip the cursor itself & nav theme button to avoid noise
      if ((eligible as HTMLElement).closest("[data-no-shatter]")) return;

      const now = performance.now();
      if (now - lastFire.current < 220) return;
      lastFire.current = now;

      spawn(e.clientX, e.clientY, intense);
    };

    const spawn = (x: number, y: number, hard: boolean) => {
      const layer = layerRef.current;
      if (!layer) return;
      const wrap = document.createElement("div");
      wrap.className = "glass-shatter";
      wrap.style.left = `${x}px`;
      wrap.style.top = `${y}px`;
      if (hard) wrap.dataset.intense = "1";
      // SVG content
      const size = hard ? 220 : 170;
      wrap.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="-100 -100 200 200" style="overflow:visible">
          <g class="gs-flash">
            <circle r="6" fill="white" opacity="0.95" />
            <circle r="14" fill="oklch(0.62 0.27 25)" opacity="0.35" />
          </g>
          <g class="gs-cracks" stroke="white" stroke-width="1.2" fill="none" stroke-linecap="round">
            <path d="M0,0 L62,-18" />
            <path d="M0,0 L48,38" />
            <path d="M0,0 L-58,22" />
            <path d="M0,0 L-30,-52" />
            <path d="M0,0 L18,58" />
            <path d="M0,0 L-44,-30" />
            <path d="M0,0 L70,8" />
            <path d="M0,0 L-12,-66" />
          </g>
          <g class="gs-cracks-thin" stroke="oklch(0.62 0.27 25)" stroke-width="0.8" fill="none" opacity="0.85">
            <path d="M22,-6 L40,-26" />
            <path d="M16,14 L34,30" />
            <path d="M-20,8 L-38,18" />
            <path d="M-12,-20 L-22,-44" />
            <path d="M6,22 L14,46" />
          </g>
          <g class="gs-shards" fill="oklch(0.62 0.27 25)" opacity="0.85">
            <polygon points="0,0 14,-4 18,4" />
            <polygon points="0,0 -10,-6 -16,4" />
            <polygon points="0,0 8,10 -2,14" />
          </g>
        </svg>`;
      layer.appendChild(wrap);
      window.setTimeout(() => wrap.remove(), 850);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [active, intense]);

  if (!active) return null;

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[85] overflow-visible"
    />
  );
}