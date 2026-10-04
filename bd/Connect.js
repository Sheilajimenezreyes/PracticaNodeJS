const mongo = require("mongoose");
const connectToDataBase = async ()=>{
try {
    const URL_MONGO = process.env.URL_MONGO
    await mongo.connect(URL_MONGO)
    console.log("conexion a la base de datos exitosa")
} catch (error) {
    console.error("A habido un error al conectarse a la base de datos")
}
}
module.exports = connectToDataBase;