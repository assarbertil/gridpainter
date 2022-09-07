import { createContext, useContext, useMemo, useState } from "react"

// The context object
// Contains the provider
const userDetailsContext = createContext(null)

// React component that provides the context to child components
export const UserDetailsProvider = ({ children }) => {
  const [value, setValue] = useState({}) // The value of the context

  // Used to prevent unneccessary re-renders
  const memo = useMemo(() => [value, setValue], [value])

  return (
    <userDetailsContext.Provider value={memo}>
      {children}
    </userDetailsContext.Provider>
  )
}

// React hook that returns the context value
// Example: const [userDetails, setUserDetails] = useUserDetails()
export const useUserDetails = () => {
  return useContext(userDetailsContext)
}
