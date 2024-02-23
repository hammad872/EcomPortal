const { MongoClient } = require('mongodb');

async function deleteDuplicateOrders() {
    const uri = 'mongodb+srv://hammadsiddiq:ace123@cluster0.wjnke9f.mongodb.net/employee'; // Replace with your MongoDB connection URI
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db(); // No need to specify the database name here
        const collection = database.collection('shipments'); // Replace with your collection name

        // Aggregation pipeline to find duplicate order numbers
        const pipeline = [
            {
                $group: {
                    _id: '$orderID', // Group by orderID
                    count: { $sum: 1 }, // Count occurrences of each orderID
                    docs: { $push: '$_id' } // Store the _id of each document
                }
            },
            {
                $match: {
                    count: { $gt: 1 } // Match documents with orderID occurring more than once (i.e., duplicates)
                }
            }
        ];

        // Execute the aggregation pipeline
        const cursor = collection.aggregate(pipeline);

        // Iterate through the results and delete duplicates
        await cursor.forEach(async (doc) => {
            // Delete all duplicate documents except one (keep the first occurrence)
            const duplicateIds = doc.docs.slice(1); // Exclude the first occurrence
            await collection.deleteMany({ _id: { $in: duplicateIds } });
            console.log(`Deleted ${duplicateIds.length} duplicate documents with orderID: ${doc._id}`);
        });
    } finally {
        await client.close();
    }
}

deleteDuplicateOrders().catch(console.error);
