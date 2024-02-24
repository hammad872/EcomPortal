const axios = require("axios");
const { createAuthHeadersGrov,createAuthHeadersLuci, createAuthHeadersOstro,  calculateWaitTimeGrov, calculateWaitTimeLuci, calculateWaitTimeOstro, sleepOstro, sleepGrov, sleepLuci } = require("./utils");
const ShipmentModel = require("../models/Shipment");
require("dotenv").config(); 


setInterval(() => {
  fetchAndUpdateOrdersToShipmentGrov()
}, 10000);
setInterval(() => {
  fetchAndUpdateOrdersToShipmentOstro()
}, 10000);
setInterval(() => {
  fetchAndUpdateOrdersToShipmentLuci()
}, 10000);



async function fetchAndUpdateOrdersToShipmentGrov() {
  try {
    let hasMoreOrders = true;
    let page = 1;
    const maxRetries = 3;

    while (hasMoreOrders) {
      const url = `https://${process.env.SHOP_STORE_URL_GROV}/admin/api/${process.env.SHOP_API_VERSION_GROV}/orders.json`;

      const authHeaders = createAuthHeadersGrov(url, "GET");

      let retryCount = 0;
      let response;
      while (retryCount < maxRetries) {
        try {
          response = await axios.get(url, {
            headers: authHeaders,
          });
          break;
        } catch (error) {
          if (error.response && error.response.status === 430) {
            // Rate limit exceeded, wait for some time before retrying
            const waitTime = calculateWaitTimeGrov(retryCount);
            console.log(
              `Rate limit exceeded. Retrying in ${waitTime} milliseconds...`
            );
            await sleepGrov(waitTime);
            retryCount++;
          } else {
            // Other types of errors, log and handle accordingly
            console.error("Error fetching orders from Shopify API:", error);
            throw error;
          }
        }
      }

      const orders = response.data.orders;

      if (orders.length === 0) {
        console.log("No new orders to process.");
        return;
      }

      await Promise.all(
        orders.map(async (order) => {
          try {
            if (!order || typeof order.order_number !== "number") {
              console.error("Invalid order data:", order);
              return;
            }

            const orderID = "GM" + order.order_number;
            const existingOrder = await ShipmentModel.findOne({ orderID });
            if (existingOrder) {
              console.log("Order already exists:", order.order_number);
              return;
            }

        

            const shipmentData = {
              parcel: "Confirmation Pending",
              orderID,
              receiverName: order.shipping_address.name,
              city: order.shipping_address.city,
              client: "65cf5418727d403c7899792e",
              clientName: "grovmart",
              productName: order.line_items.map((item) => item.name).join(", "),
              customerEmail: order.email,
              customerAddress: order.shipping_address.address1,
              contactNumber: order.shipping_address.phone,
              date: order.created_at,
              codAmount: order.total_price,
            };

            const newShipment = new ShipmentModel(shipmentData);
            await newShipment.save();

            console.log(
              "Order posted to shipment API successfully:",
              order.order_number
            );
          } catch (error) {
            console.error("Error posting order to shipment API:", error);
          }
        })
      );

      // Check if there are more orders to fetch
      if (orders.length < 250) {
        hasMoreOrders = false;
      } else {
        page++;
      }
    }
  } catch (error) {
    console.error("Error fetching and posting orders to shipment API:", error);
  }
}

async function fetchAndUpdateOrdersToShipmentLuci() {
  try {
    let hasMoreOrders = true;
    let page = 1;
    const maxRetries = 3;

    while (hasMoreOrders) {
      const url = `https://${process.env.SHOP_STORE_URL_LUCI}/admin/api/${process.env.SHOP_API_VERSION_LUCI}/orders.json`;

      const authHeaders = createAuthHeadersLuci(url, "GET");

      let retryCount = 0;
      let response;
      while (retryCount < maxRetries) {
        try {
          response = await axios.get(url, {
            headers: authHeaders,
          });
          break;
        } catch (error) {
          if (error.response && error.response.status === 430) {
            // Rate limit exceeded, wait for some time before retrying
            const waitTime = calculateWaitTimeLuci(retryCount);
            console.log(
              `Rate limit exceeded. Retrying in ${waitTime} milliseconds...`
            );
            await sleepLuci(waitTime);
            retryCount++;
          } else {
            // Other types of errors, log and handle accordingly
            console.error("Error fetching orders from Shopify API:", error);
            throw error;
          }
        }
      }

      const orders = response.data.orders;

      if (orders.length === 0) {
        console.log("No new orders to process.");
        return;
      }

      await Promise.all(
        orders.map(async (order) => {
          try {
            if (!order || typeof order.order_number !== "number") {
              console.error("Invalid order data:", order);
              return;
            }

            const orderID = "LX" + order.order_number;
            const existingOrder = await ShipmentModel.findOne({ orderID });
            if (existingOrder) {
              console.log("Order already exists:", order.order_number);
              return;
            }

            const shipmentData = {
              parcel: "Confirmation Pending",
              orderID,
              receiverName: order.shipping_address.name,
              city: order.shipping_address.city,
              client: "65cf35629cd720a212cf0ca1",
              clientName: "lucidaluxe",
              productName: order.line_items.map((item) => item.name).join(", "),
              customerEmail: order.email,
              customerAddress: order.shipping_address.address1,
              contactNumber: order.shipping_address.phone,
              date: order.created_at,
              codAmount: order.total_price,
            };
            
            const newShipment = new ShipmentModel(shipmentData);
            await newShipment.save();

            console.log(
              "Order posted to shipment API successfully:",
              order.order_number
            );
          } catch (error) {
            console.error("Error posting order to shipment API:", error);
          }
        })
      );

      // Check if there are more orders to fetch
      if (orders.length < 250) {
        hasMoreOrders = false;
      } else {
        page++;
      }
    }
  } catch (error) {
    console.error("Error fetching and posting orders to shipment API:", error);
  }
}

async function fetchAndUpdateOrdersToShipmentOstro() {
  try {
    let hasMoreOrders = true;
    let page = 1;
    const maxRetries = 3;

    while (hasMoreOrders) {
      const url = `https://${process.env.SHOP_STORE_URL_OSTRO}/admin/api/${process.env.SHOP_API_VERSION_OSTRO}/orders.json`;

      const authHeaders = createAuthHeadersOstro(url, "GET");

      let retryCount = 0;
      let response;
      while (retryCount < maxRetries) {
        try {
          response = await axios.get(url, {
            headers: authHeaders,
          });
          break;
        } catch (error) {
          if (error.response && error.response.status === 430) {
            // Rate limit exceeded, wait for some time before retrying
            const waitTime = calculateWaitTimeOstro(retryCount);
            console.log(
              `Rate limit exceeded. Retrying in ${waitTime} milliseconds...`
            );
            await sleepOstro(waitTime);
            retryCount++;
          } else {
            // Other types of errors, log and handle accordingly
            console.error("Error fetching orders from Shopify API:", error);
            throw error;
          }
        }
      }

      const orders = response.data.orders;

      if (orders.length === 0) {
        console.log("No new orders to process.");
        return;
      }

      await Promise.all(
        orders.map(async (order) => {
          try {
            if (!order || typeof order.order_number !== "number") {
              console.error("Invalid order data:", order);
              return;
            }

            const orderID = "OM" + order.order_number;
            const existingOrder = await ShipmentModel.findOne({ orderID });
            if (existingOrder) {
              console.log("Order already exists:", order.order_number);
              return;
            }


            const shipmentData = {
              parcel: "Confirmation Pending",
              orderID,
              receiverName: order.shipping_address.name,
              city: order.shipping_address.city,
              client: "65cf53d7727d403c789978c3",
              clientName: "ostromart",
              productName: order.line_items.map((item) => item.name).join(", "),
              customerEmail: order.email,
              customerAddress: order.shipping_address.address1,
              contactNumber: order.shipping_address.phone,
              date: order.created_at,
              codAmount: order.total_price,
            };
            
            const newShipment = new ShipmentModel(shipmentData);
            await newShipment.save();

            console.log(
              "Order posted to shipment API successfully:",
              order.order_number
            );
          } catch (error) {
            console.error("Error posting order to shipment API:", error);
          }
        })
      );

      // Check if there are more orders to fetch
      if (orders.length < 250) {
        hasMoreOrders = false;
      } else {
        page++;
      }
    }
  } catch (error) {
    console.error("Error fetching and posting orders to shipment API:", error);
  }
}


module.exports = { fetchAndUpdateOrdersToShipmentGrov, fetchAndUpdateOrdersToShipmentLuci, fetchAndUpdateOrdersToShipmentOstro };
