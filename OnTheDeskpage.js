var firebaseConfig = {
    apiKey: "AIzaSyAYSJa70B_u2OQklUO25_1lCV9qG-GMHJA",
    authDomain: "onthedesk-51f19.firebaseapp.com",
    databaseURL: "https://onthedesk-51f19-default-rtdb.firebaseio.com",
    projectId: "onthedesk-51f19",
    storageBucket: "onthedesk-51f19.appspot.com",
    messagingSenderId: "470922193835",
    appId: "1:470922193835:web:67547e32a0d9c4d86140ee",
    measurementId: "G-QKP9W4BE42"
  };
  
  firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")
function send(){
      msg = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      })
      document.getElementById("message").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name1 = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_withtag = "<h4>" + name1 + "<img class='user_tick' src='tick.png'></h4> ";
message_withtag = "<h4 class='msg_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning ' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'> ";
span_withtag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>";
row=name_withtag + message_withtag + like_button + span_withtag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();
function update_like(msg_id){
      console.log("Click On the like button" + msg_id);
      button_id = msg_id;
      likes = document.getElementById(button_id).value;
      updated_like = Number(likes)+1;
      console.log(updated_like);
      firebase.database().ref(room_name).child(msg_id).update({
            like:updated_like
      })

}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html"
}