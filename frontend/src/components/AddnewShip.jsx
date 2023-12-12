import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Header from './Header';

const AddnewShip = () => {
  const [formData, setFormData] = useState({
    reference: '',
    receiverName: '',
    city: '',
    customerEmail: '',
    customerAddress: '',
    contactNumber: '',
    codAmount: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/addshipment', formData);
      // Add any additional logic you need after successful submission
      console.log('Form data submitted:', formData);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
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
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <h3>Shipment Entry</h3>
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="reference"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Reference
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="reference"
                            id="reference"
                            autoComplete="given-name"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="receiverName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Receiver Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="receiverName"
                            id="receiverName"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <select
                            id="city"
                            name="city"
                            autoComplete="country-name"
                            className="form-input"
                            onChange={handleChange}
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="customerEmail"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Customer Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="customerEmail"
                            name="customerEmail"
                            type="email"
                            autoComplete="email"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="customerAddress"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Customer Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="customerAddress"
                            id="customerAddress"
                            autoComplete="customer-address"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="contactNumber"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Contact Number
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="contactNumber"
                            id="contactNumber"
                            autoComplete="address-level2"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="codAmount"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          COD Amount
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="codAmount"
                            id="codAmount"
                            autoComplete="cod-amount"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Add Shipment
                 </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddnewShip;
