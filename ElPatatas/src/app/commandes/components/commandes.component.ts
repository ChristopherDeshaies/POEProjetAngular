import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ValidatorFn , FormArray, Validators  } from '@angular/forms';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  form: FormGroup;
  selectedFritesIds : any[]=[];
  selectedBoissonsIds : any[]=[];
  selectedViandesIds : any[]=[];
  quantiteFrite = new FormControl('');
  quantiteBoisson = new FormControl('');
  quantiteViande = new FormControl('');
  //isValid: boolean = true;

  frites = [
    { id: 1, name: 'Grande' },
    { id: 2, name: 'Moyenne' },
    { id: 3, name: 'Petite' },
  ];

  boissons = [
    { id: 1, name: 'Coca' },
    { id: 2, name: 'Pepsi' },
    { id: 3, name: 'Fanta' },
  ];

  viandes = [
    { id: 1, name: 'Steack' },
    { id: 2, name: 'Fricadelle' },
    { id: 3, name: 'Brochette' },
  ]

  constructor(private fb: FormBuilder) {
    const controls = this.frites.map(c => new FormControl(false));
    //controls[0].setValue(true);

    const controls2 = this.boissons.map(c => new FormControl(false));
    //controls2[0].setValue(true);

    const controls3 = this.viandes.map(c => new FormControl(false));
    //controls2[0].setValue(true);
  
    this.form = this.fb.group({
      // quantiteFrite : new FormControl(''),
      // quantiteBoisson: new FormControl(''),
      // quantiteViande :new FormControl(''),
      frites: new FormArray(controls, minSelectedFrites(1)),
      boissons : new FormArray(controls2, minSelectedBoissons(1)),
      viandes : new FormArray(controls3, minSelectedViandes(1)),
           
      // frites: new FormArray(controls, this.formValid(this.selectedFritesIds,this.selectedBoissonsIds,this.selectedViandesIds)),
      // boissons : new FormArray(controls2, this.formValid(this.selectedFritesIds,this.selectedBoissonsIds,this.selectedViandesIds)),
      // viandes : new FormArray(controls3, this.formValid(this.selectedFritesIds,this.selectedBoissonsIds,this.selectedViandesIds))
    });
  }

  ngOnInit() {
  
  }

  submit() {
    
    this.selectedFritesIds = this.form.value.frites
      .map((v, i) => v ? this.frites[i].id : null)
      .filter(v => v !== null);

    this.selectedBoissonsIds = this.form.value.boissons
      .map((v, i) => v ? this.boissons[i].id : null)
      .filter(v => v !== null); 
    
    this.selectedViandesIds = this.form.value.viandes
      .map((v, i) => v ? this.viandes[i].id : null)
      .filter(v => v !== null); 

      // console.log(this.selectedFritesIds.length)
      // console.log("frites : "+ this.selectedFritesIds)
      // console.log(this.selectedBoissonsIds.length)
      // console.log("boissons : "+this.selectedBoissonsIds)
      // console.log(this.selectedViandesIds.length)
      // console.log("viandes : "+this.selectedViandesIds)
  }

  // formValid(selectedFritesIds,selectedBoissonsIds,selectedViandesIds){
  //     const validator: ValidatorFn;
  //     return ( (selectedFritesIds.length = 0)  & (selectedBoissonsIds.length = 0) & (selectedViandesIds.length = 0)) ? null : { required: true };
    
  //  }

}

  function isValid(){
    

  }

  function minSelectedFrites(min=1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = (formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0)) 
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;  
  }

  function minSelectedBoissons(min=1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = (formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0)) 
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;  
  }

  function minSelectedViandes(min=1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = (formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0)) 
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;  
  }
