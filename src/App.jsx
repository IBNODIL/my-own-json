import React, { useState, useEffect } from "react";

function App() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgXW7AZ7vk6eSudddYFiqpRuivgVdYPErTAb6IoG3lkcAkzFBF2GOtAmg4RDjqjUTqIGYcUTzbUuf6-NXIhPYbleYV2BYScPZJVUGRxQ5DNkPDzmwQuLEjV02wbm0GjPh-26sdQ2-r_oUPahAN0AEAa4b0hynp-bfSoq4dh5muCwewmTWZEyS9uwQFOyJfvzgg-Od66HBhu692qtrfP55mF4eyx51Uw00r1jnHTjXkcidGV4fQp0esrcMdEpwqznLgiam_KZCvk5FGZEQv_6eTcAcjjMg&lib=MSsMXTfpaQG2eJAhRaZbAqVzNgcc3QnnH")
      .then((response) => response.json())
      .then((data) => {
        console.log("Raw API response:", data);
        const dataArray = Array.isArray(data) ? data : [data];
        setWorkers(dataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Workers Table</h1>
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
          {workers.map((worker) => (
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
    </div>
  );
}

export default App;