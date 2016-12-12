var monster = {
    img: new Image,
    cor: "#3f3f3f",
    altura: 70,
    largura: 75,
    countFrameImg: 0, // contador de frame animation
    imagemRender: 0, // começa renderizar por 0
    velocidadeFrame: 0.14, // velocidade de animacao
    x: canvas.width,
    y: 0,
    velocidade: 1.5,
    timeMonster: 1500,
    monsters: [],
    desenhar: function () {
        this.img.src = "itens/dragonRed.gif";
        for (var index = 0; index < this.monsters.length; index++) {
            var mons = this.monsters[index];
            ctx.drawImage(this.img, mons.largura * mons.imagemRender, 0, mons.largura, mons.altura, mons.x, mons.y, mons.largura, mons.altura);
        }


    },
    inserir: function () {
        this.monsters.unshift({
            x: this.x,
            y: Math.floor((Math.random() * 360) - 180),
            altura: this.altura,
            largura: this.largura,
            imagemRender: this.imagemRender,
            countFrameImg: this.countFrameImg
        });
    },
    atualizar: function () {
        // Animation 
        for (var index = 0; index < this.monsters.length; index++) {
            var mons = this.monsters[index];
            mons.countFrameImg += this.velocidadeFrame;
            if (mons.countFrameImg >= 1) {
                mons.countFrameImg = 0;
                if (mons.imagemRender == 0) {
                    mons.imagemRender = 1;
                }
                else if (mons.imagemRender == 1) {
                    mons.imagemRender = 2;
                }
                else if (mons.imagemRender == 2) {
                    mons.imagemRender = 3;
                }
                else if (mons.imagemRender == 3) {
                    mons.imagemRender = 4;
                }
                else {
                    mons.imagemRender = 0;
                }
            }
            mons.x -= this.velocidade;
            mons.y += (this.velocidade / 2);
            if (mons.x < 0 - mons.largura) {
                this.monsters.pop();
            }
            // Colisão
            if (mons.y + mons.altura > player.y
                && mons.x < player.x + player.largura
                && mons.y < player.y + player.altura
                && mons.x + mons.largura > player.x
            ) {
                // Remove monster q colidiu
                this.monsters.splice(index, 1);
                player.estadoAviao++;
                player.life--;
            }
        }
    }
}
var monsterDead = {
    img: new Image,
    altura: 42,
    largura: 22,
    x: 0,
    y: 0,
    velocidade: 1.5,
    monsters: [],
    desenhar: function () {
        this.img.src = "itens/dragonDead.gif";
        for (var index = 0; index < this.monsters.length; index++) {
            var mons = this.monsters[index];
           ctx.drawImage(this.img, mons.x, mons.y, mons.largura, mons.altura);
        }
    },
    inserir: function (x, y) {
        this.monsters.unshift({
            x: x+5,
            y: y+10,
            altura: this.altura,
            largura: this.largura
        });
    },
    atualizar: function () {
        for (var index = 0; index < this.monsters.length; index++) {
            var mons = this.monsters[index];
            mons.y += (7*this.velocidade);
            mons.x -= (1*this.velocidade);
        }
    }
}
