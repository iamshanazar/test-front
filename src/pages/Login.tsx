import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(""); // Previous errors clear

    if (!form.name || !form.password) {
      setErrorMsg("Please enter username and password.");
      return;
    }

    setLoading(true); // Start loading

    // 👇 Bu ýerde usersRaw getirilýär
    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const user = users.find(
      (item) => item.username === form.name && item.password === form.password
    );
    console.log(user, "user in function", form.name, form.password);

    if (user) {
      setLoading(false); // Stop loading
      console.log("dogry");
      navigate("/");
    } else {
      setLoading(false); // Stop loading
      setErrorMsg("Ulanyjy tapylmady ýa-da parol nädogry.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-cyan-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Ulgama gir
        </h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center font-medium">
            {errorMsg}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Ulanyjy ady
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="relative mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Açar sözi
          </label>

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`w-full font-semibold py-2 rounded-md transition text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          }`}
        >
          {loading ? "Giriş edilýär..." : "Ulgama gir"}
        </button>
      </form>
    </div>
  );
}
