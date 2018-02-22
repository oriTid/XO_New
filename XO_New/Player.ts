class Player {

    private playerName: string; //משתנה לשם השחקן
    private playerSign: string;//משתנה לסימן השחקן

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

    public playerInput(): BoardCoordinates {  // קליטת פוזיציות לפי בחירת השחקן האנושי והחזרה של הקודינאטות 
        let position: number = undefined; //
        let coordinates: BoardCoordinates

        while (position == undefined || isNaN(position)) {
            let input: string = prompt(` ${this.plyrNme}, please enter your next coordinate:`); //קליטת הפוזיציות מהשחקן
            position = parseInt(input);

            if (isNaN(position)) { //אם זה לא מספר,קלוט שוב
                alert("Sorry, input must be a number\nPlease try again.");

            }

            if (position < 0 || position > MainBoard.board.length * MainBoard.board.length - 1) { //אם הפוזיציה מחוץ לגבולות, קלוט שוב
                alert("Sorry, input must be a number between 0 to " + (MainBoard.board.length * MainBoard.board.length - 1) + "\nPlease try again.");
                position = undefined;
            }

            coordinates = MainBoard.GetCoordinates(position);  
            if (MainBoard.board[coordinates.Row][coordinates.Column] != undefined) { //אם הפוזיציה תפוסה כבר בסימן, קלוט שוב
                alert(`This position is taken by ${MainBoard.board[coordinates.Row][coordinates.Column]}\nPlease Try Again`);
                position = undefined;
            }
        }

        return coordinates; //החזרה של קודינאטות מהפוזיציה

    }
}