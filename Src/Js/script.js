// cria referencia ao canvas e o context "Ctx";
const canvasEl = document.querySelector("canvas"),
 canvasCtx = canvasEl.getContext("2d"),
 gapX = 10;

 // objeto campo;
 const field = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function() {
        // desenha campo;
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect(0, 0, this.w, this.h); // {this} faz referência ao objeto field;
    }
 }

 // objeto linha;
 const line = {
    w: 15,
    h: field.h,
    draw: function() {
        // desenha linha central;
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h);
    }
 }

 // objeto raquete esquerda;
 const leftPaddle = {
    x: gapX,
    y: 100,
    w: line.w,
    h: 200,
    draw: function() {
        // desenha raquete esquerda:
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    }
 }

 // objeto raquete direita;
 const rightPaddle = {
    // desenha raquete direita;
    x: field.w - line.w - gapX,
    y: 100,
    w: line.w,
    h: 200,
    draw: function() {
        // desenha raquete esquerda:
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    }
 }

 // objeto placar;
 const score = {
    human: 1,
    computer: 2,
    draw: function() {
        // Desenha placar;
        canvasCtx.font = "bold 72px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#01341d";
        canvasCtx.fillText(this.human, field.w / 4, 50);
        canvasCtx.fillText(this.computer, field.w / 4 + field.w / 2, 50);
    }
 }

 // objeto bola
 const ball = {
    x: 300,
    y: 200,
    r: 20,
    draw: function() {
        // desenha bola;
        canvasCtx.beginPath();
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.arc(this.x,  this.y, this.r, 2 * Math.PI,false);
        canvasCtx.fill();
    }
 }

 

function setup() {
    // forma de capturar a largura da tela;
    canvasEl.width = canvasCtx.width = field.w;
    canvasEl.height = canvasCtx.height = field.h;
}

// função para executar os metodos draw de todos os objetos;
function draw() {
    field.draw();
    line.draw();
    leftPaddle.draw();
    rightPaddle.draw();
    score.draw();
    ball.draw();
    
    

    

    
}

setup();
draw();