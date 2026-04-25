"use client"

import { createContext, useContext, ReactNode } from "react"

interface ProgramUpdateContextType {
  onProgramUpdated?: () => void
}

const ProgramUpdateContext = createContext<ProgramUpdateContextType>({})

export function ProgramUpdateProvider({ 
  children, 
  onProgramUpdated 
}: { 
  children: ReactNode
  onProgramUpdated?: () => void 
}) {
  return (
    <ProgramUpdateContext.Provider value={{ onProgramUpdated }}>
      {children}
    </ProgramUpdateContext.Provider>
  )
}

export function useProgramUpdate() {
  return useContext(ProgramUpdateContext)
}
