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

    // Нээгдэх үеийн хөдөлгөөн: мөр бүр зүүнээс баруун тийш үзгээр зурах мэт гарч,
    // эхний долгио нь тайвширна. Нийт ~2.2с, зөвхөн анх ачаалахад.
    const INTRO_MS = 2200;
    let introStart = -1;

    // Алхам солиход шугамуудаар нэг зурвас долгио гүйнэ: урагшлахад дээрээс доош,
    // буцахад доороос дээш. ~1.4с, аажмаар сулрана.
    const SWEEP_MS = 1400;
    let lastStep = stepRef.current;
    let sweepStart = -1e9;
    let sweepDir = 1;

    function frame(t: number) {
      const time = reduceMotion ? 0 : t * 0.0006;
      const now = performance.now();
      if (introStart < 0) introStart = now;
      const intro = reduceMotion ? 1 : Math.min(1, (now - introStart) / INTRO_MS);
      if (stepRef.current !== lastStep) {
        sweepDir = stepRef.current > lastStep ? 1 : -1;
        lastStep = stepRef.current;
        sweepStart = now;
      }
      const sp = (now - sweepStart) / SWEEP_MS;
      const sweeping = !reduceMotion && sp >= 0 && sp < 1;
      // Зурвасын төв: -0.2h-аас 1.2h хүртэл (буцахад эсрэгээр), хурд нь зөөлөн удаашрана
      const se = 1 - (1 - Math.min(sp, 1)) ** 2;
      const front = sweepDir > 0 ? h * (-0.2 + 1.4 * se) : h * (1.2 - 1.4 * se);
      const sweepAmp = 16 * (1 - sp);
      const band = h * 0.11;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      const target = (stepRef.current - (total - 1) / 2) * -w * 0.06;
      offset += (target - offset) * 0.05;

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      const step = 4;

      for (let y = gap / 2; y < h; y += gap) {
        const k = y / h;
        // Дээрээс доош 0.45-ын саатлаар дараалж зурагдана
        const rp = Math.min(1, Math.max(0, (intro - k * 0.45) / 0.55));
        if (rp <= 0) continue;
        const eased = 1 - (1 - rp) ** 3;
        const reach = eased * w;
        const settle = 1 + (1 - eased) * 2.2;
        const bump = sweeping ? Math.exp(-(((y - front) / band) ** 2)) : 0;
        ctx.strokeStyle = `rgba(${(170 + k * 60) | 0}, ${(180 + k * 20) | 0}, 230, ${0.16 * eased * (1 + bump * 0.9)})`;
        let drawing = false;
        ctx.beginPath();
        for (let x = 0; x <= reach; x += step) {
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
          const swell = bump ? bump * sweepAmp * Math.sin(x * 0.016 - now * 0.005) : 0;
          const yy = y + wave * settle + push + swell;
          if (!drawing) {
            ctx.moveTo(x, yy);
            drawing = true;
          } else ctx.lineTo(x, yy);
        }
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
