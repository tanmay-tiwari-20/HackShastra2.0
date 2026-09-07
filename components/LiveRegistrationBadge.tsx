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

export const UnstopLogo: React.FC<{ className?: string }> = ({
  className = "h-2.5 w-auto",
}) => (
  <svg
    viewBox="0 0 2000 796"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Unstop"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1008.9,342.7c-0.6-28.8-20.4-43-59.9-43c-28.8,0-48.1,11.9-48.1,29.4c0,13,5.7,17.5,28.8,24.9l105.2,30
        c41.8,12.4,62.8,39,62.8,80.3c0,31.1-14.1,61.1-37.9,79.7c-23.8,18.7-57.7,28.3-101.8,28.3c-97.3,0-148.7-36.2-151-106.3h81.4
        c3.4,17,7.4,23.8,15.8,30c10.7,7.9,27.1,11.3,49.2,11.3c38.5,0,61.6-11.9,61.6-31.1c0-13-7.4-19.2-27.7-26l-99-30.5
        c-31.1-10.2-40.7-15.3-52-26.6c-11.3-12.4-17.5-30.5-17.5-52c0-65.6,50.3-106.3,131.8-106.3c86,0,138,40.7,139.1,108L1008.9,342.7z
        M1297.3,300.9h-46.4v173.6c0,28.3,5.1,35.1,27.1,35.1c6.8,0,10.7-0.6,19.2-1.7v57.7
        c-15.3,4.5-28.8,6.2-48.1,6.2c-54.3,0-81.4-24.9-81.4-75.2V300.3H1127v-54.9h40.7V160h83.1v85.4h46.4v55.5H1297.3z
        M1647.4,405.5c0,102.9-60.5,166.8-158.4,166.8c-98.4,0-158.3-63.9-158.3-169.1c0-104.6,59.9-169.1,157.8-169.1
        C1589.1,234.1,1647.4,297.5,1647.4,405.5L1647.4,405.5z M1413.8,403.2c0,61.6,30,102.4,75.2,102.4c44.7,0,75.2-41.3,75.2-101.2
        c0-62.8-29.4-103.5-75.2-103.5C1444.3,300.9,1413.8,342.1,1413.8,403.2z
        M1777.2,286.7c20.4-35.6,48.6-52.6,88.8-52.6c38.5,0,78,20.4,99.5,50.3c21.5,29.4,34.5,74.6,34.5,119.3
        c0,96.7-57.1,169.1-134,169.1c-40.2,0-69-16.4-88.8-52v166.8h-83.1V239.8h83.1V286.7L1777.2,286.7z M1777.2,403.8
        c0,59.4,27.7,99.5,70.1,99.5c41.3,0,70.1-40.2,70.1-98.4c0-61.6-27.7-101.8-70.1-101.8C1804.9,303.7,1777.2,343.8,1777.2,403.8z
        M397.6,0.4C178.6,0.4,0,179,0,398s178.6,397.6,397.6,397.6S795.2,617,795.2,398C795.1,179,616.5,0.4,397.6,0.4
        z M357.7,559h-82.6v-37.3c-23.8,36.2-52.6,51.5-96.1,51.5c-69,0-107.5-39.6-107.5-110.3V240.6h83.1v204.7
        c0,38.5,17.5,57.1,53.2,57.1c40.7,0,66.7-24.9,66.7-62.8V240h83.1v319H357.7z M640.5,559V362.2c0-37.9-17.5-57.1-53.2-57.1
        c-40.7,0-66.7,24.9-66.7,62.8V559h-83.1V240h82.6v0.6v45.8c23.8-36.2,52.6-51.5,96.1-51.5c69,0,107.5,39.6,107.5,110.3V559H640.5z"
    />
  </svg>
);

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

              <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live on</span>
                <UnstopLogo className="h-2.5 w-auto text-[#1C4980] dark:text-white" />
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
        <span className="inline-flex items-center px-2 py-1 rounded bg-white/20 text-white">
          <UnstopLogo className="h-2.5 w-auto text-white" />
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
