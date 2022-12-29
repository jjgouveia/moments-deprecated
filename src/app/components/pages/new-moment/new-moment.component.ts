import { Component } from '@angular/core';
import { IMoment } from 'src/app/services/interface/IMoment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = 'Compartilhar'

  constructor(private momentService: MomentService) {}

  async createHandler(moment: IMoment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image) {
      formData.append('image', moment.image)
    }

    // enviar para o service
    await this.momentService.createMoment(formData).subscribe()

    // exibir mensagem

    // redirect

  }
}
