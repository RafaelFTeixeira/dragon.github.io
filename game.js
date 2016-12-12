var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var jogador = "LeafarAnimation.gif";
// Menu Superior
var gasolina = {
    x: 50,
    y: 20,
    tanque: 100,
    velocidadeGastarGasolinha: 0.0050,
    desenhar: function () {
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.fillText("Gasolina", 50, 15);
        var my_gradient = ctx.createLinearGradient(0, 0, 250, 0);
        my_gradient.addColorStop(0, "black");
        my_gradient.addColorStop(this.tanque / 100, "#1a8ca0");
        my_gradient.addColorStop(this.tanque / 100, "white");
        ctx.fillStyle = my_gradient;
        ctx.rect(this.x, this.y, 200, 20);
        ctx.stroke();
        ctx.fillRect(this.x, this.y, 200, 20);
        ctx.restore();

    },
    atualizar: function () {
        if (this.tanque > 0) {
            this.tanque -= this.velocidadeGastarGasolinha;
        }
        if (0 > this.tanque) {
            //alert("Perdeu");
            this.tanque = 100;
            //Start();
        }

    }
}
function VelocidadeGame() {
    if (paredeEsquerda.velocidade < 50)
        paredeEsquerda.velocidade += 1;
    if (predio.velocidade < 50)
        predio.velocidade += 1;
    if (monster.velocidade < 50)
        monster.velocidade += 1.5;
}
function Start(e) {
    jogador = e.target.attributes.alt.textContent + ".gif";
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block"
    Render();
    document.addEventListener("keydown", Controle);
    document.addEventListener("keyup", Controle);
    CarregaImagens();
    setTimeout(function () { player.comeacajogo = true; }, 4000);
    monsterInterval = setInterval(function () { monster.inserir() }, monster.timeMonster);
    velocityGame = setInterval(function () { VelocidadeGame() }, 10000);
    backgroundColor = setInterval(function () {
        if (background.cor < 9) {
            background.cor++;
            predio.nPredio++;
        }
        if(predio.nPredio > 2)
        {
            predio.nPredio = 0;
        }
    }, 10000);
}
function CarregaImagens() {
    for (var i = 1; i <= predio.prediosImg.length; i++)
        new Image().src = "predio" + i + ".gif";
}
function Render() {
    if (!isPaused) {
        Atualizar();
        Desenhar();
    }
    window.requestAnimationFrame(Render);
}
function Desenhar() {
    background.desenhar();
    paredeEsquerda.desenhar();
    monsterDead.desenhar();
    predio.desenhar();
    gasolina.desenhar();
    // x , y , tamanho do quadrado
    // chao.desenhar(0, canvas.height - 200, 200, "black");
    ctx.fillStyle = "black";
    player.desenhar();
    monster.desenhar();
    gun.desenhar();
    // score
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Pontos: " + player.score, canvas.width - 200, 30);
    ctx.fillText("Munição: " + gun.municao, 50, 60);
    ctx.fillText(player.life + "x", 15, 66);
    var imgHead = new Image();
    imgHead.src = "itens/heart.png";
    ctx.drawImage(imgHead, 10, 15, 30, 33);
}
function Atualizar() {
    player.atualizar();
    paredeEsquerda.atualizar();
    predio.atualizar();
    gasolina.atualizar();
    monster.atualizar();
    monsterDead.atualizar();
    gun.atualizar();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(name) {
    var user = getCookie(name);
    if (user != "") {
        document.getElementById("userName").innerText = "Você perdeu!";
        deleteCookie("gameOver")
    }
}
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
checkCookie("gameOver");