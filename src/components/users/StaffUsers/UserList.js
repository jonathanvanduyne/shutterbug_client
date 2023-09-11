import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, updateUser } from '../../../managers/users';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUserArray, setCurrentUserArray] = useState([]);
  const currentUser = currentUserArray[0];
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const userArray = await getUsers();
      setUsers(userArray);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleToggleActive = async (userId) => {
    const updatedUser = { ...users.find((user) => user.id === userId) };
    updatedUser.user.is_active = !updatedUser.user.is_active;

    try {
      await updateUser(userId, updatedUser);
      getData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleToggleStaff = async (userId) => {
    const updatedUser = { ...users.find((user) => user.id === userId) };
    updatedUser.is_staff = !updatedUser.user.is_staff;

    try {
      await updateUser(userId, updatedUser);
      getData();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
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
              <div className="adminOrStaffRadioButtons">
                <p>Active:</p>
                <input
                  type="checkbox"
                  checked={user?.user?.is_active}
                  onChange={() => handleToggleActive(user.id)}
                />
              </div>
              <div className="admin-buttons">
                <label>
                  <input
                    type="radio"
                    name={`role_${user.id}`}
                    value="shutterbug"
                    checked={!user.user.is_staff}
                    onChange={() => handleToggleStaff(user.id)}
                  />
                  Shutterbug
                </label>

                <label>
                  <input
                    type="radio"
                    name={`role_${user.id}`}
                    value="staff"
                    checked={user?.user?.is_staff}
                    onChange={() => handleToggleStaff(user.id)}
                  />
                  Staff
                </label>
              </div>
            </section>
          ))}
      </article>
    </>
  );
};
