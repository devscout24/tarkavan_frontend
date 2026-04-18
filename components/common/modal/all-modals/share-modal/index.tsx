"use client";

import { useState, useRef, useCallback } from "react";
import { X, Copy, Check, Link2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url?: string;
  title?: string;
  description?: string;
}

interface Platform {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  iconBg: string;
  copyFirst?: boolean;
  buildShareUrl: (url: string, text?: string) => string;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z" />
  </svg>
);

const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── Platforms ────────────────────────────────────────────────────────────────

const PLATFORMS: Platform[] = [
  {
    id: "facebook",
    label: "Facebook",
    icon: FacebookIcon,
    iconBg: "bg-[#1877F2] hover:bg-[#1565d8]",
    buildShareUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: InstagramIcon,
    iconBg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    copyFirst: true,
    buildShareUrl: () => "https://www.instagram.com/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: TikTokIcon,
    iconBg: "bg-black hover:bg-zinc-800",
    copyFirst: true,
    buildShareUrl: () => "https://www.tiktok.com/",
  },
  {
    id: "twitter",
    label: "X",
    icon: TwitterXIcon,
    iconBg: "bg-black hover:bg-zinc-800",
    buildShareUrl: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}${
        text ? `&text=${encodeURIComponent(text)}` : ""
      }`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: WhatsAppIcon,
    iconBg: "bg-[#25D366] hover:bg-[#1fb855]",
    buildShareUrl: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(text ? `${text}\n${url}` : url)}`,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidUrl(str: string): boolean {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

async function copyToClipboard(text: string): Promise<void> {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const el = document.createElement("textarea");
  el.value = text;
  el.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.appendChild(el);
  el.focus();
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShareModal({
  open,
  onOpenChange,
  url: externalUrl = "",
  title = "",
  description = "",
}: ShareModalProps) {
  // ── State ──
  // Initialise once; we won't sync externalUrl after mount via an effect.
  // If the caller needs to change the URL, unmount+remount (use a `key` prop).
  const [inputUrl, setInputUrl] = useState(externalUrl);
  const [copied, setCopied] = useState(false);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Derived ──
  const resolvedUrl =
    inputUrl.trim() ||
    (typeof window !== "undefined" ? window.location.href : "");
  const urlValid = isValidUrl(resolvedUrl);

  // ── Helpers ──
  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(resolvedUrl);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      setCopied(true);
      showToast("Link copied to clipboard");
      copiedTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast("Could not copy — please copy manually");
    }
  }, [resolvedUrl, showToast]);

  const handleShare = useCallback(
    async (platform: Platform) => {
      if (!urlValid) {
        showToast("Please enter a valid URL first");
        return;
      }

      if (activeTimer.current) clearTimeout(activeTimer.current);
      setActivePlatform(platform.id);
      activeTimer.current = setTimeout(() => setActivePlatform(null), 2000);

      if (platform.copyFirst) {
        try {
          await copyToClipboard(resolvedUrl);
          showToast(`Link copied! Paste it in ${platform.label} ↗`);
        } catch {
          /* ignore */
        }
        window.open(platform.buildShareUrl(resolvedUrl), "_blank", "noopener,noreferrer");
        return;
      }

      window.open(
        platform.buildShareUrl(resolvedUrl, title || description),
        "_blank",
        "noopener,noreferrer,width=620,height=520"
      );
    },
    [urlValid, resolvedUrl, title, description, showToast]
  );

  const handleNativeShare = useCallback(async () => {
    if (navigator?.share && urlValid) {
      try {
        await navigator.share({ url: resolvedUrl, title, text: description });
        return;
      } catch {
        return;
      }
    }
    handleCopy();
  }, [urlValid, resolvedUrl, title, description, handleCopy]);

  // ── onOpenChange wrapper — reset state when modal closes ──
  // We reset via the handler (user action), NOT inside an effect,
  // so there are no cascading renders.
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) {
        // Modal is closing — clear transient UI state immediately
        setCopied(false);
        setActivePlatform(null);
        setToast(null);
      } else {
        // Modal is opening — restore URL from prop & focus input
        setInputUrl(externalUrl);
        // Focus after the dialog's own open animation settles
        requestAnimationFrame(() => {
          requestAnimationFrame(() => inputRef.current?.focus());
        });
      }
      onOpenChange(next);
    },
    [externalUrl, onOpenChange]
  );

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "p-0 gap-0 overflow-hidden",
          "w-full max-w-sm sm:max-w-md",
          "rounded-2xl",
          "bg-white dark:bg-zinc-900",
          "border border-zinc-200 dark:border-zinc-800",
          "shadow-xl shadow-black/10"
        )}
      >
        {/* ── Header ── */}
        <DialogHeader className="px-5 pt-5 pb-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800">
              <ExternalLink className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </div>
            <DialogTitle className="text-base font-semibold text-zinc-900 dark:text-white tracking-tight">
              Share this link
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* ── Body ── */}
        <div className="px-5 py-5 space-y-5">

          {/* URL Input */}
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors",
              "bg-zinc-50 dark:bg-zinc-800/50",
              "border-zinc-200 dark:border-zinc-700",
              "focus-within:border-zinc-400 dark:focus-within:border-zinc-500"
            )}
          >
            <Link2 className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              ref={inputRef}
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://..."
              className={cn(
                "flex-1 min-w-0 bg-transparent text-sm outline-none",
                "text-zinc-800 dark:text-zinc-100",
                "placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              )}
            />
            <button
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg",
                "text-xs font-semibold transition-all duration-200 active:scale-95",
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-600 shadow-sm"
              )}
            >
              {copied ? (
                <><Check className="w-3.5 h-3.5" />Copied</>
              ) : (
                <><Copy className="w-3.5 h-3.5" />Copy</>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Share to
            </span>
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
          </div>

          {/* Platform Grid */}
          <div className="grid grid-cols-5 gap-2">
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              const isActive = activePlatform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleShare(p)}
                  disabled={!urlValid}
                  aria-label={`Share to ${p.label}`}
                  className="flex flex-col items-center gap-2 group outline-none"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      "transition-all duration-200",
                      "group-hover:scale-105 group-active:scale-95",
                      "group-disabled:opacity-40 group-disabled:pointer-events-none",
                      "group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-zinc-400",
                      p.iconBg,
                      isActive && "ring-2 ring-offset-2 ring-emerald-400 scale-105"
                    )}
                  >
                    {isActive
                      ? <Check className="w-5 h-5 text-white" />
                      : <Icon className="w-5 h-5 text-white" />
                    }
                  </div>
                  <span className={cn(
                    "text-[10.5px] font-medium leading-tight text-center",
                    "text-zinc-500 dark:text-zinc-400",
                    "group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors",
                    "group-disabled:opacity-40"
                  )}>
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* More options */}
          <button
            onClick={handleNativeShare}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl",
              "text-sm font-medium transition-colors duration-150 active:scale-[0.98]",
              "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700",
              "text-zinc-600 dark:text-zinc-400"
            )}
          >
            <ExternalLink className="w-4 h-4" />
            More options
          </button>
        </div>

        {/* ── Toast ── */}
        {toast && (
          <div className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none",
            "px-4 py-2 rounded-full shadow-lg whitespace-nowrap",
            "text-xs font-medium",
            "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900",
            "animate-in fade-in slide-in-from-bottom-2 duration-200"
          )}>
            {toast}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}