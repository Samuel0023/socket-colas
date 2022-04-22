const socket = io();

socket.on('actual-state', (payload) => {

    payload.forEach(ticket => {
        console.log(ticket);
        const lblTicket = document.querySelector(`#lblTicket${ticket.number}`);
        const lblEscritorio = document.querySelector(`#lblEscritorio${ticket.number}`);

        lblTicket.innerText = `Ticket ${ticket.number}`;
        lblEscritorio.innerText = ticket.desk;
    });

})