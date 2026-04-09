"use client"

import { useState, useEffect, useCallback } from "react"

interface FormData {
  photoUploaded: boolean
  basicInfo: {
    firstName: string
    lastName: string
    dateOfBirth: Date | undefined
    gender: string
    nationality: string
    email: string
  }
  sports: {
    sport: string
    role: string
    coachingTitles: string[]
  }
  experience: {
    years: string
    education: string
    history: string
  }
  credentials: {
    files: any[]
  }
  philosophy: {
    text: string
  }
}

export function useCoachProfileSteps() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    photoUploaded: false,
    basicInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      gender: "",
      nationality: "",
      email: "",
    },
    sports: {
      sport: "",
      role: "",
      coachingTitles: [],
    },
    experience: {
      years: "",
      education: "",
      history: "",
    },
    credentials: {
      files: [],
    },
    philosophy: {
      text: "",
    },
  })

  // Update step based on form completion
  useEffect(() => {
    let newStep = 1

    if (formData.photoUploaded) {
      newStep = 2
    }

    const basicInfoComplete = 
      formData.basicInfo.firstName &&
      formData.basicInfo.lastName &&
      formData.basicInfo.dateOfBirth &&
      formData.basicInfo.gender &&
      formData.basicInfo.nationality &&
      formData.basicInfo.email

    if (basicInfoComplete) {
      newStep = 3
    }

    const sportsComplete = 
      formData.sports.sport &&
      formData.sports.role &&
      formData.sports.coachingTitles.length > 0

    if (sportsComplete) {
      newStep = 4
    }

    const experienceComplete = 
      formData.experience.years &&
      formData.experience.education &&
      formData.experience.history

    if (experienceComplete) {
      newStep = 5
    }

    const credentialsComplete = formData.credentials.files.length > 0

    if (credentialsComplete) {
      newStep = 6
    }

    setCurrentStep(newStep)
  }, [
    formData.photoUploaded,
    formData.basicInfo.firstName,
    formData.basicInfo.lastName,
    formData.basicInfo.dateOfBirth,
    formData.basicInfo.gender,
    formData.basicInfo.nationality,
    formData.basicInfo.email,
    formData.sports.sport,
    formData.sports.role,
    formData.sports.coachingTitles.length,
    formData.experience.years,
    formData.experience.education,
    formData.experience.history,
    formData.credentials.files.length,
  ])

  // Update functions for each section - use useCallback to prevent recreation
  const updatePhotoUploaded = useCallback((uploaded: boolean) => {
    setFormData(prev => ({ ...prev, photoUploaded: uploaded }))
  }, [])

  const updateBasicInfo = useCallback((info: Partial<FormData["basicInfo"]>) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...info }
    }))
  }, [])

  const updateSports = useCallback((sports: Partial<FormData["sports"]>) => {
    setFormData(prev => ({
      ...prev,
      sports: { ...prev.sports, ...sports }
    }))
  }, [])

  const updateExperience = useCallback((experience: Partial<FormData["experience"]>) => {
    setFormData(prev => ({
      ...prev,
      experience: { ...prev.experience, ...experience }
    }))
  }, [])

  const updateCredentials = useCallback((files: any[]) => {
    setFormData(prev => ({
      ...prev,
      credentials: { ...prev.credentials, files }
    }))
  }, [])

  const updatePhilosophy = useCallback((text: string) => {
    setFormData(prev => ({
      ...prev,
      philosophy: { ...prev.philosophy, text }
    }))
  }, [])

  return {
    currentStep,
    formData,
    updatePhotoUploaded,
    updateBasicInfo,
    updateSports,
    updateExperience,
    updateCredentials,
    updatePhilosophy,
  }
}
