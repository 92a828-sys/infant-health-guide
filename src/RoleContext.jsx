import { createContext, useContext, useEffect, useState } from 'react'

const RoleContext = createContext({ role: 'parent', setRole: () => {} })

const STORAGE_KEY = 'ihg_role'

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    if (typeof window === 'undefined') return 'parent'
    return localStorage.getItem(STORAGE_KEY) || 'parent'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, role)
  }, [role])

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}
