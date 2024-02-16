const axios = require("axios");
const { createAuthHeaders, calculateWaitTime, sleep } = require("./utils");
const ShipmentModel = require("../models/Shipment");
require("dotenv").config(); 


setInterval(() => {
  fetchAndUpdateOrdersToShipmentAPI()
}, 100000);



async function fetchAndUpdateOrdersToShipmentAPI() {
  try {
    let hasMoreOrders = true;
    let page = 1;
    const maxRetries = 3;

    while (hasMoreOrders) {
      const url = `https://${process.env.SHOP_STORE_URL}/admin/api/${process.env.SHOP_API_VERSION}/orders.json`;

      const authHeaders = createAuthHeaders(url, "GET");

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
            const waitTime = calculateWaitTime(retryCount);
            console.log(
              `Rate limit exceeded. Retrying in ${waitTime} milliseconds...`
            );
            await sleep(waitTime);
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

            const orderID = "GL" + order.order_number;
            const existingOrder = await ShipmentModel.findOne({ orderID });
            if (existingOrder) {
              console.log("Order already exists:", order.order_number);
              return;
            }

            // Determine fulfillment status based on order status
            let fulfillmentStatus;
            switch (order.financial_status) {
              case "pending":
                fulfillmentStatus = "In Transit";
                break;
              case "paid":
                fulfillmentStatus = "Delivered";
                break;
              case "voided":
                fulfillmentStatus = "Cancelled";
                break;
              case "refunded":
                fulfillmentStatus = "Returned";
                break;
              default:
                fulfillmentStatus = "in transit";
            }

            const shipmentData = {
              parcel: "In Transit",
              orderID,
              receiverName: order.shipping_address.name,
              city: order.shipping_address.city,
              client: "65cc79f270cffd42a981a0d5",
              clientName: "gulfash",
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

module.exports = { fetchAndUpdateOrdersToShipmentAPI };
