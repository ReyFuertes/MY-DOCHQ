import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';

export enum SelectedCard {
  sickness = 1,
  wellBeing = 2,
  yourHealth = 3
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomePageComponent implements OnInit {
  public selectedCard: SelectedCard;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  public selectCard(selectedCard: any): void {
    localStorage.setItem('selected_card', JSON.stringify(selectedCard))
  }

  public getSelectedCard(): any {
    return JSON.parse(localStorage.getItem('selected_card')) ? JSON.parse(localStorage.getItem('selected_card')) : this.selectCard(1);
  }

  public onUpload(): void {
    alert('Not implemented yet!');
  }

  public onTemplateExample(): void {
    alert('Not implemented yet!');
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: 'Mind Q-mental', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
