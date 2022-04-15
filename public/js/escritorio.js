const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('The desk is required');
}

const socket = io();

const lblDesk = document.querySelector('h1');
const btnServe = document.querySelector('button');

const desk = searchParams.get('escritorio');
lblDesk.innerText = desk;
console.log(desk);

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

    socket.emit('serve-ticket', { desk }, (payload) => {
        console.log(payload);
    })
});