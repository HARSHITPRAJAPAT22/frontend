import { SignupType } from "@harshit2212/common";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Prevent multiple requests

  async function sendRequest() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInput
      );

      const jwt = `Bearer ${response.data.jwt}`;
      const userName = response.data.user.name;
      const userId = response.data.user.id;
      localStorage.setItem("token", jwt);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full md:w-3/4 lg:w-2/3 p-6 sm:p-10 flex flex-col items-center bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">
          {type === "signup" ? "Sign Up" : "Sign In"}
        </h1>

        <div className="w-full max-w-sm space-y-4">
          {type === "signup" && (
            <NamedInput
              type="text"
              placeholder="Enter Your Name"
              value={postInput.name}
              onChange={(e) => setPostInput({ ...postInput, name: e.target.value })}
            />
          )}

          <NamedInput
            type="email"
            placeholder="Enter Your Email"
            value={postInput.email}
            onChange={(e) => setPostInput({ ...postInput, email: e.target.value })}
          />

          <NamedInput
            type="password"
            placeholder="Password"
            value={postInput.password}
            onChange={(e) => setPostInput({ ...postInput, password: e.target.value })}
          />

          <button
            onClick={sendRequest}
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : type === "signup" ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link to={type === "signup" ? "/signin" : "/signup"} className="text-blue-900 font-semibold">
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// NamedInput Component
interface NamedInputType {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
}

function NamedInput({ placeholder, onChange, value, type }: NamedInputType) {
  return (
    <div>
      <input
        onChange={onChange}
        value={value}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
