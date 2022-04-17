const TicketControl = require('../models/ticket/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    //console.log('Cliente conectado', socket.id);

    socket.emit('last-ticket', ticketControl.lastTicket);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);

    });
    //                          payload,callback
    socket.on('serve-ticket', ({ desk }, callback) => {
        //check if we dont find a desk
        if (!desk) {
            return callback({
                ok: false,
                msg: 'The Desk is Required'
            });
        }

        var ticket;
        if (ticket = ticketControl.serveTicket(desk)) {
            callback({
                ok: true,
                ticket: ticket
            })
        } else {
            callback({
                ok: false,
                msg: 'No tickets found to serve'
            })
        }

    });

}



module.exports = {
    socketController
}