/**
 * Configuration for the active hackathon whose live metrics are displayed on HackShastra.
 * The active URL can be overridden anytime via the UNSTOP_HACKATHON_URL environment variable.
 */

export interface ActiveHackathonConfig {
  name: string;
  unstopUrl: string;
  cacheTtlMs: number;
  clientPollIntervalMs: number;
}

export const ACTIVE_HACKATHON_CONFIG: ActiveHackathonConfig = {
  name: "Grand Hack IPEC",
  // Default to the currently active HackShastra hackathon on Unstop
  unstopUrl:
    process.env.UNSTOP_HACKATHON_URL ||
    "https://unstop.com/p/grand-hack-ipec-hackshastra-1704703",
  // Cache Unstop responses on our server for 10 minutes (between 5 and 15 mins)
  cacheTtlMs: 10 * 60 * 1000,
  // Poll our own server API from the client every 5 minutes
  clientPollIntervalMs: 5 * 60 * 1000,
};

/**
 * Helper function to reliably extract the numeric competition/opportunity ID
 * from an Unstop URL or an ID string.
 *
 * Examples:
 * - https://unstop.com/p/grand-hack-ipec-hackshastra-1704703 -> 1704703
 * - https://unstop.com/hackathons/snowhackipec-hackshastra-1613746 -> 1613746
 * - https://unstop.com/competitions/some-slug-123456 -> 123456
 * - 1704703 -> 1704703
 */
export function extractUnstopCompetitionId(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^\d+$/.test(trimmed)) {
    return trimmed;
  }
  // Try extracting trailing ID before any query param or trailing slash
  const match = trimmed.match(/(\d+)(?:[/?#]|$)/);
  return match ? match[1] : null;
}
