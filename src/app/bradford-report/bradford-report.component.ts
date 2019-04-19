import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bradford-report',
  templateUrl: './bradford-report.component.html',
  styleUrls: ['./bradford-report.component.scss']
})
export class BradFordComponent implements OnInit {
  public accounting: any[] = [
    {value: 'accounting1', label: 'Accounting 101'},
    {value: 'accounting2', label: 'Accounting 102'},
    {value: 'accounting3', label: 'Accounting 103'}
  ];

  constructor() { }

  ngOnInit(): void { }
}
