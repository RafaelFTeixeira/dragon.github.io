var isPaused = false;

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.onkeydown = function (e) {
    if (e.keyCode == 80)
        Pause();
};
window.onblur = function () {
    if (!isPaused)
        Pause();
}
function Pause() {
    if (player.comeacajogo) {
        isPaused = !isPaused;
        if (isPaused) {
            // PAUSADO
            ctx.fillText("PAUSADO: Aperte (P) para continuar", canvas.width / 2.5, canvas.height / 2);
            clearInterval(monsterInterval);
            clearInterval(velocityGame);
            clearInterval(backgroundColor);
        }
        else {
            monsterInterval = setInterval(function () { monster.inserir() }, monster.timeMonster);
            velocityGame = setInterval(function () { VelocidadeGame() }, 10000);
            backgroundColor = setInterval(function () {
                if (background.cor < 9) {
                    background.cor++;
                    predio.nPredio++;
                }
                if (predio.nPredio > 2) {
                    predio.nPredio = 0;
                }
            }, 10000);
        }
    }
}