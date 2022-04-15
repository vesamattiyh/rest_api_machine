const alarm_model = require("./alarm_model");

// CRUD methods for REST API

// CREATE
const api_post_alarm = (req, res) => {
    let model = alarm_model(req.body);
    model
        .save()
        .then((model)=>{
            res.send(model);
    })
    .catch((error)=>{
        res.status(500);
        res.send(error.message);
    });
}

const api_get_alarms = (req, res)=>{
    alarm_model.find({}).then((alarms)=>{
        res.send(alarms);
    })
};

// READ
const api_get_alarm = (req, res)=>{
    const id = req.params.id;
    alarm_model.findById(id).then((alarm)=>{
        res.send(alarm);
    }).catch((error)=>{
        res.status(404);
        res.send("Not found");
    })
};

// UPDATE
const api_put_alarm = (req, res)=>{
    const id = req.params.id;
    alarm_model.findByIdAndUpdate(id, req.body).then((alarm)=>{
        res.send(alarm);
    });
};

// DELETE
const api_delete_alarm = (req, res)=>{
    const id = req.params.id;
    alarm_model.findByIdAndDelete(id).then((alarm)=>{
        res.send(alarm);
    });
};

module.exports.api_post_alarm = api_post_alarm;
module.exports.api_get_alarms = api_get_alarms;
module.exports.api_get_alarm = api_get_alarm;
module.exports.api_put_alarm = api_put_alarm;
module.exports.api_delete_alarm = api_delete_alarm;