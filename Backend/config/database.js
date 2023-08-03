const mongoose = require("mongoose");


const connect = ()=>{
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,
        useUnifiedTopology: true}).then((data)=>{
            console.log(`Mongodb connected with server ${data.connection.name}`)
        }).catch((err) => {console.error(err)})
}

module.exports = connect;