const path = require('path');
const fs = require('fs');

const Ticket = require('Ticket');
class TicketControl {

    constructor() {
        this.lastTicket = 0;
        this.dateToday = new Date().getDate();
        this.tickets = [];
        this.lastfourtickets = [];

        this.init();
    }

    get toJson() {
        return {
            lastTicket: this.lastTicket,
            dateToday: this.dateToday,
            tickets: this.tickets,
            lastfourtickets: this.lastfourtickets
        };
    }


    init() {
        const { lastTicket, dateToday, tickets, lastfourtickets } = require('../../db/data.json');

        //if its an different day
        if (dateToday !== this.dateToday) {
            this.saveDB()
        }
        this.lastTicket = lastTicket;
        this.tickets = tickets;
        this.lastfourtickets = lastfourtickets;
    }



    saveDB() {
        const dbPath = path.join(__dirname, '../../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    next() {
        this.lastTicket += 1;

        this.tickets.push(new Ticket(this.lastTicket, null));

        this.saveDB();

        return 'Ticket' = ticket.numero;
    }

    serveTicket(desk) {
        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift();

        ticket.desk = desk;

        this.lastfourtickets.unshift(ticket);

        if (this.lastfourtickets.length > 4) {
            this.lastfourtickets.splice(4);
        }

        this.saveDB();

        return ticket;
    }
}

module.exports = TicketControl;