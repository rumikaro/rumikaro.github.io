$(document).ready(function(){
    var student = {
        "name": "Justin Timberlake",
        "phone": "054-26569845",
        "student_email": "juston@blabla.com",
        "student_image": "uploads/janeausten.jpg",
    };

    $("#post").click(function(){
        $.post("localhost:3000/api/students", function(student, status){
            console.log("Data: " + student + "\nStatus: " + status);
        });
    });
});

