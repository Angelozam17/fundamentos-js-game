(function(){

    const btn_start = document.querySelector('#btn_startjs')
    
    const color1 = document.querySelector('#color1');
    const color2 = document.querySelector('#color2');
    const color3 = document.querySelector('#color3');
    const color4 = document.querySelector('#color4');
    
    const LAST_LEVEL = 7;
    
    
    class Game{
        sequence: number[];
        level: number;
        subLevel: number;
        colors: {};
    
        constructor(){
            this.initialize();
        }
        
        initialize(){
            btn_start.classList.toggle('hide');
            if(btn_start.className === 'btn-start hide'){
                this.level = 1;  
                this.chooseColor = this.chooseColor.bind(this);
                this.colors = {color1, color2, color3, color4}
                this.illuminateSequence = this.illuminateSequence.bind(this);
                this.nextLevel();
            }  
        }
        
        generateSequence(){
            //this.sequence = new Array(10).fill(0).map( n => Math.floor(Math.random() * 4))
            
            this.sequence = [];
            for (let i = 0; i < this.level; i++) {
                const numberRandom = Math.floor(Math.random() * 4);
                this.sequence.push(numberRandom);
            }
            //console.log("sequence", this.sequence)
        }
        
        nextLevel(){
            this.subLevel = 0;
            this.generateSequence();
            this.addEvents();   
    
            Swal.fire({
                title: `Nivel: ${this.level}`,
                icon: 'info',
                showConfirmButton: false,
                timer: 500
    
            }).then(() => {
                setTimeout(() => {
                    this.illuminateSequence();
                }, 1000);        
            })
        }
    
        numberToColor(_number: number){
            switch (_number) {
                case 0: return 'color1'
                case 1: return 'color2'
                case 2: return 'color3'
                case 3: return 'color4'
            }
        }
    
        colorToNumber( _color: string ){
            switch ( _color ) {
                case "color1": return 0
                case "color2": return 1
                case "color3": return 2
                case "color4": return 3
            }
        }
    
        illuminateSequence(){
            for (let i = 0; i < this.level; i++) {
                const color = this.numberToColor(this.sequence[i]);
                setTimeout(() => this.illuminateColor(color), 1000 * i);  
            }
        }
    
        illuminateColor(_color: string){
            this.colors[_color].classList.toggle('light');
            setTimeout( () => this.turnOffColor(_color), 200);
        }
    
        turnOffColor(_color: string){
            this.colors[_color].classList.toggle('light');
        }
    
        addEvents(){
            this.chooseColor = this.chooseColor.bind(this)
            color1.addEventListener('click', this.chooseColor);    
            color2.addEventListener('click', this.chooseColor);    
            color3.addEventListener('click', this.chooseColor);    
            color4.addEventListener('click', this.chooseColor);    
        }
    
        deleteClickEvents(){
            color1.removeEventListener('click', this.chooseColor);    
            color2.removeEventListener('click', this.chooseColor);    
            color3.removeEventListener('click', this.chooseColor);    
            color4.removeEventListener('click', this.chooseColor); 
        }
    
        
        chooseColor( { target } ){
            const selectedColor: string = target.dataset.color;    
            const numberColor: number = this.colorToNumber(selectedColor);      
            this.illuminateColor(selectedColor);
    
            if (numberColor === this.sequence[this.subLevel]) {
                this.subLevel++;            
                if(this.subLevel === this.level){
                    this.level++;
                    this.deleteClickEvents();
                    
                    if (this.level === LAST_LEVEL + 1) {
                        this.gameWon();
                    }else{
                        setTimeout( () => this.nextLevel(), 1000);
                    }
                }
            }else{
                this.deleteClickEvents();
                this.gameOver();
            }
        }
    
        gameWon(){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Has ganado!',
                showConfirmButton: false,
                timer: 1500
            }).then( () => this.initialize())
        }
    
        gameOver(){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Inténtalo de nuevo.',
                showConfirmButton: false,
                timer: 1500
            }).then( () => this.initialize())
        }
    }
    
    btn_start.addEventListener('click', () => { 
        const juego = new Game();
    })
}())
