import axios from "axios"
import { getApiBaseUrl } from "./url-utils"

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
})

api.interceptors.request.use(async (config) => {
  let token: string | undefined

  if (typeof window === "undefined") {
    const { cookies, headers } = await import("next/headers")
    const cookieStore = await cookies()
    token = cookieStore.get("go_elite_token")?.value
  } else {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("go_elite_token="))
      ?.split("=")[1]
  }

  config.params = {
    ...config.params,
  }

  const isFormData = config.data instanceof FormData

  if (!isFormData) {
    config.headers.set("Content-Type", "application/json")
  } else {
    config.headers.delete("Content-Type")
  }
  config.headers.set("Accept", "application/json")

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`)
  }

  return config
})

export default api
