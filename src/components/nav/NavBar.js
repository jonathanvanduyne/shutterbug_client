import "./NavBar.css"
import { StaffNavBar } from "./StaffNavBar.js"
import { UserNavBar } from "./UserNavBar.js"

export const NavBar = ({ token, setToken }) => {
  const is_staff = JSON.parse(localStorage.getItem('is_staff'))
  
  if (is_staff) {
    return <StaffNavBar token={token} setToken={setToken} />
  }
  else {
    return <UserNavBar token={token} setToken={setToken} />
  }
}