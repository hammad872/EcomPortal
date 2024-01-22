import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';

const ImportShip = ({ onDataUpload }) => {
  const userData = JSON.parse(localStorage.getItem('loginToken'));
  const isAdminLoggedIn = userData.userInfo.role;
  const [employeeName, setEmployeeName] = useState([]);
  const [formData, setFormData] = useState({
    parcel: 'In Transit',
    reference: '',
    receiverName: '',
    productName: '',
    client: isAdminLoggedIn === 'Admin' ? '' : userData.userInfo._id,
    clientName: userData.userInfo.username,
    city: 'United States',
    orderNumber: '',
    customerEmail: '',
    orderID: '',
    customerAddress: '',
    contactNumber: '',
    codAmount: '',
  });
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/getregister')
      .then((employeeNameResponse) => {
        setEmployeeName(employeeNameResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching shipment data:', error);
      });
  }, []);

  const FilteredAdmin = employeeName.filter((item) => item.role === 'Client');

  const handleClientSelection = (value) => {
    const [selectedId, selectedUsername] = value.split('-');
    const slugIsHere =
      FilteredAdmin.find((employee) => employee.id === selectedId)?.slug || '';

    setFormData((prevFormData) => ({
      ...prevFormData,
      client: selectedId,
      clientName: selectedUsername,
      slugName: slugIsHere,
    }));
  };

  const handleFileUpload = (e) => {
    const { name, value } = e.target;

    if (name === 'client') {
      handleClientSelection(value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const sendDataToMongoDB = () => {
    axios
      .post('http://localhost:3001/upload-csv', { data: csvData })
      .then((response) => {
        console.log(response.data);
        onDataUpload(csvData);
      })
      .catch((error) => {
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
              <div className="mt-2">
                {isAdminLoggedIn === 'Admin' ? (
                  <>
                    <select
                      id="client"
                      name="client"
                      className="form-input"
                      onChange={(e) => handleFileUpload(e)}
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
                      onChange={(e) => handleFileUpload(e)}
                      style={{ display: 'none' }}
                    />

                    <input
                      id="clientName"
                      name="clientName"
                      defaultValue={userData.userInfo.username}
                      className="form-control"
                      onChange={(e) => handleFileUpload(e)}
                      style={{ display: 'none' }}
                    />
                  </>
                )}
              </div>
              <input type="file" accept=".csv" onChange={(e) => handleFileUpload(e)} />

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
