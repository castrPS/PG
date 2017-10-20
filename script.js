var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = parseFloat(window.getComputedStyle(canvas).width);
  canvas.height = parseFloat(window.getComputedStyle(canvas).height);
}

function decas(){
  for(var i=0; i<tam;i++){
    aux=points.slice();
    curves.push(tejau(i));
  }
}

function tejau(para){
  if (aux.length=1){
    return aux[0];
  }
  else{
    var aux1=[];
      for(var j in aux){
        if(i!=0){
          aux1.push({x: aux[j].x - (aux[j-1].x*(para/tam)), x: aux[j].y- (aux[j-1].y*(para/tam))});
        }
        aux=aux1;
      }
  }
}

function drawCircles() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i in points) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  var x=points[0].x;
  var y=points[0].y;
  for (var i in points) {
    
    if(i!=0){
    ctx.beginPath();
    ctx.strokeStyle = 'black'; //Cor do traço
    ctx.lineWidth = 2; //Espessura do traço
    ctx.moveTo(x,y); //Move o Ponteiro
    ctx.lineTo(x+points[i].x-points[i-1].x,y+points[i].y-points[i-1].y);
    x=x+points[i].x-points[i-1].x;
    y=y+points[i].y-points[i-1].y;
    ctx.stroke();
    }
  }

  decas();

  for (var i in curves) {
    ctx.beginPath();
    ctx.arc(curves[i].x, curves[i].y, 1, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  x=curves[0].x;
  y=curves[0].y;
  for (var i in curves) {
    
    if(i!=0){
    ctx.beginPath();
    ctx.strokeStyle = 'black'; //Cor do traço
    ctx.lineWidth = 2; //Espessura do traço
    ctx.moveTo(x,y); //Move o Ponteiro
    ctx.lineTo(x+curves[i].x-curves[i-1].x,y+curves[i].y-curves[i-1].y);
    x=x+curves[i].x-curves[i-1].x;
    y=y+curves[i].y-curves[i-1].y;
    ctx.stroke();
    }
  }

}

function dist(p1, p2) {
  var v = {x: p1.x - p2.x, y: p1.y - p2.y};
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function getIndex(click) {
  for (var i in points) {
    if (dist(points[i], click) <= 10) {
      return i;
    }
  }
  return -1;
}

var points = [];
var curves = [];
var aux =[];
var move = false;
var index = -1;
var tam=1000;

resizeCanvas();

canvas.addEventListener('mousedown', e => {
  var click = {x: e.offsetX, y: e.offsetY};
  index = getIndex(click);
  if (index === -1) {
    points.push(click);
    drawCircles();
  } else {
    move = true;
  }
});

canvas.addEventListener('mousemove', e => {
  if (move) {
    points[index] = {x: e.offsetX, y: e.offsetY};
    drawCircles();
  }
});

canvas.addEventListener('mouseup', e => {
  move = false;
});

canvas.addEventListener('dblclick', e => {
  if (index !== -1) {
    points.splice(index, 1);
    drawCircles();
  }
});

setInterval(() => {
  drawCircles();
}, 1000 / 30);
