//bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//V. bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;


//sons do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;

function setup() {
  createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(34,139,34);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    incluiPlacar() 
    marcaPonto();
}
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
     raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
        raquetada.play();
  }
}

function movimentaRaqueteOponente(){
    if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }
}


function incluiPlacar(){
  stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color(245,222,179));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(245,222,179));
    rect(410, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 430, 26);



}


function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
 // Verifica se alguém alcançou 10 pontos
    if (meusPontos === 10 || pontosDoOponente === 10) {
        // Mostra a mensagem de vitória ou derrota
        if (meusPontos === 10) {
            fill(255);
            textSize(32);
            textAlign(CENTER, CENTER);
            text("Vitória!", width / 2, height / 2);
        } else {
            fill(255);
            textSize(32);
            textAlign(CENTER, CENTER);
            text("Derrota!", width / 2, height / 2);
        }
        // Pausa a trilha sonora
        trilha.stop();
        // Encerra o loop draw()
        noLoop();
    }


