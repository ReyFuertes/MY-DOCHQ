import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-symptom-checker',
  templateUrl: './symptom-checker.component.html',
  styleUrls: ['./symptom-checker.component.scss']
})
export class SymptomCheckerComponent implements OnInit {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public scloading$ = this.loadingSubject.asObservable();

  constructor() { }

  ngOnInit() {
    // this.loadingSubject.next(true);
  }

}
