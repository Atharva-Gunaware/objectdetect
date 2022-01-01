var img="";
var status="";
object=[];

function preload(){
    img= loadImage("dog_cat.jpg");
}

function  setup(){
    canavs=createCanvas(600,500);
    canavs.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status:Detected Objects";
}

function draw(){
   image(img,0,0,600,500);

   if (status != "")
   {
       for (i=0; i < object.length; i++)
       {
           document.getElementById("status").innerHTML="Status : Object Detected";

           fill("red");
           percent= floor(object[i].confidence*100);
           text(object[i].label+" " + percent +" %", object[i].x , object[i].y);
           noFill();
           stroke("blue");
           rect(object[i].x, object[i].y , object[i].width, object[i].height);
       }
   }
   
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error, results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}
