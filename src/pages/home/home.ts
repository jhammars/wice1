import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';
import { Injectable }                   from '@angular/core';
import { AngularFirestore }             from 'angularfire2/firestore';
import { AngularFirestoreCollection }   from 'angularfire2/firestore';
import { AngularFirestoreDocument }     from 'angularfire2/firestore';
import { AngularFireAuth }              from 'angularfire2/auth';
import { Observable }                   from 'rxjs/Observable';
import { NavController }                from 'ionic-angular';
import { NavParams }                    from 'ionic-angular';

// import { MypagePage } from '../mypage/MypagePage'
// @IonicPage()
@Component({
  selector:     'page-home',
  templateUrl:  'home.html'  
})

@Injectable()
export class HomePage implements OnInit {

    // noteDoc:    AngularFirestoreDocument<any>;
    // note:       Observable<any>;

    newContent: number;

    itemCollection: AngularFirestoreCollection<any>;
    items: Observable<any[]>

    myCustomId: number = 12;
    myNewId: any;

    myUserId: string;

    constructor(
        private afs: AngularFirestore, 
        private afAuth: AngularFireAuth,
        public navCtrl: NavController, 
        public navParams: NavParams
        // public publicAfAuth: AngularFireAuth
    ){
        // console.log(this.afAuth.authState);
        // this.afAuth.authState.subscribe(auth => console.log(auth.uid));
    }

    ngOnInit() {
        this.subToUid();        
        // console.log('OnInit user id: ' + this.myUserId);
        this.itemCollection = this.afs.collection<any>('items', ref => {
            return ref.orderBy('name', 'desc')
            //.where('price', '>', 4) //.orderBy('name', 'desc')
        });
        this.items = this.itemCollection.valueChanges();

        // this.noteDoc = this.afs.doc('items/YRyIWT50CuN0BiIDtIKY')
        // this.note = this.noteDoc.valueChanges()

        let myCollections: any = this.afs.collection;
        // console.log(myCollections);
        // console.log(this.afs.doc('items/YRyIWT50CuN0BiIDtIKY'));                
    }


    private subToUid() {
        this.afAuth.authState.subscribe(auth => {
            if (auth) this.myUserId = auth.uid;
                // console.log(auth.uid);
                // console.log('user id: ' + this.myUserId);
        });
    }

    myData = {
        name: '',
        age: '',
        authUid: ''
    }
    myAddData() {
        // console.log(this.user.name)
        // console.log(this.user.age)
        this.myNewId = this.afs.createId();
        this.myData.authUid = this.afAuth.auth.currentUser.uid;
        // console.log(this.myNewId);
        this.afs.collection("items").doc(this.myNewId).set(Object.assign(
            {}, 
            this.myData
        ));
        console.log(this.myData);
        // console.log(this.afs.doc('items/' + this.myNewId));        
    }

    myGetUserId() {
        console.log(this.myUserId);
    }

    // updateContent() {
    //     this.noteDoc.update({price: this.newContent})
    // }

    goToMyPage() {
        this.navCtrl.push("my-page-name", {
            "id": this.myCustomId
        });
    } 
}
