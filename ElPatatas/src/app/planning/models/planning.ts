/**
 * @author Christopher Deshaies
 * Le model du Planning
 */
export class Planning {
    /**
     * Identifiant du Planning
     */
    id: number;

    /**
     * Identifiant de l'employé
     */
    employe: number;

    /**
     * La date à laquelle l'employé est assigné
     */
    date: Date;

    /**
     * Le salarié est affecté sur le midi
     */
    midi: boolean;

    /**
     * Le salarié est affecté au soir
     */
    soir: boolean;

    constructor(id: number, employe: number, date: Date, midi:boolean, soir:boolean){
        this.id=id;
        this.employe=employe;
        this.date=date;
        this.midi=midi;
        this.soir=soir;
    }
}
