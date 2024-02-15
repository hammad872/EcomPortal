require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const ShipmentModel = require("./models/Shipment");
const ProductModel = require("./models/Product");
const multer = require("multer");
const path = require("path"); // Add this line to import the path module
const crypto = require("crypto");
const axios = require("axios");
const cron = require("node-cron");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

cron.schedule('0 * * * *', fetchAndUpdateOrdersToShipmentAPI);

// Define Express routes
app.get("/", (req, res) => {
  res.send("Server is running");
});
const { MONGODB_URI, PORT } = process.env;

mongoose.connect(MONGODB_URI);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // Get the client ID from the request body
    const clientId = req.body.clientId || "unknown"; // If client ID is not provided, use "unknown"
    // Concatenate the client ID and current timestamp with the original filename
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handle file upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  // Handle the uploaded file
  console.log("File uploaded:", req.file);
  res.status(200).send("File uploaded successfully");
});

// Handle file download endpoint
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  // Send the file for download
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
});
app.post("/login", async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res
      .status(400)
      .json({ error: "Email/Username and password are required" });
  }

  let query;
  if (email) {
    query = { email: email };
  } else {
    query = { username: username };
  }

  try {
    const user = await EmployeeModel.findOne(query);

    if (user) {
      if (user.password === password) {
        // Return the objectId along with other user information
        const { password, ...userInfo } = user._doc;
        res.status(200).json({ message: "Login success", user: { userInfo } });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "No record exists" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { username } = req.body;

  try {
    const existingEmployee = await EmployeeModel.findOne({ username });

    if (existingEmployee) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const employee = await EmployeeModel.create(req.body);
    res.json(employee);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/addshipment", async (req, res) => {
  console.log("Received Request Body:", req.body);

  const {
    parcel,
    receiverName,
    city,
    orderNumber,
    client,
    clientName,
    productName,
    customerEmail,
    customerAddress,
    contactNumber,
    date,
    codAmount,
    userIds,
  } = req.body;

  try {
    const selectedUser = await EmployeeModel.findById(client);

    if (!selectedUser) {
      return res.status(404).json({ error: "Selected client not found" });
    }

    const slugName = selectedUser.slug || ""; // Get the slugName of the selected user

    const orderID = slugName + orderNumber; // Concatenate slugName first

    const users = await EmployeeModel.find({ _id: { $in: userIds } });

    const shipment = await ShipmentModel.create({
      client,
      clientName,
      parcel,
      receiverName,
      orderNumber,
      date,
      orderID,
      city,
      productName,
      customerEmail,
      customerAddress,
      contactNumber,
      codAmount,
      user: users.map((user) => user._id),
    });

    // Update each user's shipments array using Promise.all
    await Promise.all(
      users.map(async (user) => {
        user.shipments.push(shipment._id);
        await user.save();
      })
    );

    res.json(shipment);
  } catch (err) {
    console.error("Error during shipment creation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getshipments", async (req, res) => {
  try {
    const shipments = await ShipmentModel.find();
    const formattedShipments = shipments.map((shipment) => {
      // Check if the date is a valid date
      const formattedDate =
        shipment.date instanceof Date && !isNaN(shipment.date)
          ? new Date(shipment.date).toISOString().split("T")[0]
          : null;

      return {
        id: shipment._id,
        client: shipment.client,
        clientName: shipment.clientName,
        orderID: shipment.orderID,
        parcel: shipment.parcel,
        productName: shipment.productName,
        date: formattedDate, // Use the formatted date or null
        receiverName: shipment.receiverName,
        city: shipment.city,
        customerEmail: shipment.customerEmail,
        customerAddress: shipment.customerAddress,
        contactNumber: shipment.contactNumber,
        codAmount: shipment.codAmount,
        timestamps: shipment.createdAt,
      };
    });
    res.json(formattedShipments);
  } catch (err) {
    console.error("Error fetching shipments:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/getregister", async (req, res) => {
  try {
    const employeesWithShipments = await EmployeeModel.find();

    const formattedEmployees = employeesWithShipments.map((employee) => ({
      username: employee.username,
      id: employee._id,
      role: employee.role,
      slug: employee.slug,
      shipments: employee.shipments.map((shipment) => ({
        id: shipment._id,
      })),
    }));

    res.json(formattedEmployees);
  } catch (err) {
    console.error("Error fetching employees with shipments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addproduct", async (req, res) => {
  const { productTitle, sourcing } = req.body;

  try {
    const product = await ProductModel.create({ productTitle, sourcing });
    res.json(product);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getproducts", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteshipment/:id", async (req, res) => {
  const shipmentId = req.params.id;

  try {
    const shipment = await ShipmentModel.findOneAndDelete({ _id: shipmentId });

    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    // Remove the shipment from users
    const userIds = shipment.user;

    if (userIds && userIds.length > 0) {
      await Promise.all(
        userIds.map(async (userId) => {
          const user = await EmployeeModel.findById(userId);
          if (user) {
            user.shipments = user.shipments.filter(
              (userShipmentId) => userShipmentId.toString() !== shipmentId
            );
            await user.save();
          }
        })
      );
    }

    res.json({ message: "Shipment deleted successfully" });
  } catch (err) {
    console.error("Error deleting shipment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/searchshipments", async (req, res) => {
  const { searchBy, searchTerm } = req.body;

  try {
    let query;

    switch (searchBy) {
      case "Order Number":
        query = { orderNumber: searchTerm };
        break;
      case "Client":
        query = { "client.username": searchTerm };
        break;
      case "ClientName":
        query = { clientName: searchTerm };
        break;
      case "ReceiverName":
        query = { receiverName: searchTerm };
        break;
      default:
        return res.status(400).json({ error: "Invalid search criteria" });
    }

    const shipments = await ShipmentModel.find(query);

    const formattedShipments = shipments.map((shipment) => ({
      id: shipment._id,

      orderID: shipment.orderID,
      receiverName: shipment.receiverName,
      city: shipment.city,
      customerEmail: shipment.customerEmail,
      date: shipment.date,
      customerAddress: shipment.customerAddress,
      parcel: shipment.parcel,
      contactNumber: shipment.contactNumber,
      codAmount: shipment.codAmount,
      timestamps: shipment.createdAt,
      clientName: shipment.clientName,
    }));

    res.json(formattedShipments);
  } catch (err) {
    console.error("Error searching shipments:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/upload-csv", async (req, res) => {
  try {
    const data = req.body.data;
    const selectedClient = req.body.clientName;
    const selectedClientId = req.body.client;

    // Fetch slug for the selected client from getregister
    const clientInfo = await EmployeeModel.findOne({
      username: selectedClient,
      _id: selectedClientId,
    });
    const clientSlug = clientInfo ? clientInfo.slug || "" : "";

    const shipments = data.map((row) => {
      // Map CSV fields to Shipment fields
      const orderID = (clientSlug + row.Name).replace(/#/g, ""); // Remove '#' characters
      return {
        orderID,
        clientName: selectedClient,
        client: selectedClientId,
        parcel: "In Transit",
        productName: row["Lineitem name"],
        codAmount: row.Total,
        customerAddress: row["Billing Address1"],
        receiverName: row["Billing Name"],
        contactNumber: row["Phone"],
        city: row["Shipping Province Name"],
        customerEmail: row["Email"],
        date: row["Fulfilled at"],
        // Map other CSV fields to Shipment fields here
      };
    });

    const insertedShipments = await ShipmentModel.insertMany(shipments);

    console.log("Data saved to MongoDB successfully");
    res.status(200).json({
      message: "Data saved successfully",
      shipments: insertedShipments,
    });
  } catch (err) {
    console.error("Error saving data to MongoDB:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/changestatus", async (req, res) => {
  const { newStatus, orderIds } = req.body;

  try {
    // Validate newStatus
    if (!["Delivered", "Returned", "Cancelled"].includes(newStatus)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Update status for the specified orders
    await ShipmentModel.updateMany(
      { orderID: { $in: orderIds } },
      { parcel: newStatus }
    );

    res.json({ success: true, message: "Status updated successfully" });
  } catch (err) {
    console.error("Error changing status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/totalcodamount", async (req, res) => {
  try {
    const shipments = await ShipmentModel.find();

    console.log("Shipments:", shipments);

    const totalCODAmount = shipments.reduce((acc, shipment) => {
      const codAmount =
        typeof shipment.codAmount === "number" ? shipment.codAmount : 0;
      return acc + codAmount;
    }, 0);

    console.log("Total COD Amount:", totalCODAmount);

    res.json({ totalCODAmount });
  } catch (err) {
    console.error("Error calculating total COD amount:", err);
    res.status(500).json({ error: err.message });
  }
});

// Add this code after your existing routes

app.delete("/deleteproduct/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: productId,
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/editproduct/:id", async (req, res) => {
  const productId = req.params.id;
  const { productTitle, sourcing } = req.body;

  try {
    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { productTitle, sourcing },
      { new: true } // To return the updated document
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
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
            console.log(`Rate limit exceeded. Retrying in ${waitTime} milliseconds...`);
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
    console.error(
      "Error fetching and posting orders to shipment API:",
      error
    );
  }
}

function createAuthHeaders(url, method) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const message = method + url + timestamp;
  const hmac = crypto.createHmac("sha256", process.env.SHOP_API_SECRET);
  hmac.update(message);
  const hash = hmac.digest("hex");

  return {
    "X-Shopify-Access-Token": process.env.SHOP_ACCESS_TOKEN,
    "X-Shopify-Timestamp": timestamp,
    "X-Shopify-Hmac-Sha256": hash,
  };
}

function calculateWaitTime(retryCount) {
  // Exponential backoff strategy
  const baseWaitTime = 1000; // 1 second
  const maxWaitTime = 60000; // 1 minute
  const waitTime = Math.min(baseWaitTime * Math.pow(2, retryCount), maxWaitTime);
  return waitTime;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get("/shopify", async (req, res) => {
  try {
    // Construct the URL for fetching orders from Shopify API
    const url = `https://${process.env.SHOP_STORE_URL}/admin/api/${process.env.SHOP_API_VERSION}/orders.json`;

    // Construct authentication headers
    const authHeaders = {
      "X-Shopify-Access-Token": process.env.SHOP_ACCESS_TOKEN,
    };

    // Make GET request to fetch orders
    const response = await axios.get(url, {
      headers: authHeaders,
    });

    // Extract orders from response data
    const orders = response.data.orders;

    // Send fetched orders in the response
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    // Send error response
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
