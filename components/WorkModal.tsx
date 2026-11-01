"use client";

import { useEffect, useState } from "react";
import type { Work } from "@/lib/content";

// Ажлыг бүтэн дэлгэцийн popup дотор амьдаар нь харуулна.
// Сайт iframe-ийг хориглосон бол (embeddable: false) зураг + "сайт руу очих" харуулна.
export default function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => setLoaded(false), [device]);

  const host = work.url.replace(/^https?:\/\//, "");

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={work.title} onClick={onClose}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <div className="modalBar">
          <div className="modalTitle">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <strong>{work.title}</strong>
            <span className="host">{host}</span>
          </div>
          <div className="modalActions">
            {work.embeddable && (
              <div className="toggle" role="group" aria-label="Харагдац">
                <button className={device === "desktop" ? "on" : ""} onClick={() => setDevice("desktop")}>
                  Компьютер
                </button>
                <button className={device === "phone" ? "on" : ""} onClick={() => setDevice("phone")}>
                  Утас
                </button>
              </div>
            )}
            <a className="ext" href={work.url} target="_blank" rel="noopener noreferrer">
              Шинэ цонхонд ↗
            </a>
            <button className="close" onClick={onClose} aria-label="Хаах">
              ×
            </button>
          </div>
        </div>

        <div className="modalBody">
          {work.embeddable ? (
            <div className={`frame ${device}`}>
              {!loaded && <div className="loader" />}
              <iframe
                key={device}
                src={work.url}
                title={work.title}
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          ) : (
            <div className="locked">
              {work.image && <img src={work.image} alt={work.title} />}
              <div className="lockedText">
                <p>Энэ систем хэрэглэгчийн мэдээллийг хамгаалах үүднээс зөвхөн өөрийн хаяг дээр нээгдэнэ.</p>
                <a className="link" href={work.url} target="_blank" rel="noopener noreferrer">
                  {host} руу очих
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
