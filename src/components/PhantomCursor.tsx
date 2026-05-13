import { useEffect, useRef } from "react";
import { usePhantomMode } from "./PhantomModeContext";

/**
 * Subtle red cursor trail. Always-on but very faint;
 * becomes much more visible when phantom mode is active.
 */
export default function PhantomCursor() {
  const { active } = usePhantomMode();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch / coarse pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const layer = layerRef.current;
    if (!layer) return;

    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < (active ? 16 : 55)) return;
      last = now;

      const dot = document.createElement("span");
      dot.className = "phantom-trail-dot";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      if (active) dot.dataset.active = "1";
      layer.appendChild(dot);
      window.setTimeout(() => dot.remove(), active ? 700 : 350);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80]"
    />
  );
}