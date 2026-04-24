"use client"

import api from "@/lib/api-fetcher"
import type { AxiosError } from "axios"
import type { 
  CountriesResponse, 
  CitiesResponse,
  CountriesApiResult,
  CitiesApiResult
} from "../type/locationTypes"

/**
 * Fetch countries
 */
export async function getCountries(): Promise<CountriesApiResult> {
  try {
    const res = await api.get("/locations/countries")
    
    if (res.data.status && res.data.data) {
      return { success: true, data: res.data.data }
    } else {
      return { 
        success: false, 
        message: res.data.message || "Failed to load countries",
        status: res.status
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>
    
    let message = "Error loading countries"
    if (error.response?.data?.message) {
      message = error.response.data.message
    } else if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      message = typeof errors === 'string' 
        ? errors 
        : Object.values(errors).flat().join(", ")
    } else if (error.message) {
      message = error.message
    }
    
    const status = error.response?.status || 500

    return { success: false, message, status }
  }
}

/**
 * Fetch cities by country ID
 */
export async function getCities(countryId: number): Promise<CitiesApiResult> {
  try {
    const res = await api.get(`/locations/cities?country_id=${countryId}`)
    
    if (res.data.status && res.data.data) {
      return { success: true, data: res.data.data }
    } else {
      return { 
        success: false, 
        message: res.data.message || "Failed to load cities",
        status: res.status
      }
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; errors?: any }>
    
    let message = "Error loading cities"
    if (error.response?.data?.message) {
      message = error.response.data.message
    } else if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      message = typeof errors === 'string' 
        ? errors 
        : Object.values(errors).flat().join(", ")
    } else if (error.message) {
      message = error.message
    }
    
    const status = error.response?.status || 500

    return { success: false, message, status }
  }
}
