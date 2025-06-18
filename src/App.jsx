import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [workersPerPage, setWorkersPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgXW7AZ7vk6eSudddYFiqpRuivgVdYPErTAb6IoG3lkcAkzFBF2GOtAmg4RDjqjUTqIGYcUTzbUuf6-NXIhPYbleYV2BYScPZJVUGRxQ5DNkPDzmwQuLEjV02wbm0GjPh-26sdQ2-r_oUPahAN0AEAa4b0hynp-bfSoq4dh5muCwewmTWZEyS9uwQFOyJfvzgg-Od66HBhu692qtrfP55mF4eyx51Uw00r1jnHTjXkcidGV4fQp0esrcMdEpwqznLgiam_KZCvk5FGZEQv_6eTcAcjjMg&lib=MSsMXTfpaQG2eJAhRaZbAqVzNgcc3QnnH"
    )
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setWorkers(dataArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(workers.length / workersPerPage);
  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const currentWorkers = workers.slice(indexOfFirstWorker, indexOfLastWorker);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSelectChange = (e) => {
    setWorkersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#fcfcf8] font-sans p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#0d151c]">
        Workers Table
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-4">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-center text-gray-600 font-medium">
            Loading data from my own API, it will take a few seconds... 🐌
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="w-full max-w-6xl bg-white rounded-xl shadow p-6">
              <div className="mb-4">
                <p className="text-2xl font-semibold text-[#0d151c]">
                  Data Table with Lazy Loading
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left border border-gray-200 rounded-lg">
                  <thead className="bg-slate-50">
                    <tr>
                      {["ID", "Workers", "Days Worked", "Salary", "Phone", "Position"].map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-sm font-semibold text-[#0d151c] border-b border-gray-200"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentWorkers.map((worker) => (
                      <tr key={worker.ID} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{worker.ID}</td>
                        <td className="px-4 py-2">{worker.Workers}</td>
                        <td className="px-4 py-2">{worker["Days Worked"]}</td>
                        <td className="px-4 py-2">{worker.Salary}</td>
                        <td className="px-4 py-2">{worker.Phone}</td>
                        <td className="px-4 py-2">{worker.Position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 p-4 rounded-lg">
                <label className="flex items-center text-sm text-gray-700">
                  Show per page:{" "}
                  <select
                    className="ml-2 border border-gray-300 rounded p-1"
                    value={workersPerPage}
                    onChange={handleSelectChange}
                  >
                    {[1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 rounded bg-grey-500 disabled:opacity-50 hover:bg-gray-300 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 rounded bg-grey-500 disabled:opacity-50 hover:bg-gray-300 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;