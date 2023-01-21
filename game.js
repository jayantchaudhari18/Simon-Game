var buttonColours=["red","blue","yellow","green"];

var gamePattern=[];       //random colours generated are stored in this array
var userClickedPattern=[];//colour buttons on which the user clicks are stored in this array 



var started=false;//to check if the gaame has started or not
var level=0;      //to track level and simultaneously update level
var count =0;     //to check all elements in array are same


//when the game has not started press any key to start steps where the game begins level 
//is incremented and nextsequence is called.

$(document).keypress(function(){
   if(started==false){
   $("#level-title").text("level "+level);
   nextSequence();
   started=true;
}
});




   //On clicking button sound should be played
 
   $(".btn").click(function(){
   var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer((userClickedPattern.length)-1);
   });



   //for checking answer is correct or not
   function checkAnswer(currentLevel){
   if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      
         console.log("success");

         if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){

            nextSequence();

            },1000);
         }
      }
         else{
            console.log("fail");

         //playing sound of wrong from sounds
         playSound("wrong");

         $("body").addClass("game-over");

         setTimeout(function(){

         $("body").removeClass("game-over");

         },200);

         $("#level-title").text("Game Over, Press Any Key to Restart");
         
         //calling start over to start game again
         startOver();
         }
      }
         
      
   
   //On calling this function a random colour must flash with sound
   function nextSequence(){

   userClickedPattern=[];//setting the user clicked pattern to empty again
   level++;
   $("#level-title").text("level "+level);

     var  randomNumber=Math.floor(Math.random()*4);
     var randomChosenColour=buttonColours[randomNumber];

     gamePattern.push(randomChosenColour);
     
     $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

     //for playing sound
     playSound(randomChosenColour);
                                         
  }


//sound play

function playSound( name){
   var audio = new Audio(name+".mp3");
   audio.play();
}




//animation for click

function animatePress(currentColor) {
   $("#" + currentColor).addClass("pressed");
   setTimeout(function () {
     $("#" + currentColor).removeClass("pressed");
   }, 100);
 }
 

 function startOver(){
   level=0;
   gamePattern=[];
   started=false;
 }