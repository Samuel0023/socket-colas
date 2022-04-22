const TicketControl = require('../models/ticket/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    //console.log('Cliente conectado', socket.id);
    socket.emit('actual-state', ticketControl.lastfourtickets);

    socket.emit('last-ticket', ticketControl.lastTicket);

    socket.emit('pending-tickets', ticketControl.tickets);

    socket.on('next-ticket', (payload, callback) => {

        const next = ticketControl.next();
        callback(next);

        socket.broadcast.emit('pending-tickets', ticketControl.tickets);

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
        socket.broadcast.emit('pending-tickets', ticketControl.tickets);
        socket.emit('pending-tickets', ticketControl.tickets);

        socket.broadcast.emit('actual-state', ticketControl.lastfourtickets);
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