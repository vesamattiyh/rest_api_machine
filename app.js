const express = require("express");
const mongoose = require("mongoose");
const parameter_controller = require("./parameter_controller");
const body_parser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(body_parser.json());

app.post("/api/machining-parameter-set", parameter_controller.api_post_parameter_set);
app.get("/api/machining-parameter-sets", parameter_controller.api_get_parameter_sets);
app.get("/api/machining-parameter-set/:id", parameter_controller.api_get_parameter_set);
app.put("/api/machining-parameter-set/:id", parameter_controller.api_put_parameter_set);
app.delete("/api/machining-parameter-set/:id", parameter_controller.api_delete_parameter_set);

// Lisää parametrisetti:
// POST /machining-parameter-set

// Kysy kaikki parametrisetit:
// GET /machining-parameter-sets

// Kysy tietty parametrisetti:
// GET /machining-parameter-set/:id

// Päivitä parametrisetti:
// PUT /machining-parameter-set/:id

// Poista parametrisetti:
// DELETE /machining-parameter-set/:id


const machine_db_uri = "mongodb+srv://db_user:wwLpSgBgTJYVJMWU@cluster0.ccq7s.mongodb.net/machine_db?retryWrites=true&w=majority";

mongoose.connect(machine_db_uri, {}).then(()=>{
    console.log("Database connected");
    console.log("Listening port: ", PORT);
    app.listen(PORT);
});
