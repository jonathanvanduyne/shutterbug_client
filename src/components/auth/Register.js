import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";

export const Register = ({ setToken, setStaff }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const [showPasswordDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        profile_image_url: "",
      };

      registerUser(newUser).then((res) => {
        if ("valid" in res && res.valid) {
          setToken(res.token);
          setStaff(res.staff);
          navigate("/");
        }
      });
    } else {
      setShowDialog(true);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <form className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md w-full lg:w-1/2" onSubmit={handleRegister}>
        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800 dark:text-white">Rare Publishing</h1>
        <p className="text-lg text-center text-gray-500 dark:text-gray-400 mb-8">Create an account</p>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 dark:text-white text-sm font-medium mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            ref={firstName}
            placeholder="First Name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 dark:text-white text-sm font-medium mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            ref={lastName}
            placeholder="Last Name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 dark:text-white text-sm font-medium mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            ref={username}
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-white text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            ref={email}
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 dark:text-white text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            ref={password}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="verifyPassword" className="block text-gray-700 dark:text-white text-sm font-medium mb-2">
            Verify Password
          </label>
          <input
            id="verifyPassword"
            type="password"
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            placeholder="Verify Password"
            ref={verifyPassword}
          />
        </div>
        {showPasswordDialog && (
          <div className="text-red-500 dark:text-red-400 mb-4">Password fields must be matching</div>
        )}
        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 dark:text-white text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            placeholder="Tell us about yourself..."
            ref={bio}
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
          <Link
            to="/login"
            className="px-4 py-2 text-blue-500 hover:text-blue-600 rounded-md focus:outline-none focus:text-blue-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};
