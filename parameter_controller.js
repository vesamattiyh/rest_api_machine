// This module implements CRUD methdos for Machine Rest API

const notification_controller = require("./notification_controller");
const parameter_model = require("./parameter_set_model");

// CREATE new machine parameter set
const api_post_parameter_set = (req, res) => {
    let model = parameter_model(req.body);
    model
        .save()
        .then((model)=>{
            res.send(model);
            let message = {msg : "New parameter set added", parameters: model};
            notification_controller.broadcast_notifications(message);
    })
    .catch((error)=>{
        res.status(500);
        res.send(error.message);
    });
}

// READ all machine parameter sets
const api_get_parameter_sets = (req, res)=>{
    parameter_model.find({}).then((parameter_sets)=>{
        res.send(parameter_sets);
    }).catch((error)=>{
        res.status(500);
        res.send(error.message);
    });
};

// READ specific paramter set by id
const api_get_parameter_set = (req, res)=>{
    const id = req.params.id;
    parameter_model.findById(id).then((parameter_set)=>{
        res.send(parameter_set);
    }).catch((error)=>{
        res.status(404);
        res.send("Parameter set " + id +  " not found");
    });
};

// UPDATE specific paramter set by id
const api_put_parameter_set = (req, res)=>{
    const id = req.params.id;
    parameter_model.findByIdAndUpdate(id, req.body).then((parameter_set)=>{
        res.send(parameter_set);
        parameter_model.findById(id).then((updated_parameters)=>{
            let message = {msg : "Parameter set updated", parameters: updated_parameters};
            notification_controller.broadcast_notifications(message);
        })
    })
    .catch((error)=>{
        res.status(404);
        res.send("Parameter set " + id +  " not found");
    });
};

// DELETE specific paramter set by id
const api_delete_parameter_set = (req, res)=>{
    const id = req.params.id;
    parameter_model.findByIdAndDelete(id).then((parameter_set)=>{
        res.send(parameter_set);
        let message = {msg : "Parameter set deleted", parameters: parameter_set};
        notification_controller.broadcast_notifications(message);
    }).catch((error)=>{
        res.status(404);
        res.send("Parameter set " + id +  " not found");
    });
};

module.exports.api_post_parameter_set = api_post_parameter_set;
module.exports.api_get_parameter_sets = api_get_parameter_sets;
module.exports.api_get_parameter_set = api_get_parameter_set;
module.exports.api_put_parameter_set = api_put_parameter_set;
module.exports.api_delete_parameter_set = api_delete_parameter_set;