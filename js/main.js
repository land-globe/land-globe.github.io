// ES6 Modules or TypeScript
// import Swal from 'sweetalert2'

// // CommonJS
// const Swal = require('sweetalert2')


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAK5wjiPCTwIsX9yMzl6j1tKqzh1PMyRl4",
    authDomain: "landglobe-d3aaa.firebaseapp.com",
    projectId: "landglobe-d3aaa",
    storageBucket: "landglobe-d3aaa.appspot.com",
    messagingSenderId: "596476482789",
    appId: "1:596476482789:web:18a6a7148223be3a13300c",
    measurementId: "G-RSF6ZECP6N"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var km;
var list;

var i = 0 ;
function progress_bar(){
// progression de la barre
if(i==0){
    i = 1;
    var elem = document.getElementById("myBar");

    let percentage_max = 98;
    if(km<40075){
    percentage_max = (km/40075)*100;
    } 
    console.log(percentage_max)
    
    var nb_step = 30

    let step = percentage_max / nb_step;
    var width = 0;

    var id = setInterval(frame, nb_step);      
    // console.log(width)
    function frame() {
    if (width >= percentage_max) {
        clearInterval(id);
        i = 0;
    } else {
        width += step;
        elem.style.width = width.toString() + "%";
        // console.log(width)
        
    }
    }
}
}

// function read_database(){
//     var dataB = firebase.database().ref('km/');
//     dataB.on('value', (snapshot) => {
//         const data = snapshot.val();
//         console.log(data)
//         document.getElementById('nb').innerHTML = data; 
//         km = data;
//         progress_bar();
//     });
//     // console.log("firebase : " + database.km.toString())
// }

// function write_database() {
//     var to_add = parseInt(document.getElementById('km').value);
//     km = km + to_add;
//     console.log("Write : " + km);
//     firebase.database().ref('/').set({
//         km : km,
//     });
// }

function read_list(){
    var dataB = firebase.database().ref('kms/');
    dataB.on('value', (snapshot) => {
        list = snapshot.val();
        km=0;
        list.forEach(el => {
            km+=el
        });
        console.log(km);
        document.getElementById('nb').innerHTML = km; 
        progress_bar();

    });
// console.log("firebase : " + database.km.toString())
}

function write_list(){
    var to_add = parseInt(document.getElementById('km').value);
    if(to_add <= 50) {
        list.push(to_add)
        console.log("Write : " + to_add);
        firebase.database().ref('/').set({
            kms : list,
            km : km
        });
        Swal.fire({
            icon: 'success',
            title: 'Felicitation !',
            text: 'Votre participation de ' + to_add.toString() + ' kms ?? bien ??t?? prise en compte.'
        })
        disable_btn()

    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Attention !',
            text: 'Vous ne pouvez pas ajouter plus de 50km ?? la fois.'
        })
    }
    document.getElementById('km').value = '';
}


function disable_btn(){
    document.getElementById("add_km_btn").disabled = true;
    setTimeout(function(){document.getElementById("add_km_btn").disabled = false;},10000);
}