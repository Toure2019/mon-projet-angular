import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { 

  tempsConnexion: number;
  counterSubscription: Subscription;
  
  constructor(private appareilService: AppareilService){} 

  ngOnInit(){
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.tempsConnexion = value;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Observable compmlete !');
      }
    );  
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }
}
