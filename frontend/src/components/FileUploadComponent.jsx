import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [file, setFile] = useState(null);
  
    useEffect(() => {
      // Fetch clients with IDs from the server when the component mounts
      const fetchClients = async () => {
        try {
          const response = await axios.get('http://localhost:3001/getregister');
          setClients(response.data);
        } catch (error) {
          console.error('Error fetching clients:', error);
        }
      };
  
      fetchClients();
    }, []);
  
    const handleClientChange = (event) => {
      setSelectedClient(event.target.value);
    };
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
        try {
          if (!selectedClient) {
            alert('Please select a client');
            return;
          }
          if (!file) {
            alert('Please select a file');
            return;
          }
      
          const selectedClientObject = clients.find(client => client.username === selectedClient);
          if (!selectedClientObject) {
            alert('Invalid client selected');
            return;
          }
      
          const formData = new FormData();
          const concatenatedFileName = `${selectedClientObject.id}_${file.name}`;
          formData.append('client', selectedClientObject.id); // Append client ID first
          formData.append('clientName', selectedClientObject.username);
          formData.append('file', file, concatenatedFileName);
      
          // Upload file to the server
          const response = await axios.post('http://localhost:3001/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
          console.log('File uploaded successfully', response.data);
        } catch (error) {
          console.error('Error uploading file', error);
        }
      };
  
    return (
      <div>
        <label htmlFor="client">Select Client:</label>
        <select id="client" value={selectedClient} onChange={handleClientChange}>
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.username}>{client.username}</option>
          ))}
        </select>
  
        <br />
  
        <input type="file" onChange={handleFileChange} />
  
        <br />
  
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  };
  

export default FileUploadComponent;
