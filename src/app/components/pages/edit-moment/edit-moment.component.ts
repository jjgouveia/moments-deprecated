import { Component, OnInit } from '@angular/core';

import { IMoment } from 'src/app/services/interface/IMoment';

import { MomentService } from 'src/app/services/moment.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: IMoment
  btnText: string = "Editar"

  constructor(private momentService: MomentService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe(item => {
      this.moment = item.data;
    })
  }

  editHandler(event: any) {
    console.log('====================================');
    console.log('teste');
    console.log('====================================');
  }

}
