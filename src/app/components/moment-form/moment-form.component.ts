import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string

  momentForm!: FormGroup
  descLength: number = 256;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(256),
      ]),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  descCountWords(): number {
    const MAX_CHAR = 256;
    const WORDS_LENGTH: number = this.momentForm.get('description')?.value.length;
    let remaining: number = MAX_CHAR - WORDS_LENGTH;
    return this.descLength = remaining;
  }

  get description() {
    return this.momentForm.get('description')!;
  }


  submit(): void {
    if(this.momentForm.invalid) {
      return;
    }

    console.log('====================================');
    console.log('Envio do Form');
    console.log('====================================');
  }

}
