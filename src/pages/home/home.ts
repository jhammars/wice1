import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';
import { AngularFirestore }             from 'angularfire2/firestore';
import { AngularFirestoreCollection }   from 'angularfire2/firestore';
import { AngularFirestoreDocument }     from 'angularfire2/firestore';
import { Observable }                   from 'rxjs/Observable';
import { NavController, NavParams }     from 'ionic-angular';

// import { MypagePage } from '../mypage/MypagePage'
// @IonicPage()
@Component({
  selector:     'page-home',
  templateUrl:  'home.html'  
})

export class HomePage implements OnInit {

    noteDoc:    AngularFirestoreDocument<any>;
    note:       Observable<any>;

    newContent: number;

    itemCollection: AngularFirestoreCollection<any>;
    items: Observable<any[]>

    myCustomId: number = 12;

    constructor(private afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInit() {
        this.itemCollection = this.afs.collection<any>('items', ref => {
            return ref.orderBy('name', 'desc')//.where('price', '>', 4) //.orderBy('name', 'desc')
        });
        this.items = this.itemCollection.valueChanges();

        this.noteDoc = this.afs.doc('items/YRyIWT50CuN0BiIDtIKY')
        this.note = this.noteDoc.valueChanges()

        let myCollections: any = this.afs.collection;
        console.log(myCollections);
        console.log("hello");
    }

    user = {
        name: '',
        age: ''
    };
    login() {
        console.log(this.user.name)
        console.log(this.user.age)
    }

    myGetDocsInCollection() {
        
    }

    updateContent() {
        this.noteDoc.update({price: this.newContent})
    }

    goToMyPage() {
        this.navCtrl.push("my-page-name", {
            "id": this.myCustomId
        });
    } 
}
