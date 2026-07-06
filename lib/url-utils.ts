const DEFAULT_API_ORIGIN = "https://tarkavan.thenightowl.team"
const DEFAULT_API_BASE_URL = `${DEFAULT_API_ORIGIN}/api`

export function getApiBaseUrl() {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL
  }

  return "/api"
}

// export function resolveAssetUrl(value?: string | null) {
//   if (!value) {
//     return ""
//   }

//   if (
//     /^(https?:)?\/\//i.test(value) ||
//     value.startsWith("/") ||
//     value.startsWith("data:") ||
//     value.startsWith("blob:")
//   ) {
//     return value
//   }

//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL

//   try {
//     return `${new URL(apiBaseUrl).origin}/${value.replace(/^\/+/, "")}`
//   } catch {
//     return `${DEFAULT_API_ORIGIN}/${value.replace(/^\/+/, "")}`
//   }
// }
