"use client";

import { useEffect, useRef } from "react";
import { ICT_C, ICT_I, ICT_T } from "@/lib/logo";

// Ард нь нарийн хэвтээ шугамуудаар зурагдсан том "ICT".
// Үсгийн хэлбэр дотор шугамууд долгилж, хулгана ойртоход түлхэгдэнэ.
// step өөрчлөгдөхөд үсэг зөөлөн хажуу тийш шилжинэ.
export default function LineArt({ step, total }: { step: number; total: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let mask: Uint8Array = new Uint8Array(0);
    let gap = 7;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let offset = 0;
    let raf = 0;

    function buildMask() {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d")!;
      // Логоны ICT хэлбэр (Logo.tsx-тэй ижил зам): өргөн 106, өндөр 40 нэгж
      const scale = Math.min((w * 0.62) / 106, (h * 0.46) / 40);
      o.translate(w / 2 - 53 * scale, h / 2 - 22 * scale);
      o.scale(scale, scale);
      o.fillStyle = "#fff";
      o.strokeStyle = "#fff";
      o.fill(new Path2D(ICT_I));
      o.fill(new Path2D(ICT_T));
      o.lineWidth = 12;
      o.stroke(new Path2D(ICT_C));
      const data = o.getImageData(0, 0, w, h).data;
      mask = new Uint8Array(w * h);
      for (let i = 0; i < w * h; i++) mask[i] = data[i * 4 + 3] > 128 ? 1 : 0;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = w < 700 ? 5 : 7;
      buildMask();
    }

    function inside(x: number, y: number) {
      const xi = x | 0;
      const yi = y | 0;
      if (xi < 0 || yi < 0 || xi >= w || yi >= h) return false;
      return mask[yi * w + xi] === 1;
    }

    function frame(t: number) {
      const time = reduceMotion ? 0 : t * 0.0006;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      const target = (stepRef.current - (total - 1) / 2) * -w * 0.06;
      offset += (target - offset) * 0.05;

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const step = 4;

      for (let y = gap / 2; y < h; y += gap) {
        let drawing = false;
        ctx.beginPath();
        for (let x = 0; x <= w; x += step) {
          const sx = x - offset;
          if (!inside(sx, y)) {
            if (drawing) {
              ctx.stroke();
              ctx.beginPath();
              drawing = false;
            }
            continue;
          }
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const push = dist < 160 ? (1 - dist / 160) ** 2 * 26 * Math.sign(dy || 1) : 0;
          const wave =
            Math.sin(x * 0.012 + time * 2 + y * 0.03) * 3.2 +
            Math.sin(x * 0.031 - time * 1.3) * 1.4;
          const yy = y + wave + push;
          if (!drawing) {
            ctx.moveTo(x, yy);
            drawing = true;
          } else ctx.lineTo(x, yy);
        }
        const k = y / h;
        ctx.strokeStyle = `rgba(${170 + k * 60 | 0}, ${180 + k * 20 | 0}, 230, 0.16)`;
        if (drawing) ctx.stroke();
      }
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [total]);

  return <canvas ref={canvasRef} className="lineart" aria-hidden />;
}
