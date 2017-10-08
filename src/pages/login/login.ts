import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData = {
    email: '',
    password: ''
  }
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }  
  
  login() {
    // Login Code here
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
    .then(auth => {
      // Do custom things with auth
    })
    // .catch(err => {
    //   // Handle error
    //   let toast = this.toastCtrl.create({
    //     message: err.message,
    //     duration: 1000
    //   });
    //   toast.present();
    // });    
  }
 
  signup() {
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }
}
