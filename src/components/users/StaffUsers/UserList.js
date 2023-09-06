import { Link } from "react-router-dom";
import { getUsers, updateUser } from "../../../managers/users";
import { useEffect, useState } from 'react';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [activatedUser, setActivatedUser] = useState(null); // Initialize as null

  const getData = () => {
    getUsers().then(userArray => setUsers(userArray));
  }

  useEffect(() => {
    getData();
  }, []);

  const toggleUserStatus = (userId, active) => {
    const updatedUser = { ...users.find(user => user.id === userId) };
    updatedUser.active = !active;

    updateUser(userId, updatedUser)
      .then(() => {
        getData();
      });
  };

  return (
    <>
      <h2 className="userList title">List of Users</h2>

      <article className="users column">
        {users
          .sort((a, b) => a.full_name.localeCompare(b.full_name))
          .map((user) => (
            <section className="user" key={user.id}>
              <div>================================================</div>
              <div className="userName">Username: {user?.user?.username}</div>
              <div className="userfullName">
                Full Name: <Link to={`/users/${user.id}`}>{user.full_name}</Link>
              </div>
              <div className="userEmail">Email: {user?.user?.email} </div>
            </section>
          ))}
      </article>
    </>
  );
}
