//ref HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {

    btnCrear.disabled = true;
});


socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})
socket.on('last-ticket', (last) => {
    lblNuevoTicket.innerHTML = 'Ticket ' + last;
});

btnCrear.addEventListener('click', () => {

    socket.emit('next-ticket', null, (ticket) => {
        lblNuevoTicket.innerHTML = ticket;
    });

});