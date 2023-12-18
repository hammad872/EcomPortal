const router = require("express").Router();
const  employees = require("../models/Employee");
const Shipment = require("../models/Shipment");




router.post("/addShipment" , async (req,res) => {
    const shipment = new  Shipment({reference,receiverName,city,customerEmail,customerAddress,contactNumber,codAmount,user})
    await shipment.save().then( () => res.status(200).json({userInfo}))
    user.list().push(userInfo)
    user.save()
})

module.exports = router