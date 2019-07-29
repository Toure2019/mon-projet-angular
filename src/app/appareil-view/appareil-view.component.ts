import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.css']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false;
  appareils: any[];
  appareilsSubscription: Subscription;

  lastUpdate = new Promise((resole, reject) => { 
    const date = new Date();
    setTimeout(() => {
      resole(date)
    }, 3000);
  });

  constructor(private appareilService: AppareilService){
    setTimeout(() => {
      this.isAuth = true
    }, 4000);
  }

  ngOnInit(){
    this.appareilsSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareilsList: any[]) => {
        this.appareils = appareilsList;
      },
      (error) => {
        console.log(' Erreur ! ', error);
      },
      () => {
        console.log('Processus terminé !');
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer(){
    this.appareilService.switchOnAll();
  }

  onEteindre(){ 
    if (confirm('Etes-vous sûr de vouloir éteindre tous les appareils ? ')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  onSaveAppareil(){
    this.appareilService.saveAppareilOnServer();
  }

  onFetchAppareils(){
    this.appareilService.getAppareilsFromServer();
  }

  ngOnDestroy(){
    this.appareilsSubscription.unsubscribe();
  }
}
