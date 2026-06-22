import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonIcon } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {addOutline} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonIcon, FormsModule],
})
export class HomePage {

  task: string= "";
  constructor() {
    addIcons({
      addOutline
    });
  }

  addTask(){
    console.log("La tarea es: " + this.task);
  }
}
