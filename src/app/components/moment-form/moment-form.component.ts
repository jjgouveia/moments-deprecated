import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMoment } from 'src/app/services/interface/IMoment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IMoment>();
  @Input() btnText!: string
  @Input() momentData: IMoment | null = null;


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
      image: new FormControl('', [ Validators.required ]),
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

  get image() {
    return this.momentForm.get('image')!;
  }

  onFileSelected(event:any) {
    const file: File = event.target.files[0];

    this.momentForm.patchValue({ image: file });
  }


  submit(): void {
    if(this.momentForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.momentForm.value);
  }

}
