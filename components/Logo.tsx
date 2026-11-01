import { ICT_C, ICT_I, ICT_T } from "@/lib/logo";

// ICT | TOOL лого. Өнгө нь currentColor тул эцэг элементийн color-оор будагдана.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 236 44" role="img" aria-label="ICT Tool">
      <g fill="currentColor">
        {/* I — дээд зүүн булан нь налуу */}
        <path d={ICT_I} />
        {/* T */}
        <path d={ICT_T} />
      </g>
      {/* C */}
      <path
        d={ICT_C}
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
      />
      {/* Тусгаарлагч зураас */}
      <rect x="118" y="0" width="1.6" height="44" fill="currentColor" />
      <text
        x="131"
        y="37.5"
        fill="currentColor"
        style={{ font: "400 37px var(--sans)", letterSpacing: "1px" }}
      >
        TOOL
      </text>
    </svg>
  );
}
