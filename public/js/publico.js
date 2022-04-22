const socket = io();
let lblTicketPublic;
let lblEscritorio;
let indice = 0;
let lastTicket, lastTicketServed = 0;
const audio = new Audio('./audio/new-ticket.mp3');
socket.on('actual-state', (payload) => {
    if (payload.length > 0) {
        lastTicket = payload[0].number;
    }
    if (lastTicket > lastTicketServed) {
        console.log(lastTicket);
        audio.play();
        lastTicketServed = lastTicket;
    }
    payload.forEach(ticket => {
        indice++;
        lblTicketPublic = document.querySelector(`#lblTicket${indice}`);
        lblEscritorio = document.querySelector(`#lblEscritorio${indice}`);

        lblTicketPublic.innerText = `Ticket ${ticket.number}`;
        lblEscritorio.innerText = ticket.desk;

    });
    indice = 0;

})