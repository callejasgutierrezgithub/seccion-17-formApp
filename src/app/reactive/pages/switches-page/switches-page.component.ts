import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.css']
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    temsAndConditions: [ false, Validators.requiredTrue ]

  })

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
    this.myForm.reset( this.person )
  }

  /* ngSubmit */
  onSave() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    //!TODO, NUEVO OBJETO newPerson, el cual no tiene el atributo temsAndConditions     
    const { temsAndConditions, ...newPerson } = this.myForm.value;
    
    this.person = newPerson;
    console.log(this.myForm.value)
    console.log("Person");    
    console.log(this.person)
  }

  isValidField( field: string ) : boolean | null {
    return this.myForm.controls[field].errors && 
    this.myForm.controls[field].touched
  }

}
