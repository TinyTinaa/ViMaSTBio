// var x=180, y=40;
// var x1 = x4 =100, y1 = 20, y4 = 60;
var xx, yy;



// coordonnees.push([x,y]);
//
// var x = 380, y=40;
// coordonnees.push([x,y]);

var transitions = {
  a: [[["1","0"],"b=1","c=1"]],
  b: [[["0","3"],"d=1"], [["0","1"],"c=1"], [["2", "1"]],[["2","1"],"d=1"], [["2","1"],"d=1"]],
  c: [[["0","1"],"d=1"]],
  d: [[["0","1"],"b=1"],[["0","1"],"c=1"]],
  initial_context: " \"a\" = 0, \"b\" = 0, \"c\" = 0, \"d\" = 0",
  nbre_arcs: 9};

var auto = [2,4,2,2];


var coordonnees = [];
for (i=0; i<transitions['nbre_arcs']; i++){
  coordonnees.push([0,0]);
}

function setup() {
  createCanvas(900, 800);
}


var dragged = false;
var pt1 = document.getElementById("arc1");
var pt2 = document.getElementById("arc2");



function draw(){
  for (var i=0, c=auto.length ; i<c;i++){
    automate(auto[i], 140+i*230,140,30,30);
  }

  var k = 1, n=1, num_arc=0;
  for (var id in transitions){
    if (id!= "initial_context"){
      //la variable e1 permet de savoir si c'est le premier arc sortant de auto ou non;
      //On initialise à -1 car le premier est forcément la première transition sortante
      var e1 = -1;
      for (var i=0, c=transitions[id].length; i<c; i++){
        var curTrans = transitions[id][i];
        if (curTrans[0][0]==e1){
          k+=1;
        }
        else{
          k=1;
        }
        drawArc(parseInt(curTrans[0][0]), parseInt(curTrans[0][1]),n,k, num_arc, coordonnees);
        num_arc+=1;

        e1=curTrans[0][0];
      }
    }
    n+=1;
    k=1;
  }


  // bezier(x1, y1, coordonnees[0][0], coordonnees[0][1]-30, coordonnees[0][0], coordonnees[0][1]+30, x4, y4);
  // xx = bezierPoint(x1, coordonnees[0][0], coordonnees[0][0], x4, 1/2);
  // yy = bezierPoint(y1, coordonnees[0][1]-30, coordonnees[0][1]+30, y4, 1/2);
  //
  // pt1.style.top = yy+ "px";
  // pt1.style.left = xx + "px";
  // fill(255);
  // ellipse(xx, yy, 5, 5);
  //
  // noFill();
  // bezier(x1, y1, coordonnees[1][0], coordonnees[1][1]-30, coordonnees[1][0], coordonnees[1][1]+30, x4, y4);
  // xx2 = bezierPoint(x1, coordonnees[1][0], coordonnees[1][0], x4, 1/2);
  // yy2 = bezierPoint(y1, coordonnees[1][1]-30, coordonnees[1][1]+30, y4, 1/2);
  //
  // pt2.style.top = yy2+ "px";
  // pt2.style.left = xx2 + "px";
  // fill(255);
  // ellipse(xx2, yy2, 5, 5);
}

var xi, xj, yi, yj;

function move(evt) {
    if (dragged) {
      clear();
      coordonnees[xi][xj] = mouseX+25;
      coordonnees[yi][yj]= mouseY;
    }
}

function stopDrag() {
    dragged = false;
}

pt1.onmousedown = function(evt) {
    dragged = true;
    xi = 0; xj=0;
    yi = 0; yj = 1;
}

pt2.onmousedown = function(evt) {
    dragged = true;
     xi = 1; xj=0;
     yi = 1; yj = 1;
}

document.onmousemove = move;
document.onmouseup = stopDrag;


//Function automate draw automata with paramaters :
//n = number of transitions for this auomata
//x1,y1,x2 and y2 allows to place correctly the automata
function automate(n,x1,y1,x2,y2){
    for (var i=0; i<n; i++){
      ellipse(x1,y1+(5-i-1)*50,x2,y2);
    }
    noFill();
    rect((x1-x2), (y1-y2+(5-n)*50), 2*y2, 110+(n-2)*50, 20, 20, 20);
}



function drawArc(e1,e2,a,k,num_arc, coordonnees){

  var x = 155+(a-1)*230,
      y= 140+(4-e1)*50-(e2-e1)*25,
      h = 2+(e2-e1)*50, x1, x2, x3, x4,y1, y2, y3, y4;

 if (k%2==0){

    if (e2<e1){
      x1 = x4 = x;
      x2 = x3 =  x-30+50*((k+1)/2)+(e1-e2-1)*15;
      y1 = y+26+(e1-e2-1)*25;
      y2 = y+(e1-e2-1)*25+20;
      y3 = y-(e1-e2-1)*25-20;
      y4 = y-26-(e1-e2-1)*25;
      line(x,y-h/2, x+8,y-h/2-8);
      line(x,y-h/2, x+8,y-h/2+8);
      }
    else {
      x1 = x4 = x-30;
      x2 = x3 =  x-30-50*((k+1)/2)-(e1-e2-1)*15;
      y1 =  y+24+(e2-e1-1)*25;
      y2 = y+(e2-e1-1)*25+20;
      y3 = y-(e2-e1-1)*25-20;
      y4 =  y-26-(e2-e1-1)*25;
      line(x-38,y-h/2-9, x-30,y-h/2-1);
      line(x-38,y-h/2+7, x-30,y-h/2-1);
      }
  }

  else {

    if (e2>=e1){
      x1 = x4 = x;
      coordonnees[num_arc][0] = x+50*((k+1)/2)+(e2-e1-1)*15;
      coordonnees[num_arc][1] = y ;
      y1 = y+26+(e2-e1-1)*25;
      y4 =  y-26-(e2-e1-1)*25;
      line(x,y-h/2, x+8,y-h/2-8);
      line(x,y-h/2, x+8,y-h/2+8);
      bezier(x1, y1, coordonnees[num_arc][0], coordonnees[num_arc][1]+(e2-e1-1)*25+20, coordonnees[num_arc][0],   coordonnees[num_arc][1]-(e2-e1-1)*25-20, x4, y4);
      xx = bezierPoint(x1, coordonnees[num_arc][0], coordonnees[num_arc][0], x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e2-e1-1)*25+20,  coordonnees[num_arc][1]-(e2-e1-1)*25-20, y4, 1/2);

      }
    else {
      x1 = x4 = x-30;
      x2 = x3 = x-55-50*(k+1)/2-(e2-e1-1)*15;
      y1 = y+25+(e1-e2-1)*25;
      y2 = y+(e1-e2-1)*25+20;
      y3 = y-(e1-e2-1)*25-20;
      y4 = y-26-(e1-e2-1)*25;
      line(x-38,y-h/2-9, x-30,y-h/2-1);
      line(x-38,y-h/2+7, x-30,y-h/2-1);
    }
  }
  // bezier(x1,  y1, x2, y2, x3, y3, x4, y4);
  // xx = bezierPoint(x1, coordonnees[0][0], coordonnees[0][0], x4, 1/2);
  // yy = bezierPoint(y1, coordonnees[0][1]-30, coordonnees[0][1]+30, y4, 1/2);

  var arc_div = document.createElement('div');
  arc_div.id = 'pt' + num_arc;

}
