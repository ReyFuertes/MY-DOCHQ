import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message: any;

  constructor(
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.snackBar.open(message.text, '', { duration: 2000 });
      }
    });
  }
}
