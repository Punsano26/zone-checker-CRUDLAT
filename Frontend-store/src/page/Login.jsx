import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
    const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value}));
  };

  const {login, user:loggedUser} = useAuthContext();
  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser])

  const navigate = useNavigate();

 const handleSubmit = async () => {
    try {
        const currentUser = await AuthService.login(
            user.username,
            user.password
        );
        console.log(currentUser);
        if (currentUser.status === 200) {
            login(currentUser.data);
            Swal.fire({
                icon: "success",
                title: "User login successfully",
                text: "Login success now!",
                timer: 2000,
            });
            setUser({ username: "", password: "" });
            navigate("/");
        }
        
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.response?.data?.message || error.message,
            timer: 2000,
        });
    }
 };
  return (
    <div className="flex justify-center items-center mt-16">

    <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold pb-5">Login</h2>

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
          onChange={handleChange}
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
          onChange={handleChange}
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
          Login
        </button>
        <div className="flex items-center text-sm">
          <p>You haven't an account?</p>
          <a href="/register" className="underline cursor-pointer ml-1">
            Register
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
