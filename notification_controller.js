// This module implements socket io functionalities

let connections = [];
let number_of_connections = 0;

const broadcast_notifications = (data)=>{
    for(let id in connections){
        const connection = connections[id];
        connection.emit("machine_notifications", data);
    }
};

module.exports.connections = connections;
module.exports.number_of_connections = number_of_connections;
module.exports.broadcast_notifications = broadcast_notifications;