const mongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://Good:kikekiris@cluster0.8klyi.mongodb.net/Inventario?retryWrites=true&w=majority";

exports.GET_ONE = async (query, name_collection) => {
    try {
        const client = await mongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(query);
        const db = client.db("Inventario");
        const collection = db.collection(name_collection);
        const result = await collection.findOne(query);
        const output = { codRes: result ? "00" : "01", ...result };
        client.close();
        return output;
    } catch (error) {
        console.log("error");
        console.log(error);
    }
}

exports.INSERT_ONE = async (data, name_collection) => {
    try {
        console.log("INSERT_MDB");
        const client = await mongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = client.db("Inventario");
        const collection = db.collection(name_collection);
        const result = await collection.insertOne({
            ...data,
            _updated: null,
            _insert: new Date()
        });
        const output = { codRes: result.acknowledged ? "00" : "01", ...result }
        client.close();
        return output;
    } catch (error) {
        console.log(error);
    }
};