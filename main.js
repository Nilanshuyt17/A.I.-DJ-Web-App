song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
 }

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(655, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Posenet is Initialized");
}

function draw() {
    image(video, 0, 0, 600, 500);
    
    fill("red");
    stroke("blue");
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 30);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 30);
        LeftWristYN = Number(leftWristY);
        remove_decimals = floor(LeftWristYN);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play1() {
    song.play();
    song.setVolume(0.1);
    song.rate(1);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = " + leftWristX + ", Left wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = " + rightWristX + ", Right wrist Y = " + rightWristY);
    }
}