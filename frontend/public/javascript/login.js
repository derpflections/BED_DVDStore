$(document).ready(function () {   
    $("#Login").click(function () {   
       var id=$('#email').val(); 
       var pwd=$('#pwd').val(); 
       var data = "{\"email\":\""+id+"\", \"password\":\""+pwd+"\"}"; 
       console.log(data); 
       $.ajax({                                                                
            url: 'http://localhost:8081/user/login' ,   
            type: 'POST',  
            data: data, 
            contentType: "application/json; charset=utf-8", 
            dataType: "json",   
            success: function (data, textStatus, xhr) {   
                if (data != null){                     
                   localStorage.setItem('token',data.token); 
                   localStorage.setItem('userInfo',data.UserData); 
                   window.location.assign("http://localhost:3001/profile.html"); 
                } else { 
                    console.log("Error"); 
                }                                                                  
            },   
            error: function (xhr, textStatus, errorThrown) {   
                console.log('Error in Operation');   
            }   
       });    
       return false; 
    });   
});   