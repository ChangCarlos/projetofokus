const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const btn = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const musicaFoco = document.querySelector('#alternar-musica');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iconeStartPause = document.querySelector('.app__card-primary-butto-icon')
const tempoTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');
musica.loop = true;


let tempoDecorridoSegundos = 1500;
let intervalId = null;

musicaFoco.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

function alterarContexto(contexto) {
    mostrarTempo();
    btn.forEach(function(contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `    
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<strong class="app__title-strong"> Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    };

};

focoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');
});
curtoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
});
longoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 900;
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
});



const contagemRegressiva = () => {
    if(tempoDecorridoSegundos <= 0) {
        zerar();
        beep.play();
        return;
    }
    tempoDecorridoSegundos -= 1;
    mostrarTempo();
};

startPauseBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervalId){
        pause.play();
        zerar();
        return;
    };
    play.play();
    intervalId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = 'Pausar';
    iconeStartPause.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervalId);
    iniciarOuPausarBtn.textContent = 'Começar';
    intervalId = null;
    iconeStartPause.setAttribute('src', '/imagens/play_arrow.png');
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();