import axios from "axios";

const api = axios.create({
  baseURL: "https://tarkavan.thenightowl.team/api",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  let token: string | undefined;
  let childId: string | undefined;

  if (typeof window === "undefined") {
    const { cookies, headers } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("go_elite_token")?.value;

    const headerStore = await headers();
    const referer = headerStore.get("referer");
    const routerStateTree = headerStore.get("next-router-state-tree"); 

    if (referer) {
      try {
        const refererUrl = new URL(referer);
        childId = refererUrl.searchParams.get("child_id") ?? undefined;

        if (!childId) {
          const match = refererUrl.pathname.match(/\/child-dashboard\/(\d+)/);
          childId = match?.[1] ?? undefined;
        }
      } catch {
        // invalid URL — ignore
      }
    }

    if (!childId && routerStateTree) {
      const decoded = decodeURIComponent(routerStateTree);
      const match = decoded.match(/"child_id","(\d+)"/);
      childId = match?.[1] ?? undefined;
    }
 
  } else {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("go_elite_token="))
      ?.split("=")[1];

    const pathname = window.location.pathname;
    const search = window.location.search;

    const pathMatch = pathname.match(/\/child-dashboard\/(\d+)/);
    childId = pathMatch?.[1] ?? undefined;

    if (!childId) {
      childId = new URLSearchParams(search).get("child_id") ?? undefined;
    }
  }

  if (childId) {
    config.headers.set("active-child-id", childId);
    console.log("[API SERVER] active-child-id set:", childId);
    console.log("[API SERVER] headers:", JSON.stringify(config.headers));
  }

  config.params = {
    ...config.params,
  };

  const isFormDataRequest =
    typeof FormData !== "undefined" && config.data instanceof FormData;

  if (isFormDataRequest) {
    config.headers.delete("Content-Type");
  } else {
    config.headers.set("Content-Type", "application/json");
  }
  config.headers.set("Accept", "application/json");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default api;