// import React from 'react'
// import CsvUploader from './CsvUploader';

// const Page = () => {
//     const sendDataToMongoDB = async (data) => {
//         try {
//           const response = await fetch('https://my-node-app-nsih.onrender.com/upload', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           });
//           const result = await response.json();
//           console.log(result);
//         } catch (error) {
//           console.error(error);
//         }
//       };
//   return (
//     <CsvUploader onDataUpload={sendDataToMongoDB} />
//   )
// }

// export default Page