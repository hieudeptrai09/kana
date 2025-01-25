import { Component, OnInit } from '@angular/core';
import { CenterService } from 'src/app/services/center.service';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  styleUrls: ['./congratulation.component.scss'],
})
export class CongratulationComponent implements OnInit {
  point: number;

  constructor(private service: CenterService) {}

  ngOnInit(): void {
    this.point = this.service.getPoint();
  }
}
