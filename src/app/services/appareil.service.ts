import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Appareil {
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppareilService {

  appareilsSubject = new Subject<Appareil[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Télévision',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  constructor(private httpClient: HttpClient) { }

  emitAppareilSubject(){
    this.appareilsSubject.next(this.appareils.slice());
  }

  switchOnAll(){
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  } 

  switchOffAll(){
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number){
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number){
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number){
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }

  addAppareil(name: string, status: string){
    let newAppareil = {
      id:0,
      name: '',
      status: ''
    }
    newAppareil.name = name;
    newAppareil.status = status;
    newAppareil.id = this.appareils[(this.appareils.length - 1)].id + 1;

    this.appareils.push(newAppareil);
    this.emitAppareilSubject();
  }

  saveAppareilOnServer(){
    this.httpClient
      .put('https://projet-angular-2019.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log(' Enregistrement effectué !');
        },
        (error) => {
          console.log('Erreur fatale ! ', error);
        }
      );
  }

  getAppareilsFromServer(){
    this.httpClient
      .get<any[]>('https://projet-angular-2019.firebaseio.com/appareils.json')
      .subscribe(
        (response: any[]) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Une erreur est survenue : ', error);
        },
        () => {
          console.log('Récupération des appareils depuis le server terminé avec succès !');
        }
      ); 
  }

}
