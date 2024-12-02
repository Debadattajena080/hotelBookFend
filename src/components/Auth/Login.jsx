import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { setJwtToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(loginData);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, loginData)
      .then((response) => {
        const token = response.data.token;

        // Save the token to localStorage
        localStorage.setItem("token", token);
        setJwtToken(token);

        toast.success(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 border bg-white sm:w-1/3 mx-auto mt-4">
      <div className="mx-auto">
        <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Welcome Back!
        </h2>
      </div>

      <div className="mt-10 ">
        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-900">
              Enter Email or Phone
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter email"
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                onChange={handleChange}
              />
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
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Sign in
            </button>
          </div>

          <div>
            <span>
              New user ?{" "}
              <span
                onClick={() => navigate("/Signup")}
                className="text-blue-700 cursor-pointer font-semibold hover:underline "
              >
                Register
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
