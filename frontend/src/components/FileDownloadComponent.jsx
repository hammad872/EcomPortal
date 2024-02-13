import React, { useState } from 'react';
import axios from 'axios';

const FileDownloadComponent = () => {
    const handleDownload = () => {
        axios.get('/download', {
          responseType: 'blob'
        })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.csv');
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error('Error downloading file:', error);
        });
      };
    
      return (
        <div>
          <button onClick={handleDownload}>Download</button>
        </div>
      );
    };
  

export default FileDownloadComponent;
