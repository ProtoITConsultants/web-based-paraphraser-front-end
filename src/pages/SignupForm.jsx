import { useState } from "react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
    };

    console.log("Signup Form Data:", formData);
  };

  return (
    <div
      className={`flex items-center justify-center w-full min-h-[calc(100dvh-156px)] ${
        darkMode ? "" : "bg-white"
      }`}
    >
      <div className="w-full overflow-hidden">
        <div className="flex">
          {/* Left side - Form */}
          <div className="flex-1 p-8 lg:p-12 xl:p-16">
            {/* Title */}
            <h1
              className={`text-3xl lg:text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-8`}
            >
              Create an account
            </h1>

            {/* Form */}
            <div className="space-y-6">
              {/* Name fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`${
                    darkMode ? "bg-[#17191C]" : "bg-gray-50"
                  } rounded-3xl p-4`}
                >
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full bg-transparent border-none outline-none ${
                      darkMode
                        ? "placeholder-gray-500 text-white"
                        : "placeholder-gray-400 text-gray-900"
                    }`}
                  />
                </div>
                <div
                  className={`${
                    darkMode ? "bg-[#17191C]" : "bg-gray-50"
                  } rounded-3xl p-4`}
                >
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`w-full bg-transparent border-none outline-none ${
                      darkMode
                        ? "placeholder-gray-500 text-white"
                        : "placeholder-gray-400 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              {/* Email field */}
              <div
                className={`${
                  darkMode ? "bg-[#17191C]" : "bg-gray-50"
                } rounded-3xl p-4`}
              >
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-transparent border-none outline-none ${
                    darkMode
                      ? "placeholder-gray-500 text-white"
                      : "placeholder-gray-400 text-gray-900"
                  }`}
                />
              </div>

              {/* Password field */}
              <div
                className={`${
                  darkMode ? "bg-[#17191C]" : "bg-gray-50"
                } rounded-3xl p-4`}
              >
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-transparent border-none outline-none ${
                      darkMode
                        ? "placeholder-gray-500 text-white"
                        : "placeholder-gray-400 text-gray-900"
                    } pr-8`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
                      darkMode
                        ? "text-gray-500 hover:text-gray-300"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sign up button */}
                <button
                  onClick={handleSubmit}
                  className="w-full border border-lime-400 cursor-pointet text-lime-400 font-semibold py-4 px-6 rounded-3xl transition-colors duration-200"
                >
                  Continue as Guest
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-lime-400 cursor-pointer hover:bg-lime-500 text-gray-900 font-semibold py-4 px-6 rounded-3xl transition-colors duration-200"
                >
                  Sign up
                </button>
              </div>

              {/* Google sign up button */}
              <button
                type="button"
                className={`w-full cursor-pointer ${
                  darkMode
                    ? "bg-[#17191C] border-gray-700 hover:bg-[#101214] text-gray-300"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                } border font-medium py-4 px-6 rounded-3xl transition-colors duration-200 flex items-center justify-center gap-3`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>

              {/* Login link */}
              <div className="text-center">
                <span
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Do you have an account?{" "}
                </span>
                <a
                  href="#"
                  className={`${
                    darkMode ? "text-lime-400" : "text-gray-900"
                  } font-medium hover:underline`}
                >
                  Login
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Image (hidden on smaller screens) */}
          <div className="hidden lg:block flex-1 relative">
            <div className="h-full bg-gradient-to-br from-blue-900 via-blue-800 to-amber-600 relative overflow-hidden rounded-4xl">
              {/* Abstract leaf pattern overlay */}
              <div className="absolute inset-0 opacity-80">
                <img
                  src="/Rectangle 34624674.png"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-amber-500/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
