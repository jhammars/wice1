import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';

// import { MypagePage } from '../mypage/MypagePage'
// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})

export class HomePage {
    itemCollection: AngularFirestoreCollection<Item>;
    items: Observable<Item[]>
    myCustomId: number;
    constructor(private afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
        this.itemCollection = this.afs.collection<Item>('items');
        this.items = this.itemCollection.valueChanges();
        this.myCustomId = 12;
    }

    goToMyPage() {
        this.navCtrl.push("my-page-name", {
            "id": this.myCustomId
        });
    } 
}
