"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LineArt from "./LineArt";
import WorkModal from "./WorkModal";
import { company, flagship, principles, works, type Work } from "@/lib/content";

const STEPS = ["Бид", "Zulzaga EDU", "Ажлууд", "Яагаад бид", "Холбоо"];
// Алхам бүр өөрийн хаягтай: icttool.mn/#ajluud гэх мэтээр шууд холбоос өгч болно
const HASHES = ["bid", "edu", "ajluud", "zarchim", "holboo"];

export default function Stage() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState<Work | null>(null);
  const lock = useRef(0);
  const touchY = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setStep(Math.max(0, Math.min(STEPS.length - 1, n)));
  }, []);

  const nudge = useCallback(
    (dir: 1 | -1) => {
      const now = Date.now();
      if (now - lock.current < 900) return;
      lock.current = now;
      setStep((s) => Math.max(0, Math.min(STEPS.length - 1, s + dir)));
    },
    []
  );

  useEffect(() => {
    if (open) return;
    // Дотроо гүйлгэгддэг хэсэг (утсан дээрх картууд) өөрөө гүйлгэх боломжтой бол алхам солихгүй
    const scrollable = (el: EventTarget | null, dy: number) => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        if (node.dataset?.scroll !== undefined) {
          const max = node.scrollHeight - node.clientHeight;
          if (max > 2 && ((dy > 0 && node.scrollTop < max - 1) || (dy < 0 && node.scrollTop > 0))) return true;
        }
        node = node.parentElement;
      }
      return false;
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 12 || scrollable(e.target, e.deltaY)) return;
      nudge(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        nudge(1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        nudge(-1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(STEPS.length - 1);
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY.current === null) return;
      const dy = touchY.current - e.changedTouches[0].clientY;
      touchY.current = null;
      if (Math.abs(dy) < 50 || scrollable(e.target, dy)) return;
      nudge(dy > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [open, nudge, go]);

  useEffect(() => {
    const i = HASHES.indexOf(window.location.hash.slice(1));
    if (i > 0) setStep(i);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", step === 0 ? window.location.pathname : `#${HASHES[step]}`);
  }, [step]);

  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <main className="stage" data-step={step}>
      <div className="glow" style={{ ["--p" as string]: step / (STEPS.length - 1) }} />
      <LineArt step={step} total={STEPS.length} />

      <header className="topbar">
        <button className="logo" onClick={() => go(0)} aria-label="Нүүр">
          {company.brand}
          <span className="dot">.</span>
        </button>
        <nav className="menu">
          <button onClick={() => go(1)}>Zulzaga EDU</button>
          <button onClick={() => go(2)}>Ажлууд</button>
          <button onClick={() => go(4)}>Холбоо</button>
        </nav>
        <div className="tag">
          <span className="rule" />
          {company.legalName}
        </div>
      </header>

      <div className="rail">
        <div className="nums">
          {STEPS.map((label, i) => (
            <button
              key={label}
              className={i === step ? "on" : ""}
              onClick={() => go(i)}
              aria-label={label}
              aria-current={i === step ? "step" : undefined}
            >
              {pad(i)}
            </button>
          ))}
        </div>
        <div className="bar">
          <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
        <div className="railLabel" key={step}>
          {STEPS[step]}
        </div>
      </div>

      <div className="arrows">
        <button onClick={() => go(step - 1)} disabled={step === 0} aria-label="Өмнөх">
          ‹
        </button>
        <button onClick={() => go(step + 1)} disabled={step === STEPS.length - 1} aria-label="Дараах">
          ›
        </button>
      </div>

      {/* 01 — Бид */}
      <section className={`slide ${step === 0 ? "active" : ""}`} aria-hidden={step !== 0}>
        <p className="eyebrow">Мэдээллийн технологийн компани</p>
        <h1 className="headline">
          Сургууль, бизнес, хүмүүст
          <br />
          <em>бодитоор ажилладаг</em> технологи.
        </h1>
        <button className="link" onClick={() => go(2)}>
          Бидний ажлууд
        </button>
      </section>

      {/* 02 — Zulzaga EDU */}
      <section className={`slide wide ${step === 1 ? "active" : ""}`} aria-hidden={step !== 1}>
        <div className="eduGrid">
          <div>
            <p className="eyebrow">{flagship.kind}</p>
            <h2 className="headline">{flagship.title}</h2>
            <p className="lead">{flagship.description}</p>
            <ul className="features">
              {flagship.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button className="link" onClick={() => setOpen(flagship)}>
              Системийг үзэх
            </button>
          </div>
          <button className="device" onClick={() => setOpen(flagship)} aria-label="Zulzaga EDU-г үзэх">
            <Shot work={flagship} />
          </button>
        </div>
      </section>

      {/* 03 — Ажлууд */}
      <section className={`slide wide ${step === 2 ? "active" : ""}`} aria-hidden={step !== 2}>
        <p className="eyebrow">Бидний бүтээсэн</p>
        <h2 className="headline small">Амьд ажиллаж буй бүтээгдэхүүнүүд</h2>
        <div className="works" data-scroll>
          {works.map((w, i) => (
            <button key={w.id} className="card" onClick={() => setOpen(w)} style={{ ["--i" as string]: i }}>
              <Shot work={w} />
              <span className="cardBody">
                <span className="cardKind">{w.kind}</span>
                <span className="cardTitle">{w.title}</span>
                <span className="cardText">{w.description}</span>
                <span className="cardOpen">Дотор нь үзэх →</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 04 — Яагаад бид */}
      <section className={`slide wide ${step === 3 ? "active" : ""}`} aria-hidden={step !== 3}>
        <p className="eyebrow">Бидний зарчим</p>
        <h2 className="headline small">Яагаад ICT Tool гэж?</h2>
        <div className="principles" data-scroll>
          {principles.map((p, i) => (
            <div key={p.title} className="principle" style={{ ["--i" as string]: i }}>
              <span className="pNum">{pad(i)}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — Холбоо */}
      <section className={`slide wide ${step === 4 ? "active" : ""}`} aria-hidden={step !== 4}>
        <p className="eyebrow">Холбоо барих</p>
        <h2 className="headline">Хамтдаа бүтээе.</h2>
        <dl className="facts">
          <div>
            <dt>Байгууллага</dt>
            <dd>
              {company.legalName}
              <small>{company.legalNameMn}</small>
            </dd>
          </div>
          <div>
            <dt>Регистрийн дугаар</dt>
            <dd>{company.registry}</dd>
          </div>
          <div>
            <dt>Хаяг</dt>
            <dd>{company.address}</dd>
          </div>
          <div>
            <dt>Имэйл</dt>
            <dd>{company.email.includes("@") ? <a href={`mailto:${company.email}`}>{company.email}</a> : company.email}</dd>
          </div>
          <div>
            <dt>Утас</dt>
            <dd>{company.phone}</dd>
          </div>
        </dl>
        <p className="copy">© {new Date().getFullYear()} {company.legalName}</p>
      </section>

      {open && <WorkModal work={open} onClose={() => setOpen(null)} />}
    </main>
  );
}

function Shot({ work }: { work: Work }) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // Hydration-оос өмнө ачаалал бүтэлгүйтсэн бол onError дахин дуудагдахгүй тул энд шалгана
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (!work.image || failed) {
    return (
      <span className="shot placeholder">
        <span>{work.title}</span>
      </span>
    );
  }
  return (
    <span className="shot">
      <img ref={img} src={work.image} alt={work.title} loading="lazy" onError={() => setFailed(true)} />
    </span>
  );
}
