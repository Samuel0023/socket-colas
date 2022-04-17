const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('The desk is required');
}

const socket = io();

const lblDesk = document.querySelector('h1');
const btnServe = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');


const desk = searchParams.get('escritorio');
lblDesk.innerText = desk;
console.log(desk);

divAlert.style.display = 'none';

socket.on('connect', () => {
    // console.log('Conectado');

    btnServe.disabled = false;

});

socket.on('disconnect', () => {

    btnServe.disabled = true;
});


socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})
socket.on('last-ticket', (last) => {
    // lblNuevoTicket.innerHTML = 'Ticket ' + last;
});

btnServe.addEventListener('click', () => {
    //                                    payload
    socket.emit('serve-ticket', { desk }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = 'nadie.';
            return divAlert.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.number;
    })
});