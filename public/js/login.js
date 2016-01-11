/**
 * Created by samyuktab on 11/16/15.
 */

function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    obj = {};
    obj.username = username;

    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/myaction",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            window.location = "home.html";
        }
    });
}

// Under construction
function signUp(){
        window.location = "signup.html";

}

// Under construction
function register(){
    alert("Question asked. Please check again for answer");
}
