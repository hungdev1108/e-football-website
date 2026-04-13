"use client";

import * as React from "react";
import { Music2, Pause, Play, VolumeX, SkipForward } from "lucide-react";

const STORAGE_KEY = "efb-music-playing";
const VOLUME_KEY = "efb-music-volume";
const TRACK_KEY = "efb-music-track-index";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

interface Track {
  _id: string;
  url: string;
  title: string;
  originalName: string;
}

interface MusicConfig {
  tracks: Track[];
  enabled: boolean;
  volume: number;
}

export function MusicToggle({ className }: { className?: string }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [volume, setVolume] = React.useState(0.3);
  const [showVolume, setShowVolume] = React.useState(false);
  const [musicConfig, setMusicConfig] = React.useState<MusicConfig | null>(null);
  const [trackIndex, setTrackIndex] = React.useState(0);

  // Fetch music config from API
  React.useEffect(() => {
    setMounted(true);
    try {
      const v = localStorage.getItem(VOLUME_KEY);
      if (v) setVolume(Math.min(1, Math.max(0, parseFloat(v))));
      const idx = localStorage.getItem(TRACK_KEY);
      if (idx) setTrackIndex(Math.max(0, parseInt(idx, 10) || 0));
    } catch {}

    fetch(`${API_BASE}/system/music`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          const config = res.data as MusicConfig;
          setMusicConfig(config);
          try {
            const stored = localStorage.getItem(VOLUME_KEY);
            if (!stored && config.volume) {
              setVolume(config.volume / 100);
            }
          } catch {}
        }
      })
      .catch(() => setMusicConfig(null));
  }, []);

  const tracks = musicConfig?.tracks || [];
  const safeIndex = tracks.length > 0 ? trackIndex % tracks.length : 0;
  const currentTrack = tracks[safeIndex];

  // Keep audio element src in sync with current track
  React.useEffect(() => {
    if (!currentTrack) return;
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "none";
    }
    const el = audioRef.current;
    if (el.src !== currentTrack.url) {
      el.src = currentTrack.url;
    }
    el.volume = volume;
    // Single track loops; multi-track advances on `ended`
    el.loop = tracks.length === 1;
  }, [currentTrack, tracks.length, volume]);

  // Advance to next track when current ends (multi-track playlist)
  React.useEffect(() => {
    const el = audioRef.current;
    if (!el || tracks.length <= 1) return;
    const onEnded = () => {
      setTrackIndex((prev) => {
        const next = (prev + 1) % tracks.length;
        try {
          localStorage.setItem(TRACK_KEY, String(next));
        } catch {}
        return next;
      });
    };
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [tracks.length]);

  // When trackIndex changes while playing, autoplay the next one
  React.useEffect(() => {
    const el = audioRef.current;
    if (!el || !playing || !currentTrack) return;
    el.play().catch(() => setPlaying(false));
  }, [trackIndex, currentTrack, playing]);

  // Auto-start on page load: try play() immediately; if blocked by browser
  // autoplay policy, wait for first user interaction (click/tap/keydown) and
  // play then. Respects user's explicit pause from previous session.
  const autoStartedRef = React.useRef(false);
  React.useEffect(() => {
    if (autoStartedRef.current) return;
    if (!currentTrack || !audioRef.current) return;

    // If user explicitly paused before, don't auto-start
    try {
      if (localStorage.getItem(STORAGE_KEY) === "0") {
        autoStartedRef.current = true;
        return;
      }
    } catch {}

    autoStartedRef.current = true;
    const el = audioRef.current;
    el.volume = volume;

    const startPlayback = async () => {
      try {
        await el.play();
        setPlaying(true);
        try {
          localStorage.setItem(STORAGE_KEY, "1");
        } catch {}
      } catch {
        // Autoplay blocked — wait for first user gesture
        const onInteract = async () => {
          try {
            await el.play();
            setPlaying(true);
            try {
              localStorage.setItem(STORAGE_KEY, "1");
            } catch {}
          } catch {}
          document.removeEventListener("click", onInteract);
          document.removeEventListener("touchstart", onInteract);
          document.removeEventListener("keydown", onInteract);
        };
        document.addEventListener("click", onInteract, { once: false });
        document.addEventListener("touchstart", onInteract, { once: false });
        document.addEventListener("keydown", onInteract, { once: false });
      }
    };

    startPlayback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  const toggle = React.useCallback(async () => {
    if (!currentTrack || !audioRef.current) return;
    const el = audioRef.current;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
        localStorage.setItem(STORAGE_KEY, "0");
      } else {
        el.volume = volume;
        await el.play();
        setPlaying(true);
        localStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      setPlaying(false);
    }
  }, [playing, volume, currentTrack]);

  const skipNext = React.useCallback(() => {
    if (tracks.length <= 1) return;
    setTrackIndex((prev) => {
      const next = (prev + 1) % tracks.length;
      try {
        localStorage.setItem(TRACK_KEY, String(next));
      } catch {}
      return next;
    });
  }, [tracks.length]);

  const handleVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    try {
      localStorage.setItem(VOLUME_KEY, String(v));
    } catch {}
  };

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Click outside to close popover
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!showVolume) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setShowVolume(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [showVolume]);

  if (!mounted) {
    return (
      <button
        type="button"
        className={`h-9 w-9 rounded-full border border-border/50 bg-background/40 ${className || ""}`}
        aria-label="Music"
      />
    );
  }

  // Hide if disabled or playlist empty
  if (!musicConfig || !musicConfig.enabled || tracks.length === 0) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className || ""}`}
      onMouseEnter={() => setShowVolume(true)}
    >
      <button
        type="button"
        onClick={() => setShowVolume((v) => !v)}
        aria-label="Nhạc nền"
        aria-expanded={showVolume}
        className="group relative inline-flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background/40 backdrop-blur transition-colors hover:bg-accent/40"
      >
        {playing ? (
          <div className="flex h-4 items-end gap-[2px]">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="equalizer-bar block w-[2px] rounded-sm"
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(180deg, rgb(var(--neon-cyan)), rgb(var(--neon-violet)))",
                }}
              />
            ))}
          </div>
        ) : (
          <Music2 className="h-[1.05rem] w-[1.05rem] text-foreground/80 transition-transform group-hover:scale-110" />
        )}
        {playing && (
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-cyan-400/30" />
        )}
      </button>

      {showVolume && (
        <div className="absolute right-0 top-full z-50 w-52 rounded-xl border border-border/60 bg-popover/95 p-3 pt-4 shadow-xl backdrop-blur-xl">
          {/* Play/Pause + Skip */}
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-background/60 transition-colors hover:bg-accent/40"
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="ml-0.5 h-4 w-4" />
              )}
            </button>
            {tracks.length > 1 && (
              <button
                type="button"
                onClick={skipNext}
                aria-label="Bài tiếp theo"
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-background/60 transition-colors hover:bg-accent/40"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            )}
            <div className="ml-auto text-xs text-muted-foreground">
              {Math.round(volume * 100)}%
            </div>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-2">
            <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => handleVolume(parseFloat(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[rgb(var(--neon-violet))]"
              aria-label="Âm lượng"
            />
          </div>
        </div>
      )}
    </div>
  );
}
