import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const isUserExists = users.some((u) => u.username === form.username);

    if (isUserExists) {
      setIsError(true);
      setMessage("Bu ulanyjy eýýäm bar!");
      return;
    }

    const newUsers = [...users, form];
    localStorage.setItem("users", JSON.stringify(newUsers));
    setIsError(false);
    setMessage("Hasaba alyndy! Indi ulgama girip bilersiňiz.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage(null); // Clear old messages
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/signup", {
  //       ...form,
  //       type: "admin", // default user role if needed
  //     });
  //     setIsError(false);
  //     setMessage("Hasaba alyndy! Indi ulgama girip bilersiňiz.");
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 1500);
  //   } catch (err) {
  //     setIsError(true);
  //     setMessage(
  //       err?.response?.data?.message ||
  //         "Ýalňyşlyk ýüze çykdy! Täzeden synanyşyň."
  //     );
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
          Hasaba alyş
        </h2>

        {message && (
          <div
            className={`mb-4 text-center text-sm px-3 py-2 rounded-md ${
              isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Ady
          </label>
          <input
            type="text"
            value={form.firstname}
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Familiýasy
          </label>
          <input
            type="text"
            value={form.lastname}
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Acar sözi
          </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Paroly
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 rounded-md hover:from-green-600 hover:to-blue-600 transition"
        >
          Hasaba al
        </button>
      </form>
    </div>
  );
}
