import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [workersPerPage, setWorkersPerPage] = useState(5); // Dynamic selector

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

  // Pagination logic
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
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div>
      <h1>Workers Table</h1>

      {loading ? (
        <div className="loader-container">
          <div className="crazy-loader"></div>
          <p>Loading data from my own API, it will be many seconds... 🐌</p>
        </div>
      ) : (
        <>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Workers</th>
                <th>Days Worked</th>
                <th>Salary</th>
                <th>Phone</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {currentWorkers.map((worker) => (
                <tr key={worker.ID}>
                  <td>{worker.ID}</td>
                  <td>{worker.Workers}</td>
                  <td>{worker["Days Worked"]}</td>
                  <td>{worker.Salary}</td>
                  <td>{worker.Phone}</td>
                  <td>{worker.Position}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ margin: "10px" }}>
            <label>
              Show per page:{" "}
              <select value={workersPerPage} onChange={handleSelectChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </label>
          </div>

          <div style={{ marginTop: "20px" }}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
              ◀ Prev
            </button>
            <span style={{ margin: "0 15px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;