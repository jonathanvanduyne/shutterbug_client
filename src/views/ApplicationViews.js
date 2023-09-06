import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { StaffViews } from "./StaffViews.js"
import { AuthorViews } from "./AuthorViews.js"

export const ApplicationViews = ({ token, setToken, staff, setStaff }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} setStaff={setStaff} />} />
      <Route path="/register" element={<Register setToken={setToken} setStaff={setStaff} />} />
      <Route element={<Authorized token={token} staff={staff} />}>
        {staff === true ? (
          <Route path="*" element={<StaffViews />} />
        ) : (
          <Route path="*" element={<AuthorViews />} />
        )}
      </Route>
    </Routes>
  );
}

