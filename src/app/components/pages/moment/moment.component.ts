import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { IMoment } from 'src/app/services/interface/IMoment';
import { IComment } from 'src/app/services/interface/IComment';
import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: IMoment
  baseApiUrl = environment.baseApiUrl
  faTimes = faTimes
  faEdit = faEdit

  commentForm!: FormGroup


  constructor(
    private momentService: MomentService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router) { }

  ngOnInit(): void {
    //id da url
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl("", [ Validators.required ]),
      username: new FormControl("", [ Validators.required ])
    })
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.deleteMoment(id).subscribe()
    this.messagesService.add("Momento excluído com sucesso!");

    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {

    if(this.commentForm.invalid) {
      return;
    }

    const data: IComment = this.commentForm.value

    data.moment_id = Number(this.moment!.id)

    await this.commentService.createComment(data).subscribe((comment) => {
      this.moment!.comments!.push(comment.data)
    })

    this.messagesService.add("Comentário adicionado");

    //reset form
    this.commentForm.reset()
    formDirective.resetForm()

  }

}
