class BoardCoordinates { //מחלקה ליצירת לקורדינאטות (מיקומים בלוח) על הלוח וסימן במידה ויש

    private row: number;
    private column: number;
    private sign: string;

    get Row(): number {

        return this.row;
    }

    get Column(): number {

        return this.column;
    }

    get Sign(): string {

        return this.sign;
    }

    set Sign(x: string) {
        this.sign = x;
    }

    constructor(rowIDX: number, columnIDX : number) {
        this.row = rowIDX;
        this.column = columnIDX;

    }
}