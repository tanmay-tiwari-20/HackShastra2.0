import { NextRequest, NextResponse } from "next/server";
import {
  ACTIVE_HACKATHON_CONFIG,
  extractUnstopCompetitionId,
} from "@/lib/hackathon-config";

// Interface for cached registration data
interface RegistrationCacheEntry {
  data: {
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
    stale: boolean;
  };
  timestamp: number;
}

// Global in-memory cache to persist across requests in the Node process
const cache = new Map<string, RegistrationCacheEntry>();
const inflightPromises = new Map<string, Promise<any>>();

async function fetchFromUnstop(competitionId: string) {
  const url = `https://unstop.com/api/public/competition/${competitionId}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Unstop API returned status ${res.status}`);
    }

    const json = await res.json();
    const competition = json?.data?.competition;

    if (!competition) {
      throw new Error("Competition data not found in Unstop response");
    }

    const count = typeof competition.registerCount === "number" ? competition.registerCount : 0;
    const teamsCount = typeof competition.players_count === "number" ? competition.players_count : undefined;
    const viewsCount = typeof competition.viewsCount === "number" ? competition.viewsCount : undefined;
    const regStatus = competition.regnRequirements?.reg_status || undefined;
    const hackathonTitle = competition.title || "HackShastra Hackathon";

    return {
      available: true,
      count,
      formattedCount: count.toLocaleString("en-US"),
      metric: "registrations",
      label: "Registrations",
      teamsCount,
      viewsCount,
      regStatus,
      hackathonTitle,
      source: "unstop",
      updatedAt: new Date().toISOString(),
      stale: false,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const queryUrl = searchParams.get("url");
    const queryId = searchParams.get("id");

    // Determine target URL or ID
    const targetUrlOrId =
      queryId ||
      queryUrl ||
      process.env.UNSTOP_HACKATHON_URL ||
      ACTIVE_HACKATHON_CONFIG.unstopUrl;

    const competitionId = extractUnstopCompetitionId(targetUrlOrId);

    if (!competitionId) {
      return NextResponse.json(
        {
          available: false,
          error: "Invalid or missing Unstop competition ID/URL",
          source: "unstop",
          updatedAt: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const now = Date.now();
    const cached = cache.get(competitionId);

    // Return fresh cached data if still within TTL
    if (cached && now - cached.timestamp < ACTIVE_HACKATHON_CONFIG.cacheTtlMs) {
      return NextResponse.json(cached.data, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
          "X-Cache": "HIT",
        },
      });
    }

    // Reuse existing in-flight request to avoid duplicate concurrent calls to Unstop
    let fetchPromise = inflightPromises.get(competitionId);
    if (!fetchPromise) {
      fetchPromise = fetchFromUnstop(competitionId)
        .then((data) => {
          cache.set(competitionId, { data, timestamp: Date.now() });
          return data;
        })
        .finally(() => {
          inflightPromises.delete(competitionId);
        });
      inflightPromises.set(competitionId, fetchPromise);
    }

    try {
      const liveData = await fetchPromise;
      return NextResponse.json(liveData, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
          "X-Cache": "MISS",
        },
      });
    } catch (fetchError: any) {
      console.error(
        `[/api/hackathon/registrations] Error fetching Unstop ID ${competitionId}:`,
        fetchError.message
      );

      // Fallback: If we have stale cached data, return it with stale=true rather than breaking
      if (cached) {
        return NextResponse.json(
          {
            ...cached.data,
            stale: true,
          },
          {
            status: 200,
            headers: {
              "Cache-Control": "no-cache",
              "X-Cache": "STALE",
            },
          }
        );
      }

      // If no cache exists, return graceful unavailable response
      return NextResponse.json(
        {
          available: false,
          error: "Registration count currently unavailable from source",
          source: "unstop",
          updatedAt: new Date().toISOString(),
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
    }
  } catch (err: any) {
    console.error("[/api/hackathon/registrations GET] Internal error:", err);
    return NextResponse.json(
      {
        available: false,
        error: "Internal server error",
        source: "unstop",
        updatedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
