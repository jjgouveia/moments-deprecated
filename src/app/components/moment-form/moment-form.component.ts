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
  @Input() momentData: IMoment | null = null
  @Input() editMode: boolean = false
  @Input() required: boolean = true


  momentForm!: FormGroup
  descLength: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.momentData ? this.momentData.description : '', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(512),
      ]),
      image: new FormControl(this.momentData ? this.momentData.image : '', [ Validators.required ]),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  get image() {
    return this.momentForm.get('image')!;
  }

  descCountWords(): number {
    const MAX_CHAR = 512;
    const WORDS_LENGTH: number = this.momentForm.get('description')?.value.length;
    let remaining: number = WORDS_LENGTH;
    return this.descLength = remaining;
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
