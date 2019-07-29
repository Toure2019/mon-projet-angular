import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private users: User[] = [{
  //   firstName: 'Touré',
  //   lastName: 'Youssouf',
  //   email: 'choogool@yahoo.fr',
  //   drinkPreference: 'Coca',
  //   hobbies: ['Series', 'Mangas']
  // }];

  private users: User[] = [
    new User('Touré', 'Youssouf', 'choogool@yahoo.fr', 'Coca', ['Series', 'Mangas'])
  ];

  userSubject = new Subject<User[]>();

  constructor() { } 

  emitUserSubject(){
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User){
    this.users.push(user);
    this.emitUserSubject();
  }
}
