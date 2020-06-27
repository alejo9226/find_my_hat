const prompt = require('prompt-sync')({
    sigint: true
    });
  
  // Variable initialization
  const hat = '^'; //Hat
  const hole = 'O'; // Hole
  const fieldCharacter = '░'; // background char
  const pathCharacter = '*'; // player's path

  class Field {
      constructor(dimX, dimY) {
          this.fieldY = [];
          this.dimX = dimX;
          this.dimY = dimY;
          this.userInitxPos = 0;
          this.userInityPos = 0;
          this.userxPos = this.userInitxPos;
          this.useryPos = this.userInityPos;
          this.playing;
      }
      // Esta funcion llena el field
      fillField () {
          // Escoger una posicion aleatoria para el sombrero ^
        let hatxPosition = Math.floor(Math.random() * this.dimX);
        let hatyPosition = Math.floor(Math.random() * this.dimY);

        // Si es la posicion [0,0] aleatoriamente escoja a que dimension incrementarle 1
        if (hatxPosition === 0 && hatyPosition === 0) {
            let unTie = Math.floor(Math.random() * 2);
            if (unTie === 0) {
                hatxPosition++;
            } else {
                hatyPosition++;
            }
        }

        // Hacer el layout
        // Otra manera de crear y llenar un array => const field = new Array(10).fill(0).map(el => new Array(10));
        for (let i = 0; i < this.dimY; i++) {
            let fieldX = [];
            for (let j = 0; j < this.dimX; j++) {
                let cell = Math.random() * 2;
                // Si esta en la primera posicion [0,0] agregue *
                if (i === this.userInityPos && j === this.userInitxPos) {
                    fieldX.push(pathCharacter);
                // Si esta en la posicion escogida aleatoriamente para el sombrero agregue ^
                } else if (i === hatyPosition && j === hatxPosition) {
                    fieldX.push(hat);
                }
                else {
                    if (cell <= 0.4) {
                        fieldX.push(hole);
                    } else if (cell > 0.4) {
                        fieldX.push(fieldCharacter);
                    }
                }
            }
            this.fieldY.push(fieldX);
        }
      }
      // Actualiza el layout del juego segun el input del usuario
      layoutChange (userInput) {

        let previousxPosition = this.userxPos;
        let previousyPosition = this.useryPos;

        if (userInput === 'U') {
            if (this.useryPos < 1) {
                this.playing = false;
                return "Can't move further up";
            } else {
                this.useryPos--;
            }
        } else if (userInput === 'R') {
            if (this.userxPos >= this.dimX) {
                this.playing = false;
                return "Can't move further right";
            } else {
                this.userxPos++;
            }
        } else if (userInput === 'D') {
            if (this.useryPos >= this.dimY) {
                this.playing = false;
                return "Can't move further down";
            } else {
                this.useryPos++;
            }
        } else if (userInput === 'L') {
            if (this.userxPos < 1) {
                this.playing = false;
                return "Can't move further left";
            } else {
                this.userxPos--;
            }
        } else {
            return "That move doesn't work";
        }

        if (this.fieldY[this.useryPos][this.userxPos] === hole) {
                this.playing = false;
                return "You've just gone down a hole. Game Over";
        } else if (this.fieldY[this.useryPos][this.userxPos] === fieldCharacter) {
                this.fieldY[this.useryPos][this.userxPos] = pathCharacter;
                return 'Good move!';
        } else if (this.fieldY[this.useryPos][this.userxPos] === hat) {
                this.playing = false;
                return "You've just won the game!!!";
        }
        //printField();
      }
      // Imnprime el campo de juego
      printField () {
          this.fieldY.forEach((element, index) => {
            console.log(element.join(''));
        });
      }
      // Esta funcion se encarga del juego
      play () {
          this.fillField();
          this.playing = true;
          while (this.playing) {
            this.printField();
            const nextStep = prompt('What is your next move? (U=Up, R=Right, D=Down, L=Left)').toUpperCase();
            console.log(`Next move is ${nextStep}`);
            let gameMessage = this.layoutChange(nextStep);
            console.log(gameMessage);   
        }
      }
  }
  
 const game = new Field(10, 10);
 game.play();
  

  
  
  