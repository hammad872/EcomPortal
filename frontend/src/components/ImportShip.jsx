import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';

const ImportShip = ({ onDataUpload }) => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const sendDataToMongoDB = () => {
    axios.post('http://localhost:3001/upload-csv', { data: csvData })
      .then(response => {
        console.log(response.data);
        onDataUpload(csvData);
      })
      .catch(error => {
        console.error('Error sending data to MongoDB:', error);
      });
  };

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-lg-2">
          <Navbar />
        </div>
        <div className="col-lg-10 p-5" style={{}}>
          <div
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              borderRadius: '30px',
              padding: 10,
            }}
          >
            <h3>Import Shipment</h3>
            <div>
              <input type="file" accept=".csv" onChange={handleFileUpload} />

              {csvData.length ? (
                <>
                  <button onClick={sendDataToMongoDB}>Send Data to MongoDB</button>
                  <p>Data will be sent to the DataGrid component.</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportShip;
