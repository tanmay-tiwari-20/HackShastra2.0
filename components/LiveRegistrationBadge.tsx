"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  ExternalLink,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { ACTIVE_HACKATHON_CONFIG } from "@/lib/hackathon-config";

interface RegistrationData {
  available: boolean;
  count: number;
  formattedCount: string;
  metric: string;
  label: string;
  teamsCount?: number;
  viewsCount?: number;
  regStatus?: string;
  hackathonTitle?: string;
  source: string;
  updatedAt: string;
  stale?: boolean;
}

interface LiveRegistrationBadgeProps {
  unstopUrl?: string;
  className?: string;
  variant?: "highlight" | "badge" | "floating";
  showTeams?: boolean;
  showViews?: boolean;
}

function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

export const LiveRegistrationBadge: React.FC<LiveRegistrationBadgeProps> = ({
  unstopUrl,
  className = "",
  variant = "badge",
  showTeams = true,
  showViews = true,
}) => {
  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchRegistrations() {
      try {
        const queryParams = new URLSearchParams();
        if (unstopUrl) {
          queryParams.set("url", unstopUrl);
        }
        const endpoint = `/api/hackathon/registrations${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;

        const res = await fetch(endpoint);
        if (res.ok) {
          const json: RegistrationData = await res.json();
          if (isMounted && json.available) {
            setData(json);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live registrations:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRegistrations();

    // Periodically refresh the count every 5 minutes
    const interval = setInterval(
      fetchRegistrations,
      ACTIVE_HACKATHON_CONFIG.clientPollIntervalMs
    );

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [unstopUrl]);

  // Loading skeleton state
  if (loading && !data) {
    if (variant === "highlight") {
      return (
        <div
          className={`w-full rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50 p-6 backdrop-blur-md animate-pulse ${className}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-10 w-52 rounded bg-zinc-300 dark:bg-zinc-700" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-10 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/60 backdrop-blur-md animate-pulse ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="h-3 w-28 rounded bg-zinc-300 dark:bg-zinc-700" />
      </div>
    );
  }

  // Gracefully hide if unavailable or empty
  if (!data || !data.available || data.count === 0) {
    return null;
  }

  // 1. HIGHLIGHT VARIANT (Showcase Card)
  // Completely styled with pure Tailwind CSS `dark:` classes so it toggles in 100% lockstep with the theme
  if (variant === "highlight") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-white/10 bg-linear-to-b from-white/95 via-zinc-50/80 to-zinc-100/50 dark:from-zinc-900/70 dark:via-zinc-950/80 dark:to-black/90 backdrop-blur-xl p-5 sm:p-6 shadow-sm hover:shadow-xl dark:shadow-2xl dark:hover:border-white/20 transition-all duration-500 ${className}`}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none bg-blue-500 dark:bg-red-600" />
        <div className="absolute -bottom-14 -left-14 w-44 h-44 rounded-full blur-3xl opacity-10 pointer-events-none bg-blue-400 dark:bg-red-800" />

        <div className="relative z-10 space-y-4">
          {/* Top Status & Verification Header */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              {/* Radar live beacon */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-500 dark:bg-red-500" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 dark:bg-red-600" />
              </span>

              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-red-500">
                Live Participation
              </span>

              <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live on Unstop
              </span>
            </div>

            {/* Official Unstop Link Capsule */}
            <a
              href={unstopUrl || ACTIVE_HACKATHON_CONFIG.unstopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all shadow-2xs"
            >
              <ShieldCheck size={12} className="text-blue-500 dark:text-red-500" />
              <span>Verified Listing</span>
              <ExternalLink
                size={11}
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform opacity-70"
              />
            </a>
          </div>

          {/* Main Metrics Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end pt-1">
            {/* Left: Big Hero Count */}
            <div className="md:col-span-7 space-y-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 dark:text-white leading-none">
                  {data.formattedCount}
                </span>
                <span className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-zinc-600 dark:text-zinc-300">
                  Participants Registered
                </span>
              </div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Real-time participant count synced directly from Unstop platform.
              </p>
            </div>

            {/* Right: Secondary Key Metrics */}
            <div className="md:col-span-5 flex items-center md:justify-end gap-2.5 flex-wrap">
              {showTeams && data.teamsCount !== undefined && (
                <div
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm shadow-2xs"
                  title={`${data.teamsCount.toLocaleString()} teams registered on Unstop`}
                >
                  <div className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-red-500/10 text-blue-600 dark:text-red-500">
                    <Users size={14} />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-black text-zinc-900 dark:text-white">
                      {data.teamsCount.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Teams Formed
                    </span>
                  </div>
                </div>
              )}

              {showViews && data.viewsCount !== undefined && (
                <div
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm shadow-2xs"
                  title={`${data.viewsCount.toLocaleString()} total impressions on Unstop`}
                >
                  <div className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-red-500/10 text-blue-600 dark:text-red-500">
                    <Eye size={14} />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-black text-zinc-900 dark:text-white">
                      {formatCompactNumber(data.viewsCount)}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Total Views
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. FLOATING VARIANT (Poster overlay)
  if (variant === "floating") {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border border-white/20 bg-black/70 backdrop-blur-xl shadow-2xl text-white ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-500" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm font-black tracking-tight text-white">
            {data.formattedCount}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
            Registered
          </span>
          {showViews && data.viewsCount !== undefined && (
            <>
              <span className="text-white/30 text-xs">·</span>
              <span
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-300"
                title={`${data.viewsCount.toLocaleString()} views`}
              >
                <Eye size={10} className="text-zinc-400" />
                {formatCompactNumber(data.viewsCount)} Views
              </span>
            </>
          )}
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/20 text-white">
          Unstop
        </span>
      </div>
    );
  }

  // 3. BADGE VARIANT (Enhanced pill)
  return (
    <div
      className={`group relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 dark:border-red-500/30 bg-blue-50/80 dark:bg-red-950/20 hover:border-blue-500/60 dark:hover:border-red-500/60 backdrop-blur-md transition-all duration-300 shadow-xs ${className}`}
      title={
        data.teamsCount
          ? `${data.teamsCount.toLocaleString()} teams · ${data.viewsCount?.toLocaleString() || 0} views · Live from Unstop`
          : "Live count from Unstop"
      }
    >
      {/* Live pulse dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-500 dark:bg-red-500" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-red-600" />
      </span>

      {/* Count & Label */}
      <div className="flex items-center gap-1.5 text-xs flex-wrap">
        <span className="font-black tracking-tight text-zinc-900 dark:text-white">
          {data.formattedCount}
        </span>
        <span className="font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider text-[10px]">
          Participants
        </span>

        {showTeams && data.teamsCount !== undefined && (
          <>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
              <Users size={11} />
              {data.teamsCount.toLocaleString()} Teams
            </span>
          </>
        )}

        {showViews && data.viewsCount !== undefined && (
          <>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400"
              title={`${data.viewsCount.toLocaleString()} views`}
            >
              <Eye size={11} />
              {formatCompactNumber(data.viewsCount)} Views
            </span>
          </>
        )}
      </div>

      {/* Source Tag */}
      <span className="inline-flex items-center gap-1 pl-1.5 border-l border-zinc-300 dark:border-zinc-700 text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-red-500">
        <TrendingUp size={10} />
        Live
      </span>
    </div>
  );
};

export default LiveRegistrationBadge;
