video = "";
status="";
object=[];

function preload(){
    video = createVideo('video.mp4');
}



function start () {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded !");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
    image (video, 0 ,0,480,380);
    if (status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i< object.length; i++ ) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects deteced are : " + objects.length;
            fill('blue');
            percent = floor (objects[i].confidence*  100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15,objects[i].y + 15 );
            noFill();
            stroke('blue');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
        }
    }

    function gotResults(error, results) {
        if (error) {
            console.log(error);
        }
        console.log(results);
        objects = results;
    }