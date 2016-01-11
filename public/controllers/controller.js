/**
 * Created by samyuktab on 11/22/15.
 */

var forumApp = angular.module('forumApp', []);

forumApp.controller('ForumController', ['$scope', '$http',
    function ($scope, $http) {
        console.log("hello from controller");
        $scope.questionslist = {};
        $scope.answerText

        var getQuestions = function (keyword) {
            console.log("getQuestions",keyword);
            $http.post('/questionslist', {"keyword":keyword}).success(function (response) {
                console.log("I got the data I requested");
                console.log(response);
                $scope.questionslist = response.Questions;
                for (var a in $scope.questionslist) {
                    $scope.questionslist[a].answerShow = false;
                    $scope.questionslist[a].answerNotAvailable = true;
                    $scope.questionslist[a].writeAnswer = true;
                    $scope.questionslist[a].answerText = "";
                    $scope.questionslist[a].updateAnswerShow = false;
                    $scope.newAnswer = "";

                    for (var b in response.Answers) {
                        if(response.Answers[b].Answer_ID === $scope.questionslist[a].Question_ID && response.Answers[b].Answer_Text!=null) {
                            $scope.questionslist[a].answerText = response.Answers[b].Answer_Text;
                            $scope.questionslist[a].answerNotAvailable = false;
                            $scope.questionslist[a].writeAnswer = false;

                        }
                    }


                }
                });
        }
        var keyword = "";

        getQuestions();
        $scope.viewAnswer = function (id) {
            console.log(id);
            if (!$scope.questionslist[id].answerNotAvailable && $scope.questionslist[id] !== undefined)
                $scope.questionslist[id].answerShow = !$scope.questionslist[id].answerShow;

        }

// Ask question in text area
        $scope.askQuestion = function () {

            $http.post('/questionText', {"question": this.question}).success(function (response) {
                console.log("I got the data I requested on click of ask question");
                getQuestions();
            })
        }

        $scope.writeAnswer = function (id, answer) {
            console.log(id);
            $http.post('/insertAnswer', {"questionID": id, "answerText": answer}).success(function (response) {
                getQuestions();
            })
        }

        $scope.getData = function(){
            console.log("in getData:",this.keyword);
            getQuestions(this.keyword);
            //getSearchResults
            //$http.post('/questionListFiltered', {} )

        }

        $scope.showUpdateAnswer = function (id) {
            for(var i = 0; i<$scope.questionslist.length;i++){
                if($scope.questionslist[i].Question_ID == id){
                    $scope.questionslist[i].updateAnswerShow= ! $scope.questionslist[i].updateAnswerShow;
                    break;
                }
            }

        }

        $scope.updateAnswer= function(id,ans) {
            $http.post('/updateAnswer', {"questionID": id, "answerText": ans}).success(function (response) {
                getQuestions();
            })
        }



        //demo.$inject = ['$scope'];
        //
        //demo.directive("boxCreator", function($compile){
        //    return{
        //        restrict: 'A',
        //        link: function(scope , element){
        //            element.bind("click", function(e){
        //
        //                var childNode = $compile('<div class = "user"><p>{{answer_text}}</p></div>')(scope)
        //                element.parent().append(childNode);
        //
        //            });
        //
        //            scope.doStuff = function(){
        //                alert('hey');
        //            }
        //        }
        //    }
        //});


    }]);


//  };
// this allows questionslist to be used in home.html page
//$(function(){
//    $('.viewAnswer').click(function(e){
//
//        console.log('select_link clicked');
//      //  $('.hidden1').show();
//
//    });
//});

//$.ajax({
//    type: 'POST',
//    url: "http://localhost:3000/answer",
//    data: id,
//    contentType: 'application/json',
//    success: function (data) {
//        console.log(data);
//        //  window.location = "home.html";
//
//    }
//});