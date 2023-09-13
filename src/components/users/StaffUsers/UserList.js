import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  getUsers,
  updateDjangoUser,
} from '../../../managers/users';
import './userList.css'; // Import your CSS file

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUserArray, setCurrentUserArray] = useState([]);
  const currentUser = currentUserArray[0];
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const userArray = await getUsers();
      setUsers(userArray);
      const current = await getCurrentUser();
      setCurrentUserArray(current);
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
      await updateDjangoUser(userId, updatedUser.user);
      getData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleToggleStaff = async (userId) => {
    const updatedUser = { ...users.find((user) => user.id === userId) };
    updatedUser.is_staff = !updatedUser.user.is_staff;

    try {
      await updateDjangoUser(userId, updatedUser);
      getData();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="user-list-container">
      <div className="header-links">
        <Link to="/users" className="user-list-link">
          List of Users
        </Link>
        <Link to="/flaggedPosts" className="flagged-posts-link">
          Flagged Posts
        </Link>
      </div>

      <div className="user-list">
        {users
          .sort((a, b) => a.full_name.localeCompare(b.full_name))
          .map((user) => (
            <div className="user-card" key={user.id}>
              <hr className="divider-line" />
              <div className="user-info">
                <div className="user-username">Username: {user?.user?.username}</div>
                <div className="user-fullname">
                  Full Name: <Link to={`/users/${user.id}`} className="user-link">
                    {user.full_name}
                  </Link>
                </div>
                <div className="user-email">Email: {user?.user?.email}</div>
              </div>
              {currentUser && currentUser.id === user.id ? null : (
                <div className="user-active">
                  <span>Active:</span>
                  <input
                    name={`active_${user.id}`}
                    type="checkbox"
                    checked={user?.user?.is_active}
                    onChange={() => handleToggleActive(user.id)}
                  />
                </div>
              )}
              {currentUser && currentUser.id === user.id ? null : (
                <div className="user-role">
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
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
