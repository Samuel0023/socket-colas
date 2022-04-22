const socket = io();
let lblTicketPublic;
let lblEscritorio;
let indice = 0;

socket.on('actual-state', (payload) => {

    payload.forEach(ticket => {
        indice++;
        lblTicketPublic = document.querySelector(`#lblTicket${indice}`);
        lblEscritorio = document.querySelector(`#lblEscritorio${indice}`);

        lblTicketPublic.innerText = `Ticket ${ticket.number}`;
        lblEscritorio.innerText = ticket.desk;
    });
    indice = 0;
})