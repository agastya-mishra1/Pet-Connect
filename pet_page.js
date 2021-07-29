// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCEpKaewaLiJxGmHmRfrM9-nrrIXkW6Eyc",
  authDomain: "pet-connect-adaa4.firebaseapp.com",
  databaseURL: "https://pet-connect-adaa4-default-rtdb.firebaseio.com",
  projectId: "pet-connect-adaa4",
  storageBucket: "pet-connect-adaa4.appspot.com",
  messagingSenderId: "66864349083",
  appId: "1:66864349083:web:f8ff7a95ba240956946b3e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("Username");
pass_word = localStorage.getItem("Password");
room_name=localStorage.getItem("room_name");  

function send(){
msg = document.getElementById("msg").value;   
firebase.database().ref(room_name).push({
    name:user_name, 
    message:msg,   
    like:0
    });
    document.getElementById("msg").value="";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
  firebase_message_id = childKey;
  message_data = childData;
//Start code
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];

name_tag = "<h4>"+name+ "<img class='user_tick' src='tick1.png'></h4>";
message_tag = "<h4 class='message_h4'>"+message+"</h4>";
like_tag ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
span_tag="<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";
row = name_tag + message_tag + like_tag + span_tag;
document.getElementById("output").innerHTML+=row;

//End code
} });  }); }
getData();
function update_like(mess){
button_id=mess;
likes=document.getElementById(button_id).value;
updated=Number(likes)+1;
firebase.database().ref(room_name).child(mess).update({
like:updated  
});   
}
function logout(){
localStorage.removeItem("Username");      
localStorage.removeItem("room_name");
localStorage.removeItem("Password")
window.location="index.html";      
}
