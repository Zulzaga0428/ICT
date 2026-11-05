"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LineArt from "./LineArt";
import WorkModal from "./WorkModal";
import Logo from "./Logo";
import { about, company, hero, works, type Work } from "@/lib/content";

const STEPS = ["Нүүр", "Бидний тухай", "Ажлууд", "Холбоо"];
// Алхам бүр өөрийн хаягтай: icttool.net/#ajluud гэх мэтээр шууд холбоос өгч болно
const HASHES = ["nuur", "tuhai", "ajluud", "holboo"];

export default function Stage() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState<Work | null>(null);
  // Анх ачаалахад шугамууд зурагдсаны дараа бичвэр гарна (globals.css .stage.intro)
  const [intro, setIntro] = useState(true);
  // «Гүйлгэх» заавар: нэг удаа нүүрнээс шилжмэгц бүрмөсөн нуугдана
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    if (step !== 0) setMoved(true);
  }, [step]);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 2800);
    return () => clearTimeout(t);
  }, []);
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

  // Анх нээхэд болон хуудас нээлттэй үед #хаяг солигдоход (холбоос дарах г.м.) алхам руу шилжинэ
  useEffect(() => {
    const fromHash = () => {
      const i = HASHES.indexOf(window.location.hash.slice(1));
      if (i >= 0) setStep(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", step === 0 ? window.location.pathname : `#${HASHES[step]}`);
  }, [step]);

  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <main className={`stage${intro ? " intro" : ""}`} data-step={step}>
      <div className="glow" style={{ ["--p" as string]: step / (STEPS.length - 1) }} />
      <LineArt step={step} total={STEPS.length} />

      <header className="topbar">
        <button className="logo" onClick={() => go(0)} aria-label="Нүүр">
          <Logo />
        </button>
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

      <button
        className={`hint${step === 0 && !moved ? " show" : ""}`}
        onClick={() => go(1)}
        aria-label="Дараагийн хэсэг"
        tabIndex={step === 0 && !moved ? 0 : -1}
      >
        <span className="hintTrack">
          <span className="hintDot" />
        </span>
        Гүйлгэх
      </button>

      <div className="arrows">
        <button onClick={() => go(step - 1)} disabled={step === 0} aria-label="Өмнөх">
          ‹
        </button>
        <button onClick={() => go(step + 1)} disabled={step === STEPS.length - 1} aria-label="Дараах">
          ›
        </button>
      </div>

      {/* 01 — Нүүр */}
      <section className={`slide ${step === 0 ? "active" : ""}`} aria-hidden={step !== 0}>
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="headline quote">
          {hero.line1}
          <br />
          <em>{hero.accent}</em>
          {hero.after}
        </h1>
        <button className="link" onClick={() => go(2)}>
          Бидний ажлууд
        </button>
      </section>

      {/* 02 — Бидний тухай */}
      <section className={`slide wide ${step === 1 ? "active" : ""}`} aria-hidden={step !== 1}>
        <div className="aboutGrid" data-scroll>
          <div>
            <p className="eyebrow">Бидний тухай</p>
            <h2 className="headline">
              {about.title[0]}
              <br />
              <em>{about.title[1]}</em>
            </h2>
          </div>
          <div className="aboutBody">
            {about.paragraphs.map((p) => (
              <p key={p} className="lead">
                {p}
              </p>
            ))}
            <h3 className="aboutLabel">Бидний чиглэл</h3>
            <ul className="chips">
              {about.directions.map((d, i) => (
                <li key={d} style={{ ["--i" as string]: i }}>
                  {d}
                </li>
              ))}
            </ul>
            <h3 className="aboutLabel">Бидний зарчим</h3>
            <ul className="values">
              {about.principles.map((p, i) => (
                <li key={p} style={{ ["--i" as string]: i }}>
                  <span>{pad(i)}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 — Ажлууд */}
      <section className={`slide wide ${step === 2 ? "active" : ""}`} aria-hidden={step !== 2}>
        <p className="eyebrow">Бидний бүтээсэн</p>
        <h2 className="headline small">Амьд ажиллаж буй бүтээгдэхүүнүүд</h2>
        <div className="works" data-scroll>
          {works.map((w, i) => (
            <button
              key={w.id}
              className={`card${w.featured ? " featured" : ""}`}
              onClick={() => setOpen(w)}
              style={{ ["--i" as string]: i }}
            >
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

      {/* 04 — Холбоо */}
      <section className={`slide wide ${step === 3 ? "active" : ""}`} aria-hidden={step !== 3}>
        <p className="eyebrow">
          Холбоо барих · <span lang="en">Contact</span>
        </p>
        <h2 className="headline">Хамтдаа бүтээе.</h2>
        <dl className="facts">
          <div>
            <dt>
              Байгууллага · <span lang="en">Company</span>
            </dt>
            <dd>
              {company.legalName}
              <small>{company.legalNameMn}</small>
            </dd>
          </div>
          <div>
            <dt>
              Улсын бүртгэлийн дугаар · <span lang="en">Reg. No.</span>
            </dt>
            <dd>{company.registry}</dd>
          </div>
          <div className="wide">
            <dt>
              Хаяг · <span lang="en">Address</span>
            </dt>
            <dd>
              {company.addressMn}
              <small lang="en">{company.addressEn}</small>
            </dd>
          </div>
          <div>
            <dt>
              Имэйл · <span lang="en">Email</span>
            </dt>
            <dd>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </dd>
          </div>
          <div>
            <dt>
              Утас · <span lang="en">Phone</span>
            </dt>
            <dd>
              <a href={`tel:+${company.phone.replace(/\D/g, "")}`}>{company.phone}</a>
            </dd>
          </div>
        </dl>
        <p className="copy">
          © {new Date().getFullYear()} {company.legalName} · Reg. No. {company.registry} ·{" "}
          <a href="/privacy">Нууцлалын бодлого / Privacy Policy</a>
        </p>
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
