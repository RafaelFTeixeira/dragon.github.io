var gun = {
    img: new Image,
    altura: 6,
    largura: 9,
    x: canvas.width,
    y: 0,
    velocidade: 5,
    guns: [],
    municao: 100,
    desenhar: function () {
        this.img.src = "itens/gunDefault.gif";
        for (var i = 0; i < this.guns.length; i++) {
            var gun = this.guns[i];
            ctx.drawImage(this.img, gun.x, gun.y, gun.largura, gun.altura);
        }

    },
    inserir: function () {
        if (this.municao > 0) {
            this.guns.unshift({
                x: player.x + player.largura,
                y: player.y + (player.largura / 3),
                largura: this.largura,
                altura: this.altura
            });
            this.municao--;
        }
        else if (0 == gun.municao) {
            gun.municao = player.score;
            player.score = 0;
        }
    },
    atualizar: function () {
        for (var i = 0; i < this.guns.length; i++) {
            var gun = this.guns[i];
            if (undefined != gun)
                gun.y -= this.velocidade;
            gun.x = gun.x + (2 * this.velocidade);
            // Colisão
            for (var j = 0; j < monster.monsters.length; j++) {
                var mons = monster.monsters[j];
                if (gun.y + gun.altura > mons.y
                    && gun.x < mons.x + mons.largura
                    && gun.y < mons.y + mons.altura
                    && gun.x + gun.largura > mons.x) {
                    // Tira da lista do array
                    monster.monsters.splice(j, 1);
                    // Inserir dragon dead
                    monsterDead.inserir(mons.x, mons.y);
                    // tira o tiro da cena
                    this.guns.splice(i, 1);
                    // Pontuação
                    player.score++;
                }
            }
            // if (mons.y + mons.altura > player.y
            //     && mons.x < player.x + player.largura
            //     && mons.y < player.y + player.altura
            //     && mons.x + mons.largura > player.x
            // ) {
            //     // Remove monster q colidiu
            //     this.monsters.splice(index, 1);
            // }
        }
    }
}