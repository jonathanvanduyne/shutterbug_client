import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { StaffViews } from "./StaffViews.js"
import { UserViews } from "./UserViews.js"

export const ApplicationViews = ({ token, setToken, staff, setStaff }) => {
  const is_staff = JSON.parse(localStorage.getItem('is_staff'))
  
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff} />} />
      <Route path="/register" element={<Register setToken={setToken} setStaff={setStaff} />} />
      <Route element={<Authorized token={token} staff={staff} />}>
        {is_staff === true ? (
          <Route path="*" element={<StaffViews setToken={setToken} setStaff={setStaff} />} />
        ) : (
          <Route path="*" element={<UserViews setToken={setToken} setStaff={setStaff} />} />
        )}
      </Route>
    </Routes>
  );
}

