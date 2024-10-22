import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handdleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };
  const handleSubmit = async () => {
    console.log(AuthService.register());
    try {
      const register = await AuthService.register(
        user.username,
        user.email,
        user.password
      );
      if (register.status === 200) {
        Swal.fire({
          title: "User Registration",
          text: register.data.message,
          icon: "success",
        });
        setUser({  username: "",email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "User Registered error",
        text: error.response ? error.response.data.message : "Unknown error",
        icon: "error",
        timer: 1500,
      });
    }
  };
  return (
    <div className="flex justify-center items-center mt-16">
      <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold pb-5">Register</h2>
      
        <div className="mb-4">
          <label for="name" className="block mb-2 text-sm font-medium">
            Your username
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Andrew Jackson"
            required
            name="username"
            onChange={handdleChange}
          />
        </div>
        <div className="mb-4">
          <label for="email" className="block mb-2 text-sm font-medium">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="andrew@mail.com"
            required
            name="email"
            onChange={handdleChange}
          />
        </div>
        <div className="mb-4">
          <label for="password" className="block mb-2 text-sm font-medium">
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="*********"
            required
            name="password"
            onChange={handdleChange}
          />
        </div>
        <div>
          <p className="text-red-500 pb-5"></p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleSubmit}
            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
          >
            Register
          </button>
          <div className="flex items-center text-sm">
            <p>Already have an account?</p>
            <a href="/login" className="underline cursor-pointer ml-1">
              Sign in
            </a>
          </div>
        </div>
      
    </div>
    </div>
    
  );
};

export default Register;
