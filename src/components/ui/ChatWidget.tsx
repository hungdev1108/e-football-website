"use client";

import { memo } from "react";
import Image from "next/image";

interface ContactItem {
  id: string;
  label: string;
  href: string;
  iconSrc: string;
  /** Border/glow color (solid rgb values) for the radar rings */
  color: string;
}

const contacts: ContactItem[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/tran.hiep.229430",
    iconSrc: "/Facebook_Logo.png",
    color: "24,119,242", // #1877F2
  },
  {
    id: "zalo",
    label: "Zalo",
    href: "https://zalo.me/0395860670",
    iconSrc: "/icons8-zalo-48.png",
    color: "0,104,255", // #0068FF
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@emlaaai123",
    iconSrc: "/icons8-tiktok-50.png",
    color: "236,72,153", // pink-500
  },
];

export const ChatWidget = memo(function ChatWidget() {
  return (
    <div className="fixed bottom-6 right-5 z-[9999] flex flex-col items-center gap-3 sm:right-6">
      {contacts.map((c, idx) => (
        <a
          key={c.id}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={c.label}
          title={c.label}
          className="group relative block h-12 w-12 sm:h-14 sm:w-14"
        >
          {/* Radar rings — two layers, staggered */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full animate-radar"
            style={{
              boxShadow: `0 0 0 4px rgba(${c.color}, 0.55)`,
              animationDelay: `${idx * 0.35}s`,
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full animate-radar"
            style={{
              boxShadow: `0 0 0 2px rgba(${c.color}, 0.4)`,
              animationDelay: `${idx * 0.35 + 1}s`,
            }}
          />

          {/* Button — wobbles subtly, scales on hover */}
          <span
            className="relative flex h-full w-full animate-wobble items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-4px_rgba(0,0,0,0.4)] ring-2 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-4"
            style={{
              animationDelay: `${idx * 0.8}s`,
              boxShadow: `0 0 0 2px rgba(${c.color}, 0.25), 0 0 18px rgba(${c.color}, 0.4), 0 10px 28px -6px rgba(0,0,0,0.45)`,
            }}
          >
            <Image
              src={c.iconSrc}
              alt={c.label}
              width={56}
              height={56}
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              unoptimized
            />
          </span>
        </a>
      ))}
    </div>
  );
});
