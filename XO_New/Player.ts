class Player {

    private playerName: string;
    private playerSign: string;

    constructor(PLAYERNAME: string, PLAYERSIGN: string) {

        this.playerName = PLAYERNAME;
        this.playerSign = PLAYERSIGN;

    }


    get plyrNme(): string {

        return this.playerName;
    }



    get plyrSgn(): string {

        return this.playerSign;
    }

    //////////// Methods /////////////

    public playerInput(): BoardPosition {
        let position: number = undefined;
        while (position == undefined || isNaN(position)) {
            let input: string = prompt(` ${this.plyrNme}, please enter your next coordinate:`);
            position = parseInt(input);

            if (isNaN(position)) {
                alert("Sorry, input must be a number\nPlease try again.");

            }

            if (position < 0 || position > MainBoard.board.length * MainBoard.board.length - 1) {
                alert("Sorry, input must be a number between zero to eight (0-8)\nPlease try again.");
                position = undefined;
            }
        }


        return MainBoard.GetCoordinates(position);

    }
}