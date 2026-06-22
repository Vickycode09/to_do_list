import { Component, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonIcon, IonLabel, IonList, IonReorderGroup, IonReorder, IonItemSliding, IonItemOptions, IonItemOption, AlertController } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {addOutline} from 'ionicons/icons';
import{Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})

export class Alert {
  private alertController = inject(AlertController);

  async presentAlert(headerText: string, messageText: string) {
    const alert = await this.alertController.create({
      header: headerText,
      message: messageText,
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmAlert(
    header: string,
    message: string,
    functionOk: () => void | Promise<void>,
    cancelText: string = 'Cancelar',
    confirmText: string = 'Aceptar'
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
        },
        {
          text: confirmText,
          role: 'confirm',
          handler: () => {
            functionOk();
          }
        }
      ]
    });

    await alert.present();
  }

  async showAlert(headerText: string, messageText: string) {
    await this.presentAlert(headerText, messageText);
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonIcon, IonLabel, IonList, IonReorderGroup, IonReorder, IonItemSliding, IonItemOptions, IonItemOption, FormsModule],
})
export class HomePage {

  task: string= "";
  tasks: string[] = [];
  private readonly KEY_TASKS = 'local_key_tasks';

  public alertService: Alert = inject(Alert);
  constructor() {
    addIcons({
      addOutline
    });
  }

  confirmDelete(task: string) {
    this.alertService.confirmAlert(
      'Aviso',
      `Deseas borrar la tarea ${task}`,
      () => this.deleteTask(task),
      'NO',
      'SI'
    );
  }

  async ionViewWillEnter() {
    const taskPreferences = await Preferences.get({ key: this.KEY_TASKS });

    if (taskPreferences.value) {
      const tasks = JSON.parse(taskPreferences.value);
      if (Array.isArray(tasks)) {
        this.tasks = tasks;
      }
    }
  }

  saveTaskOnLocal(){
    Preferences.set({
      key: this.KEY_TASKS,
      value: JSON.stringify(this.tasks)
    });
  }

  private deleteTask(taskRemove: string) {
    let index = this.tasks.findIndex(task => task === taskRemove);
    this.tasks.splice(index, 1);
  }

  actualizarPosiciones(event: any) {
    console.log("El arreglo antes del cambio:", this.tasks);
    this.tasks = event.detail.complete(this.tasks);
    console.log("El arreglo después del cambio:", this.tasks);
  }

  
  addTask(){
    this.tasks.push(this.task);
    console.log(this.task);
    this.alertService.presentAlert("Exito", "Tarea agregada");
    this.task = "";
  }

  trackByTask(index: number, task: string) {
    return task;
  }
}
