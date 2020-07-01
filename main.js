// This is for taking user input
const prompt = require('prompt-sync')({sigint: true});
  
  // Variable initialization
const hat = '^'; //Hat
const hole = 'O'; // Hole
const fieldCharacter = '░'; // background char
const pathCharacter = '*'; // player's path

class Field {
      constructor(dimX, dimY) {
          this.field = [];
          this.dimX = dimX;
          this.dimY = dimY;
          this.userInitxPos = 0;
          this.userInityPos = 0;
          this.userxPos = this.userInitxPos;
          this.useryPos = this.userInityPos;
          this.playing;
      }
      // Fills the game field
      fillField () {
          // Choose randomly a position for the hat ^
        let hatxPosition = Math.floor(Math.random() * this.dimX);
        let hatyPosition = Math.floor(Math.random() * this.dimY);

        // If position [0,0] was the result randomly choose a dimension to add 1
        if (hatxPosition === 0 && hatyPosition === 0) {
            let unTie = Math.floor(Math.random() * 2);
            if (unTie === 0) {
                hatxPosition++;
            } else {
                hatyPosition++;
            }
        }

        // Fills the field 
        for (let i = 0; i < this.dimY; i++) {
            let fieldX = [];
            for (let j = 0; j < this.dimX; j++) {
                let cell = Math.random();
                // When at position [0,0] assign the pathCharacter
                if (i === this.userInityPos && j === this.userInitxPos) {
                    fieldX.push(pathCharacter);
                // When at hat's previously choosen position assign the hat
                } else if (i === hatyPosition && j === hatxPosition) {
                    fieldX.push(hat);
                }
                // Fill the rest with holes and fieldCharacters constrained to 40% probability for holes and 60% for fieldCharacters
                else {
                    if (cell <= 0.3) {
                        fieldX.push(hole);
                    } else if (cell > 0.3) {
                        fieldX.push(fieldCharacter);
                    }
                }
            }
            this.field.push(fieldX);
        }
      }
      // Updates the field layout according to user input
      layoutChange (userInput) {
        // Remember previous user position 
        let previousxPosition = this.userxPos;
        let previousyPosition = this.useryPos;

        // Check if move is inside borders
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

        // Check surroundings according to user move
        if (this.field[this.useryPos][this.userxPos] === hole) {
                this.playing = false;
                return "You've just gone down a hole. Game Over";
        } else if (this.field[this.useryPos][this.userxPos] === fieldCharacter) {
                this.field[this.useryPos][this.userxPos] = pathCharacter;
                return 'Good move!';
        } else if (this.field[this.useryPos][this.userxPos] === hat) {
                this.playing = false;
                return "You've just won the game!!!";
        }
        
      }
      // Prints the game field
      printField () {
          this.field.forEach((element, index) => {
            console.log(element.join(''));
        });
      }

      // Run the game
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
  

  
  
  