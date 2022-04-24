const mongoose = require("mongoose");
const express = require("express");
const parameter_controller = require("./parameter_controller");
const notification_controller = require("./notification_controller");
const body_parser = require("body-parser");

const PORT = process.env.PORT || 8080;
const DB_KEY = process.env.DB_KEY;

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(body_parser.json());

app.post("/api/machining-parameter-set", parameter_controller.api_post_parameter_set);
app.get("/api/machining-parameter-sets", parameter_controller.api_get_parameter_sets);
app.get("/api/machining-parameter-set/:id", parameter_controller.api_get_parameter_set);
app.put("/api/machining-parameter-set/:id", parameter_controller.api_put_parameter_set);
app.delete("/api/machining-parameter-set/:id", parameter_controller.api_delete_parameter_set);

const machine_db_uri = "mongodb+srv://db_user:"+DB_KEY+"@cluster0.ccq7s.mongodb.net/machine_db?retryWrites=true&w=majority";

mongoose.connect(machine_db_uri, {}).then(()=>{
    console.log("Database connected");
    console.log("Listening port: ", PORT);
    
    io.on("connection", (socket)=>{
        notification_controller.connections[socket.id] = socket;
        notification_controller.number_of_connections++;
        console.log("client connected. number_of_connections: ", notification_controller.number_of_connections);
        socket.on("disconnect", (socket)=>{
            delete notification_controller.connections[socket.id];
            notification_controller.number_of_connections--;
            console.log("client disconnected. number_of_connections: ", notification_controller.number_of_connections);
        });
        
    });   
    
    server.listen(PORT);
});
