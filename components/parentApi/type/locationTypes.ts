// Location Types

export interface Country {
  id: number
  name: string
  iso_code: string
}

export interface City {
  id: number
  country_id: number
  name: string
}

export interface CountriesResponse {
  status: boolean
  message: string
  data: Country[]
}

export interface CitiesResponse {
  status: boolean
  message: string
  data: City[]
}

export interface CountriesApiResult {
  success: boolean
  data?: Country[]
  message?: string
  status?: number
}

export interface CitiesApiResult {
  success: boolean
  data?: City[]
  message?: string
  status?: number
}
