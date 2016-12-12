
// Background ( Tela de Fundo)
var background = {
    cor: 0,
    cores: ["#6dd4e7","#62becf","#57a9b8","#4c94a1","#417f8a","#366a73","#2b545c","#203f45","#152a2e","#0a1517"],
    altura: canvas.height,
    largura: canvas.width,
    desenhar: function () {
        ctx.fillStyle = this.cores[this.cor];
        ctx.fillRect(0, 0, this.largura, this.altura);
    }
}
// parede esquerda(paisagem)
var paredeEsquerda = {
    img: new Image,
    altura: 320,
    largura: 410,
    x: 800,
    y: 146,
    velocidade: 1,
    paredes: [],
    desenhar: function () {
        this.img.src = "cloud.gif"
        ctx.beginPath();
        ctx.save();
        ctx.rotate(-26.5 * Math.PI / 180);
        for (var i = 0; i < this.paredes.length; i++) {
            var parede = this.paredes[i];
            ctx.drawImage(this.img, parede.x, parede.y, parede.largura, parede.altura);
        }
        ctx.restore();
    },
    inserir: function (count) {
        this.paredes.push({
            x: this.x + (this.largura * count),
            y: this.y,
            largura: this.largura,
            altura: this.altura
        });
    },
    reset: function () {
        this.paredes = []
    },
    atualizar: function () {
        // Animation
        for (var i = 0; i < this.paredes.length; i++) {
            var parede = this.paredes[i];
            if (undefined != parede) {
                parede.x -= this.velocidade;
            }
        }
        // Controle de inserir e deletar
        if (this.paredes.length < 3) {
            var qtd = 3 - this.paredes.length;
            for (var i = 0; i < qtd; i++) {
                this.inserir(i);
            }
        }
        if (this.paredes[0].x + this.paredes[0].largura + 150 < 0) {
            this.paredes.shift();
        }
    }
}
var predio = {
    img: new Image,
    altura: 463,
    largura: 206,
    x: background.largura - 206,
    y: canvas.height/1.8,
    velocidade: 1,
    predios: [],
    prediosImg: ["predio1.gif","predio2.gif","predio3.gif"],
    qntPredios: 6,
    nPredio: 0,
    desenhar: function () {
        for (var i = 0; i < this.predios.length; i++) {
            var pred = this.predios[i];
            this.img.src = this.prediosImg[pred.nPredio];
            ctx.drawImage(this.img, pred.x, pred.y, pred.largura, pred.altura);
        }

    },
    inserir: function (count) {
        this.predios.unshift({
            x: this.x + (this.largura + (count * 160)),
            y: this.y - (count * 70),
            largura: this.largura,
            altura: this.altura,
            nPredio: this.nPredio
        });
    },
    reset: function () {
        this.predios = []
    },
    atualizar: function () {
        // Animation
        for (var i = 0; i < this.predios.length; i++) {
            var pred = this.predios[i];
            if (undefined != pred)
                pred.x -= this.velocidade;
            pred.y = pred.y + (0.5 * this.velocidade);
        }
        // Controle de inserir e deletar
        if (this.predios.length < this.qntPredios) {
            var qtd = this.qntPredios - this.predios.length;
            for (var i = 0; i < qtd; i++) {
                this.inserir(i);
            }
        }
        if (this.predios[predio.predios.length - 1].x <= canvas.height) {
            this.predios.pop();
        }
    }
}
var chao = {
    y: canvas.height - 200,
    xParede: 0,
    yParede: canvas.height,
    desenhar: function (x, y, countPixel, cor) {
        this.y = y;
        // um quadrado/retangulo tem 4 lados, enquanto não desenhar os 4 lados fica no loop
        // Criando valor do X para completar o quadrado
        var auxX = x + ((countPixel * 2) - 2) * 2;
        for (var lado = 1; lado <= 2; lado++) {
            // Se a aresta for par
            if (lado % 2 == 0) {
                // DESENHA PARTE DE CIMA DO QUADRADO
                for (var pixel = 0; pixel < countPixel; pixel++) {
                    //x , y , w ,h
                    ctx.fillRect(x + (pixel * 2), y + pixel, 2, 1);
                    ctx.fillRect(auxX - (pixel * 2), y + pixel, 2, 1);
                    ctx.fillStyle = cor;
                }
            }
            else {
                // DESENHA PARTE DE BAIXO DO QUADRADO
                for (var pixel = 0; pixel < countPixel; pixel++) {
                    //x , y , w ,h
                    ctx.fillRect(x + (pixel * 2), y - pixel, 2, 1);
                    ctx.fillRect(auxX - (pixel * 2), y - pixel, 2, 1);
                    ctx.fillStyle = cor;
                }
            }
        }
    }
}