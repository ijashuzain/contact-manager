const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://administrator:Sledger300@contactscluster.377lu4z.mongodb.net/contactsdb?retryWrites=true&w=majority")
        console.log("Database connected : ",connect.connection.host, connect.connection.name)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDb