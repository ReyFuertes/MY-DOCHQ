import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { UserService } from '../user.service';
import { MessageService } from '../../global/message.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public userloading$ = this.loadingSubject.asObservable();
  constructor(private route: ActivatedRoute, private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadingSubject.next(true);

    this.userService.get(this.route.snapshot.paramMap.get('id')).subscribe(user => {
      this.userSubject.next(user);
      console.log('USER', user);
    },
      e => this.messageService.error(`Error - ${e}`),
      () => this.loadingSubject.next(false)
    );
  }
}
