import { Link } from "react-router-dom";
import { getUsers } from "../../../managers/users"
import { useEffect, useState } from 'react';

export const AuthorUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(userArray => setUsers(userArray));
  }, []);

  return (

    <>
      <h2 className="userList">List of Users</h2>

      <article className="users column">
        {users
          .sort((a, b) => a.full_name.localeCompare(b.full_name))
          .map((user) => (
            <section className="user" key={user.id}>
              <div>================================================</div>
              <div className="userName">Username: {user?.user?.username}</div>
              <div className="userfullName">Full Name: <Link to={`/users/${user.id}`}>{user.full_name}</Link></div>
              <div className="userEmail">Email: {user?.user?.email} </div>
            </section>
          ))}
      </article>
    </>
  )
}