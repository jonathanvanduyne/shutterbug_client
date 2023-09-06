import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"


export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [staff, setStaffState] = useState(localStorage.getItem('staff'))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }
  const setStaff = (newStaff) => {
    localStorage.setItem('staff', newStaff)
    setStaffState(newStaff)
  }

  return <>
    <NavBar token={token} setToken={setToken} />
    <ApplicationViews token={token} setToken={setToken} staff={JSON.parse(staff)} setStaff={setStaff}/>
  </>
}
