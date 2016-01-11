/**
 * Created by samyuktab on 11/16/15.
 */






$(function(){
    $('.fakeLink1').click(function(e){

        console.log('select_link clicked');
        $('.hidden1').show();

    });
});

$(function(){
    $('.fakeLink2').click(function(e){

        console.log('select_link clicked');
        $('.hidden2').show();

    });
});


$(function(){
    $('.fakeLink3').click(function(e){

        console.log('select_link clicked');
        $('.hidden3').show();

    });
});


$(function(){
    $('.fakeLink4').click(function(e){

        console.log('select_link clicked');
        $('.hidden4').show();

    });
});


//$.ajax({
//    type: 'POST',
//    data: JSON.stringify(data),
//    contentType: 'application/json',
//    url: 'http://localhost:3001/send',
//    success: function(data) {
//        console.log('success');
//        //console.log(JSON.stringify(data));
//        console.log(data[0].name);
//        $("#user1").html(data[0].name);
//        $('.hidden1').show();
//
//    }
//});