import axios from "axios"

import { getSubdomain } from "@/utils/subdomain"

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_SERVER,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const subdomain = getSubdomain()
    if (subdomain) {
      config.headers["X-Subdomain"] = subdomain
    }
  }
  return config
})
