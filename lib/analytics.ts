import mixpanel from "mixpanel-browser";

type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

let ready = false;

function environmentFor(host: string): string {
  if (["localhost", "127.0.0.1", "::1"].includes(host)) return "development";
  if (host.includes("beta")) return "beta";
  return "production";
}

export function initMixpanel(): void {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (typeof window === "undefined" || !token || ready) return;
  try {
    const host = window.location.hostname;
    mixpanel.init(token, { track_pageview: "url-with-path", cross_subdomain_cookie: true });
    mixpanel.register({ site: host, product: "marketing", environment: environmentFor(host) });
    ready = true;
  } catch {
    ready = false;
  }
}

export function track(event: string, props?: AnalyticsProps): void {
  if (!ready) return;
  try {
    mixpanel.track(event, props);
  } catch {
    return;
  }
}
