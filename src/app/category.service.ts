import { Injectable, QueryList } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db
    .list('/categories', (ref) => ref.orderByChild('name'))
    .snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key}))
      )
    );
  }

}
