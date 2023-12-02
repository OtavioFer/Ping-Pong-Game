// cria referencia ao canvas e o context "Ctx";
const canvasEl = document.querySelector("canvas"),
 canvasCtx = canvasEl.getContext("2d");

 const lineWidth = 15;

function setup() {
    // forma de capturar a largura da tela;
    canvasEl.width = canvasCtx.width = window.innerWidth
    canvasEl.height = canvasCtx.height = window.innerHeight
}

// função para desenhar elementos de forma estatica;
function draw() {
    // desenha o campo;
    canvasCtx.fillStyle = "#286047";
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight); 
    
    canvasCtx.fillStyle = "#ffffff";

    // desenha linha central;
    canvasCtx.fillRect(
        window.innerWidth / 2 - lineWidth / 2,
        0,
        lineWidth,
        window.innerHeight
    );

    // desenha raquete esquerda:
    canvasCtx.fillRect(10,
        400,
        lineWidth,
        200
        );

    // desenha raquete direita;
    canvasCtx.fillRect(
        window.innerWidth - lineWidth - 10,
        100,
        lineWidth,
        200
    );

    // desenha bolinha;
    canvasCtx.beginPath();
    canvasCtx.arc(200,
        300,
        20,
        2 * Math.PI,false
        );
    canvasCtx.fill();

    // Desenha placar;
    canvasCtx.font = "bold 72px Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillStyle = "#01341d";
    canvasCtx.fillText("3", window.innerWidth / 4, 50);
    canvasCtx.fillText("2", window.innerWidth / 4 + window.innerWidth / 2, 50);
}

setup();
draw();