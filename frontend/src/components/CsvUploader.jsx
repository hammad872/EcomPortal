import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvUploader = ({ onDataUpload }) => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };

  const sendDataToMongoDB = () => {
    onDataUpload(data);
  };

  return (
    <div>


<div className="mt-2">
                        {isAdminLoggedIn === "Admin" ? (
                          <>
                            <select
                              id="client"
                              name="client"
                              className="form-input"
                              onChange={handleChange}
                              value={`${formData.client}-${formData.clientName}`}
                            >
                              <option>Select a client</option>
                              {FilteredAdmin.map((employee) => (
                                <option
                                  key={employee.id}
                                  value={`${employee.id}-${employee.username}`}
                                >
                                  {employee.username}
                                </option>
                              ))}
                            </select>
                          </>
                        ) : (
                          <>
                            <input
                              id="client"
                              name="client"
                              defaultValue={userData.userInfo._id}
                              className="form-control"
                              onChange={handleChange}
                              style={{ display: "none" }}
                            />

                            <input
                              id="clientName"
                              name="clientName"
                              defaultValue={userData.userInfo.username}
                              className="form-control"
                              onChange={handleChange}
                              style={{ display: "none" }}
                            />
                          </>
                        )}
                      </div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {data.length ? (
        <>
          <button onClick={sendDataToMongoDB}>Send Data to MongoDB</button>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.Name}</td>
                  <td>{row.Email}</td>
                  <td>{row.Subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default CsvUploader;
