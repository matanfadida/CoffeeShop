import { MongoClient } from "mongodb";

export async function connectToDataBase(){
    const client = await MongoClient.connect("mongodb+srv://matan:matanfadida@cluster0.u8zmn.mongodb.net/coffe-database?retryWrites=true&w=majority")
return client;
}