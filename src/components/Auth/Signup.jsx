import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const { setJwtToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, signupData)
      .then((response) => {
        toast.success(response.data.message);
        const token = response.data.token;
        localStorage.setItem("token", token);
        setJwtToken(token);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 border bg-white sm:w-1/3 mx-auto">
      <div>
        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          <div>
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-900"
              >
                Enter First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  required
                  autoComplete="firstName"
                  placeholder="Enter First Name"
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-900"
              >
                Enter Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="lastName"
                  required
                  autoComplete="lastName"
                  placeholder="Enter Last Name"
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-900">
              Enter Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter Your Email"
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-900"
              >
                Enter Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  required
                  placeholder="Enter Phone Number"
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2 ">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter password"
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>

          <div>
            <span>
              Already have an account ?
              <span
                onClick={() => navigate("/login")}
                className="text-blue-700 cursor-pointer font-semibold ml-2 hover:underline "
              >
                Login
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
