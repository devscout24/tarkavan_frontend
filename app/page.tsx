"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RouteKey = "parent" | "player" | "coach" | "club" | "auth";

interface NavButton {
  key: RouteKey;
  label: string;
  route: string;
  icon: string;
  description: string;
  color: string;
  glow: string;
}

const NAV_BUTTONS: NavButton[] = [
  {
    key: "parent",
    label: "Parent",
    route: "/parent",
    icon: "👨‍👩‍👧",
    description: "Manage your child's activities",
    color: "from-violet-600 to-purple-700",
    glow: "shadow-violet-500/30",
  },
  {
    key: "player",
    label: "Player",
    route: "/player",
    icon: "⚽",
    description: "Track your performance & stats",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/30",
  },
  {
    key: "coach",
    label: "Coach",
    route: "/coach",
    icon: "🎯",
    description: "Train and guide your team",
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/30",
  },
  {
    key: "club",
    label: "Club",
    route: "/club",
    icon: "🏟️",
    description: "Manage your club & rosters",
    color: "from-sky-500 to-blue-600",
    glow: "shadow-sky-500/30",
  },
  {
    key: "auth",
    label: "Auth",
    route: "/auth",
    icon: "🔐",
    description: "Sign in or create an account",
    color: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/30",
  },
];

export default function DemoPage() {
  const router = useRouter();
  const [active, setActive] = useState<RouteKey | null>(null);

  const handleNavigate = (btn: NavButton) => {
    setActive(btn.key);
    router.push(btn.route);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-800/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-sky-800/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/5 blur-[140px]" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50 tracking-widest uppercase mb-6 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Demo Portal
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
          Choose your
          <span className="block bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            role
          </span>
        </h1>
        <p className="mt-4 text-white/40 text-base max-w-xs mx-auto leading-relaxed">
          Select a portal to explore the platform from your perspective
        </p>
      </div>

      {/* Buttons Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
        {NAV_BUTTONS.map((btn, i) => (
          <button
            key={btn.key}
            onClick={() => handleNavigate(btn)}
            className={`
              group relative flex flex-col items-start gap-3 p-6 rounded-2xl
              bg-white/[0.03] border border-white/[0.07]
              hover:border-white/20 hover:bg-white/[0.06]
              active:scale-[0.97]
              transition-all duration-200 ease-out text-left
              ${active === btn.key ? "border-white/30 bg-white/[0.08] scale-[0.98]" : ""}
              ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            `}
          >
            {/* Gradient line top */}
            <div
              className={`absolute top-0 left-6 right-6 h-[1px] rounded-full bg-gradient-to-r ${btn.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Icon */}
            <div
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                bg-gradient-to-br ${btn.color} shadow-xl ${btn.glow}
              `}
            >
              {btn.icon}
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-white font-bold text-lg leading-none">{btn.label}</p>
              <p className="text-white/40 text-sm mt-1 leading-snug">{btn.description}</p>
            </div>

            {/* Arrow */}
            <div className="self-end opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-200">
              <svg
                className="w-4 h-4 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>

            {/* Route badge */}
            <span className="absolute top-4 right-4 text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors">
              {btn.route}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <p className="relative z-10 mt-12 text-white/20 text-xs font-mono tracking-wider">
        DEMO · v1.0.0
      </p>
    </main>
  );
}