var player = {
    img: new Image,
    cor: "#3f3f3f",
    altura: 96,
    largura: 115,
    countFrameImg: 0, // contador de frame animation
    imagemRender: 0, // começa renderizar por 0
    velocidadeFrame: 0.2, // velocidade de animacao
    estadoAviao: 1, // ele fica balançando
    x: 10,
    y: canvas.height,
    yLimite: this.y,
    velocidadeAndar: 7,
    velocidadeCorrer: 2,
    andarEsquerda: false,
    andarDireita: false,
    andarCima: false,
    andarBaixo: false,
    correr: false,
    comeacajogo: false,
    score: 0,
    life: 3,
    desenhar: function () {
        this.img.src = jogador;
        //drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
        ctx.drawImage(this.img, this.largura * this.imagemRender, 0, this.largura, this.altura, this.x, this.y, this.largura, this.altura);

    },
    atualizar: function () {
        if (this.life <= 0) {
            setCookie("gameOver", "true", 30);7
            isPaused = true;
            location.reload();
        }
        // Animation 
        this.countFrameImg += this.velocidadeFrame;
        if (this.countFrameImg >= 1) {
            this.countFrameImg = 0;
            if (this.imagemRender == 0) {
                this.imagemRender = 1;
                this.y += this.estadoAviao;
            }
            else if (this.imagemRender == 1) {
                this.imagemRender = 2;
                this.y -= this.estadoAviao;
            }
            else if (this.imagemRender == 2) {
                this.imagemRender = 3;
                this.y += this.estadoAviao;
            } else {
                this.imagemRender = 0;
                this.y -= this.estadoAviao;
            }
        }
        if (parseInt(canvas.height / 1.35) < this.y && this.comeacajogo == false) {
            this.y -= 1;
            this.x += 1;
        }
        // Movimentos
        if (this.correr && this.andarEsquerda) {
            if (this.x > 0 && this.y > 0) {
                this.x -= this.velocidadeAndar * this.velocidadeCorrer;
                this.y -= 3.5 * this.velocidadeCorrer;;
            }
        }
        else if (this.correr && this.andarDireita) {
            if (this.x < canvas.width - this.largura && this.y < canvas.height - this.altura) {
                this.x += this.velocidadeAndar * this.velocidadeCorrer;
                this.y += 3.5 * this.velocidadeCorrer;;
            }
        }
        else if (this.andarEsquerda) {
            if (this.x > 0 && this.y > 0) {
                this.x -= this.velocidadeAndar;
                this.y -= 3.5;
            }
        }
        else if (this.andarDireita) {
            if (this.x < canvas.width - this.largura && this.y < canvas.height - this.altura) {
                this.x += this.velocidadeAndar;
                this.y += 3.5;
            }
        }
        else if (this.andarCima) {
            if (this.y > 0 && this.x < canvas.width - this.largura) {
                this.y -= 1.5;
                this.x += 5;
            }
        }
        else if (this.andarBaixo) {
            if (this.x > 0 && this.y < canvas.height - this.altura) {
                this.y += 1.5;
                this.x -= 5;
            }
        }
        // // Fisica no Chao
        // if (this.y > player.yLimite) {
        //     this.y = player.yLimite;
        //     player.qntPulo = 0;
        // }

    }
}
function Controle(event) {
    if (player.comeacajogo) {
        //  console.log(event.keyCode);
        switch (event.keyCode) {

            // pular
            case 32: {
                if (event.type == "keydown") {
                    // if (player.qntPulo < player.maxPulo) {
                    //     player.pulo = -player.forcaPulo;
                    //     player.qntPulo++;
                    // }
                    // player.acaoPulou = true;
                    // player.yLimite = player.y;
                    gun.inserir();
                }
                break;
            }
            // CIMA - W
            case 87: {
                if (event.type == "keydown") {
                    player.andarCima = true;
                } else { // keyup
                    player.andarCima = false;
                }
                break;
            }
            // BAIXO - S
            case 83: {
                if (event.type == "keydown") {
                    player.andarBaixo = true;
                } else { // keyup
                    player.andarBaixo = false;
                }
                break;
            }
            // Direita - D
            case 68: {
                if (event.type == "keydown") {
                    player.andarDireita = true;
                } else { // keyup
                    player.andarDireita = false;
                }
                break;
            }
            // Esquerda -  A
            case 65: {
                if (event.type == "keydown") {
                    player.andarEsquerda = true;
                } else {
                    player.andarEsquerda = false;
                }
                break;
            }
            // Shift - Correr
            // case 16: {
            //     if (event.type == "keydown") {
            //         player.correr = true;
            //         if (paredeEsquerda.velocidade < 50)
            //             paredeEsquerda.velocidade += 1;
            //         if (predio.velocidade < 50)
            //             predio.velocidade += 1;
            //         if (monster.velocidade < 50){
            //             monster.velocidade += 1.5;
            //             monsterDead.velocidade += 1.5;
            //         }
            //     } else {
            //         player.correr = false;
            //         paredeEsquerda.velocidade = 1;
            //         predio.velocidade = 1;
            //         monster.velocidade = 1;
            //     }
            //     break;
            // }
        }
    }
}