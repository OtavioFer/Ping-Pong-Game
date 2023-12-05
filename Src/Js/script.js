// cria referencia ao canvas e o context "Ctx";
const canvasEl = document.querySelector("canvas"),
 canvasCtx = canvasEl.getContext("2d"),
 gapX = 10;

 const mouse = { x: 0, y: 0}

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
    y: 0,
    w: line.w,
    h: 200,
    _move: function() {
        this.y = mouse.y - this.h / 2;
    },
    draw: function() {
        // desenha raquete esquerda:
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    }
 }

 // objeto raquete direita;
 const rightPaddle = {
    // desenha raquete direita;
    x: field.w - line.w - gapX,
    y: 100,
    w: line.w,
    h: 200,
    speed: 2,
    _move: function() {
        if(this.y + this.h / 2 < ball.y + ball.r) {
            this.y += this.speed;
        } else {
            this.y -= this.speed;
        }
    },
    speedUp: function() {
        this.speed += 1;
    },
    draw: function() {
        // desenha raquete esquerda:
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    }
 }

 // objeto placar;
 const score = {
    human: 0,
    computer: 0,
    increaseHuman: function() {
        this.human++;
    },
    increaseComputer: function() {
        this.computer++;
    },
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
    x: field.w / 2,
    y: field.h / 2,
    r: 20,
    speed: 10,
    directionX: 1,
    directionY: 1,
    _calcPosition: function() {
        // verifica se jogador Nº1 fez um ponto (x > largura do campo);
        if(this.x > field.w - this.r - rightPaddle.w - gapX) {
            // verifica se a raquete direita está na posição y da bola;
            if(this.y  + this.r > rightPaddle.y &&
            this.y - this.r < rightPaddle.y + rightPaddle.h
            ) {   
                // rebate a bola invertendo sinal de x;
                this._reverseX();             
            } else {
                // Ponto para jogador Nº1;
                score.increaseHuman();
                this._pointUp();
            }
        }

        // verifica se jogador Nº2 fez um ponto (x < 0);
        if(this.x < this.r + leftPaddle.w + gapX) {
            // verifica se raquete esquerda esta na posição y da bola;
            if(this.y + this.r > leftPaddle.y &&
               this.y - this.r < leftPaddle.y + leftPaddle.h
               ) {
                // rebate a bola invertendo sinal de x;
                this._reverseX();
            } else {
                // Ponto para jogador Nº2;
                score.increaseComputer();
                this._pointUp();
            }
        }

        // verifica as laterais superiores e inferiores do campo;
        if(
            (this.y - this.r < 0 && this.directionY < 0) ||
            (this.y > field.h - this.r && this.directionY > 0)
            ) {
            // rebate a bola invertendo o sinal do eixo Y;
            this._reverseY();
        }
    },
    _reverseX: function() {
        this.directionX *= - 1;
    },
    _reverseY: function() {
        // 1 * -1 = -1;
        // -1 * -1 = 1;
        this.directionY *= - 1;
    },
    _speedUp: function() {
        this.speed += 1.5;
    },
    _pointUp: function() {
        this._speedUp();
        rightPaddle.speedUp();

        this.x = field.w / 2;
        this.y = field.h / 2;
    },
    _move: function() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
    },
    draw: function() {
        // desenha bola;
        canvasCtx.beginPath();
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.arc(this.x,  this.y, this.r, 0, 2 * Math.PI,false);
        canvasCtx.fill();

        this._calcPosition();
        this._move();
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

// animação da bolinha;
window.animateFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  })();

  function main() {
    animateFrame(main);
    draw();
  }

setup();
main();

// cria ouvinte de evento para mouse;
canvasEl.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})