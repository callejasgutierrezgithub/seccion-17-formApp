import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    favoriteGame: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ],

    ])
  })

  public newFavorite: FormControl = new FormControl('', Validators.required )

  constructor( private fb: FormBuilder ) { }

  get favoriteGames() {
    return this.myForm.get('favoriteGame') as FormArray;
  }

  isValidField( field: string ) : boolean | null {
    return this.myForm.controls[field].errors && 
    this.myForm.controls[field].touched
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors 
            && formArray.controls[index].touched
  }

  getFieldError(field: string): string | null {
    if( !this.myForm.controls[field] )  return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      // console.log(key);
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength} caracters`;
      }
    }
    return '';
  }

  onAddToFavorites(): void {
    if ( this.newFavorite.invalid ) return;

    // console.log( this.newFavorite.value );
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push( new FormControl( newGame, Validators.required))
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required)
    )

    this.newFavorite.reset();
  }
  
  onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();
  }



  ngOnInit() {
  }

}
