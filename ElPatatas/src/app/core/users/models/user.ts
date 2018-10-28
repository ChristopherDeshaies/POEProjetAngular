export class User {
    private id:number;
    private nom: string;
    private prenom: string;
    private adresse: string;
    private tel: string;
    private email: string; 
    private dateNaissance: string;
    private password : string; 
    private role : string;

    constructor(
        id : number,
        nom: string,
        prenom: string, 
        adresse : string, 
        tel: string, 
        email: string,
        password : string,
        dateNaissance: string,
        role : string,
        ) {

        this.id = id;    
        this.nom= nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.tel= tel;
        this.email = email;
        this.password = password;
        this.dateNaissance = dateNaissance;
        this.role = role;

    }

    getId(){
        return this.id;
    }

    setId(id : number){
        this.id = id;
    }

    getNom(){
        return this.nom;
    }

    setNom(nom : string){
        this.nom = nom;
    }

    getPrenom(){
        return this.prenom;
    }

    setPrenom(prenom : string){
        this.prenom= prenom;
    }

    getAdresse(){
        return this.adresse;
    }

    setAdresse(adresse : string){
        this.adresse = adresse;
    }

    getTel(){
        return this.nom;
    }

    setTel(tel : string){
        this.tel = tel;
    }

    getEmail(){
        return this.email;
    }

    setEmail(email : string){
        this.email= email;
    }

    getPassword(){
        return this.password;
    }

    setPassword(password : string){
        this.password= password;
    }

    getDateNaissance(){
        return this.dateNaissance;
    }

    setDateNaissance(dateNaissance : string){
        this.dateNaissance= dateNaissance;
    }

    getRole(){
        return this.role;
    }

    setRole(role : string){
        this.role= role;
    }

}
