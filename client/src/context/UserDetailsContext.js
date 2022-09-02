import React, { createContext, useContext, useMemo, useState} from "react"

const userDetailsContext = createContext(null)

export const UserDetailsProvider = ({ children }) => {
  const [value, setValue] = useState({})

  const memo = useMemo(() => [value, setValue], [value])

  return (
    <userDetailsContext.Provider value={memo}>
      {children}
    </userDetailsContext.Provider>
  )
}

export const useUserDetails = () => {
  return useContext(userDetailsContext)
}
