import { createContext, useContext } from 'react'
import type { UseNavigateResult } from '@tanstack/react-router'

type ModuleContextValue = {
  navigate?: UseNavigateResult<string>
}

export const ModuleContext = createContext<ModuleContextValue | null>(null)

export function useModuleContext() {
  const context = useContext(ModuleContext)
  if (!context)
    throw new Error(
      'useModuleContext must be used within a ModuleContextProvider',
    )
  return context
}
