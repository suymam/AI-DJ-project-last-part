song_1 = "";
song_2 = "";
leftWirstX = 0;
leftWirstY = 0;
rightWirstX = 0;
rightWirstY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status ="";
song2_status ="";

function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log("pose NEt has been initialised");
}

function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    console.log("Left wrist score = " + scoreLeftWrist);
    console.log("Right wrist score = " + scoreRightWrist);
    leftWirstX = results[0].pose.leftWrist.x;
    leftWirstY = results[0].pose.leftWrist.y;
    rightWirstX = results[0].pose.rightWrist.x;
    rightWirstY = results[0].pose.rightWrist.y;


    console.log("Left wrist X = " + leftWirstX + " left wrist y = " + leftWirstY);
    console.log("Right wrist X = " + rightWirstX + " right wrist y = " + rightWirstY);
}
}


function draw(){
    image(video,0,0,600,500);
    song1_status = song_1.isPlaying();
    song2_status = song_2.isPlaying();
    fill("red");
    stroke("black");


    if(scoreRightWrist >0.2){
cirlce(rightWirstX,rightWirstY,20);
song_2.stop();
if(song1_status == false){
song_1.play();
document.getElementById("song").innerHTML ="Playing -  harry potter"; 
}
    }



    if( scoreLeftWrist >0.2){

    circle(leftWristX,leftWristY,20);
song_1.stop();
    if(song2_status ==false){
    song_2.play();
    document.getElementById("song").innerHTML = "playing - Peter parker";
    }
    
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}