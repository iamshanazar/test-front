import { useEffect, useState } from "react";

type UserType = {
  firstname: string;
  lastname: string;
  username: string;
  password?: string; // password bardygyny bildirýär, ýöne biz ony ulanjak däldiris
};

export default function User() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const usersString = localStorage.getItem("users");
    if (usersString) {
      try {
        const usersData: UserType[] = JSON.parse(usersString);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        setUsers([]);
      }
    }
  }, []);

  if (!users.length) {
    return <div className="text-center mt-10 text-gray-600">Ýüklenýär...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-600 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-6xl h-[80vh] flex flex-col">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6 flex-shrink-0">
          Ulanyjylar Maglumatlary
        </h2>

        <div className="overflow-x-auto overflow-y-auto flex-grow border border-gray-200 rounded-lg">
          <table className="w-full min-w-[600px] text-sm text-left text-gray-700">
            <thead className="text-xs text-white uppercase bg-teal-600 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">№</th>
                <th className="px-4 py-3">Ulanyjy Ady</th>
                <th className="px-4 py-3">Familiýasy</th>
                <th className="px-4 py-3">Doly Ady</th>
                <th className="px-4 py-3">Acar Sozi (Username)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.firstname || "—"}</td>
                  <td className="px-4 py-3">{user.lastname || "—"}</td>
                  <td className="px-4 py-3">
                    {(user.firstname || "") + " " + (user.lastname || "")}
                  </td>
                  <td className="px-4 py-3">{user.username || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
