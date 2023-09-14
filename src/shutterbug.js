import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import "./shutterbug.css"

export const Shutterbug = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [isShutterbugStaff, setIsShutterbugState] = useState(localStorage.getItem('is_staff'))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }

  const settingShutterbugStaff = (isStaff) => {
    localStorage.setItem('is_staff', isStaff)
    setIsShutterbugState(isStaff)
  }

  return <>
    <NavBar token={token} setToken={setToken} isStaff={JSON.parse(isShutterbugStaff)} setStaff={settingShutterbugStaff} />
    <ApplicationViews token={token} setToken={setToken} isStaff={JSON.parse(isShutterbugStaff)} setStaff={settingShutterbugStaff} />
  </>
}



