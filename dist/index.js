(function () {
    var btn_start = document.querySelector('#btn_startjs');
    var color1 = document.querySelector('#color1');
    var color2 = document.querySelector('#color2');
    var color3 = document.querySelector('#color3');
    var color4 = document.querySelector('#color4');
    var LAST_LEVEL = 7;
    var Game = /** @class */ (function () {
        function Game() {
            this.initialize();
        }
        Game.prototype.initialize = function () {
            btn_start.classList.toggle('hide');
            if (btn_start.className === 'btn-start hide') {
                this.level = 1;
                this.chooseColor = this.chooseColor.bind(this);
                this.colors = { color1: color1, color2: color2, color3: color3, color4: color4 };
                this.illuminateSequence = this.illuminateSequence.bind(this);
                this.nextLevel();
            }
        };
        Game.prototype.generateSequence = function () {
            //this.sequence = new Array(10).fill(0).map( n => Math.floor(Math.random() * 4))
            this.sequence = [];
            for (var i = 0; i < this.level; i++) {
                var numberRandom = Math.floor(Math.random() * 4);
                this.sequence.push(numberRandom);
            }
            //console.log("sequence", this.sequence)
        };
        Game.prototype.nextLevel = function () {
            var _this = this;
            this.subLevel = 0;
            this.generateSequence();
            this.addEvents();
            Swal.fire({
                title: "Nivel: " + this.level,
                icon: 'info',
                showConfirmButton: false,
                timer: 500
            }).then(function () {
                setTimeout(function () {
                    _this.illuminateSequence();
                }, 1000);
            });
        };
        Game.prototype.numberToColor = function (_number) {
            switch (_number) {
                case 0: return 'color1';
                case 1: return 'color2';
                case 2: return 'color3';
                case 3: return 'color4';
            }
        };
        Game.prototype.colorToNumber = function (_color) {
            switch (_color) {
                case "color1": return 0;
                case "color2": return 1;
                case "color3": return 2;
                case "color4": return 3;
            }
        };
        Game.prototype.illuminateSequence = function () {
            var _this = this;
            var _loop_1 = function (i) {
                var color = this_1.numberToColor(this_1.sequence[i]);
                setTimeout(function () { return _this.illuminateColor(color); }, 1000 * i);
            };
            var this_1 = this;
            for (var i = 0; i < this.level; i++) {
                _loop_1(i);
            }
        };
        Game.prototype.illuminateColor = function (_color) {
            var _this = this;
            this.colors[_color].classList.toggle('light');
            setTimeout(function () { return _this.turnOffColor(_color); }, 200);
        };
        Game.prototype.turnOffColor = function (_color) {
            this.colors[_color].classList.toggle('light');
        };
        Game.prototype.addEvents = function () {
            this.chooseColor = this.chooseColor.bind(this);
            color1.addEventListener('click', this.chooseColor);
            color2.addEventListener('click', this.chooseColor);
            color3.addEventListener('click', this.chooseColor);
            color4.addEventListener('click', this.chooseColor);
        };
        Game.prototype.deleteClickEvents = function () {
            color1.removeEventListener('click', this.chooseColor);
            color2.removeEventListener('click', this.chooseColor);
            color3.removeEventListener('click', this.chooseColor);
            color4.removeEventListener('click', this.chooseColor);
        };
        Game.prototype.chooseColor = function (_a) {
            var _this = this;
            var target = _a.target;
            var selectedColor = target.dataset.color;
            var numberColor = this.colorToNumber(selectedColor);
            this.illuminateColor(selectedColor);
            if (numberColor === this.sequence[this.subLevel]) {
                this.subLevel++;
                if (this.subLevel === this.level) {
                    this.level++;
                    this.deleteClickEvents();
                    if (this.level === LAST_LEVEL + 1) {
                        this.gameWon();
                    }
                    else {
                        setTimeout(function () { return _this.nextLevel(); }, 1000);
                    }
                }
            }
            else {
                this.deleteClickEvents();
                this.gameOver();
            }
        };
        Game.prototype.gameWon = function () {
            var _this = this;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Has ganado!',
                showConfirmButton: false,
                timer: 1500
            }).then(function () { return _this.initialize(); });
        };
        Game.prototype.gameOver = function () {
            var _this = this;
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Inténtalo de nuevo.',
                showConfirmButton: false,
                timer: 1500
            }).then(function () { return _this.initialize(); });
        };
        return Game;
    }());
    btn_start.addEventListener('click', function () {
        var juego = new Game();
    });
}());
