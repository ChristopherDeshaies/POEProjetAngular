export class Planning {
    id: number;
    employe: number;
    date: Date;
    midi: boolean;
    soir: boolean;

    constructor(id: number, employe: number, date: Date, midi:boolean, soir:boolean){
        this.id=id;
        this.employe=employe;
        this.date=date;
        this.midi=midi;
        this.soir=soir;
    }
}
