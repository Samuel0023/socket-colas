const path = require('path');
const fs = require('fs');

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
        const { lastTicket, dateToday, tickets, lastfourtickets } = require('../db/data.json');

        //if its an different day
        if (dateToday !== this.dateToday) {
            this.saveDB()
        }
        this.lastTicket = lastTicket;
        this.tickets = tickets;
        this.lastfourtickets = lastfourtickets;
    }



    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }
}

module.exports = TicketControl;