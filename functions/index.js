const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// import * as functions from 'firebase-functions';

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!"); 
});

// Listen for any change on document `N9nX99Oi8Nl4892YUOyS` in collection `mytest`
exports.myFunctionName = functions.firestore.document('mytest/N9nX99Oi8Nl4892YUOyS').onWrite((event) => {
    console.log("Just changed doc with id N9nX99Oi8Nl4892YUOyS");
    return false;
});

// let mytest = functions.database.ref('/mytest').onWrite(console.log("My test works properly"));