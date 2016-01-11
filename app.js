
var express = require('express');
var app = express();
var http = require('http').Server(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//backend variables

var stringQuestions = "";
var stringAnswers = "";

// use express to access static files

app.use('/', express.static(__dirname + '/public'));


// Configure the client orientdb by creating
// a variable for orientdb driver
var orientdb = require("orientjs");
var server = orientdb({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'admin'
});

var db = server.use({
    name: 'OrientDBProject',
    username: 'root',
    password: 'admin'
});

var username = "";
app.post('/myaction', function (req, res) {
    username = req.body.username;
    console.log("hi");
    res.send('You sent the name "' + req.body.username + '".');
    console.log("hello   " + req.body.username);

});
// Query to get all the questions from Question and Answer class
// based on either a keyword or none
var questionID = 0;
var keyword = '';
app.post('/questionslist', function (req, res) {
    var keyword = req.body.keyword;
    console.log("keyword" , keyword)
        if(keyword == '' || keyword==undefined){
        console.log("hello in");
        db.query('select from Question', {}).then(function (results) {
            stringQuestions = results;
            db.query('select from Answer', {}).then(function (results1) {
                stringAnswers = results1;
                res.json({"Questions": stringQuestions, "Answers": stringAnswers});

            });

        });
    }
    else{
        console.log("else");
        db.query('select from Question where Question_Text like :searchkey', {
            params: {
                searchkey : "%" + keyword + "%"
            }
        }).then(function (results) {
            stringQuestions = results;
            console.log("results:"+stringQuestions)
            db.query('select from Answer', {}).then(function (results1) {
                stringAnswers = results1;
                res.json({"Questions": stringQuestions, "Answers": stringAnswers});
    
            });
    
        });
    }
});

var question_id = "";

app.listen(3000, function () {
    console.log('Listening');
});

//get question_id for each answer
// test delete

app.get('/deletequestion', function(req,res){
    db.query('delete vertex from Answer where Answer_Text=:abc',
        {
            params: {
                abc: ''
            }
        }
    ).then(function (response){
        console.log(response); //an Array of records inserted
    });
    db.query('delete vertex from Question where username=:abc',
        {
            params: {
                abc: ''
            }
        }
    ).then(function (response){
        console.log(response); //an Array of records inserted
    });

})

app.post('/answer', function (req, res) {
    console.log("hello id " + req.body.qid);
    console.log("hello id 00 " + req.questionID);
    question_id = req.questionID;

});

// get question text for the new question
// on click of ask question, question gets
// inserted in database
var question_text = "";
//var questionID =
app.post('/questionText', function (req, res) {
    console.log("hello id " + req.body.question);

    question_text = req.body.question;
    var maxQuestionID = 1;
    for(var a in stringQuestions){
        if(stringQuestions[a].Question_ID > maxQuestionID)
            maxQuestionID = stringQuestions[a].Question_ID;
    }
    db.query('insert into Question (Question_ID, Question_Text, username) values (:id, :qid, :user)',
        {
            params: {
                id : maxQuestionID+1,
                qid: question_text,
                user: username
            }
        }
    ).then(function (response) {
        console.log(response); //an Array of records inserted
        res.end("end")
    });

});
// Answer an existing question
// answer gets inserted in database
app.post('/insertAnswer', function (req, res) {
    console.log("insert ans");
    var answer_text = req.body.answerText;
    var answerID = req.body.questionID;
    db.query('insert into Answer (Answer_ID, Answer_Text, username) values (:aid, :text, :user)',
        {
            params: {
                aid: answerID,
                text: answer_text,
                user: username
            }
        }
    ).then(function (response) {
        console.log(response); //an Array of records inserted
        res.end("end")
    });

});

// edit an answer if required.s
app.post('/updateAnswer',function(req,res){
    console.log("update ans");
    var answer = req.body.answerText;
    var answerID = req.body.questionID;
    db.query('update Answer set Answer_Text = :text where Answer_ID=:aid',
    {
        params:{
            text:answer,
            aid:answerID
        }
    }
).then(function (response){
        console.log(response);
        res.end("end");
    });
});




//delete a question






//person1 = {
//  name: 'Tim',
//  email: 'tim@gmail.com',
//  number: '(222) 222-1111'
//};
//
//person2 = {
//  name: 'Emily',
//  email: 'emily@gmail.com',
//  number: '(999) 222-1111'
//};
//
//


//db.query('select from user where name:name', {
//  params: {
//    name:username
//  }
//}).then(function (results){
//  console.log("yu");
//  string1=results;
//
//  console.log(results);
//});


//var username = "";
//app.post('/myaction', function(req, res) {
//  username = req.body.username;
//  console.log("hi");
//  res.send('You sent the name "' + req.body.username + '".');
//  console.log("hellooo   "+req.body.username);
//
//});
//
//app.post('/send',function(req,res){
//  res.json(string1);
//  console.log('body: ' + JSON.stringify(req.body));
//  res.send(req.body);
//});


//db.query('select Question_Text from Question', {
//
//}).then(function (results){
////  string1=results;
// // string1=  JSON.stringify(results);
//
//  console.log(results);
//});


//app.post('/login',function(req,res){
//
//
//})






