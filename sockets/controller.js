const TicketControl = require('../models/ticket/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    //console.log('Cliente conectado', socket.id);

    socket.emit('last-ticket', ticketControl.lastTicket);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);

    });

    socket.on('serve-ticket', (payload, callback) => {
        console.log(payload);
    });

}



module.exports = {
    socketController
}