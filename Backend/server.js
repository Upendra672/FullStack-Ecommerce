const app = require("./app");
const dotenv = require("dotenv");
const ConnectDatabase = require("./config/database");

//Handling Uncaught errors
process.on("UncaughtException",(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting the server due to Handling Uncaught errors`);
  process.exit(1);

})


//config
dotenv.config({path: "Backend/config/config.env",});

//connect Database
ConnectDatabase();


//establishing server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});



//Unhandled Promise Rejection

process.on("unhandledRejection", err=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting the server due to Unhandled Promise Rejection`);
  server.close(()=>{
    process.exit(1);
  });
})