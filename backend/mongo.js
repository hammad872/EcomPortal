const { MongoClient } = require('mongodb');

async function deleteShipments() {
    const uri = 'mongodb+srv://hammadsiddiq:ace123@cluster0.wjnke9f.mongodb.net/employee'; // Replace 'your_database_name' with your actual database name
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db(); // No need to specify the database name here
        const collection = database.collection('shipments');

        // Define the query to match documents with orderID starting with 'GM'
        const query = { orderID: /^LX/ }; // Use /^GM/ to match documents with orderID starting with 'GM'

        // Delete all documents matching the query
        const result = await collection.deleteMany(query);
        console.log(`${result.deletedCount} document(s) deleted.`);
    } finally {
        await client.close();
    }
}

deleteShipments().catch(console.error);
