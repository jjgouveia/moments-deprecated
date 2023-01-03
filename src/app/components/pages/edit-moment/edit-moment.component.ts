import { Component, OnInit } from '@angular/core';
import { IMoment } from 'src/app/services/interface/IMoment';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';


@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: IMoment
  btnText: string = 'Editar'

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {}



  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe(item => {
      this.moment = item.data
    })
  }

  async editHandler(momentData: IMoment) {
    const id = this.moment.id;

    const formData = new FormData()

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    (await this.momentService.updateMoment(id!, formData)).subscribe()

    this.messagesService.add('Moment atualizado com sucesso!')

    this.router.navigate(['/'])
  }

}
