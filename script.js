var canvas = document.getElementById('canvas');
var avaliacoes = document.getElementById('avaliacoes');
var ctx = canvas.getContext('2d');
var criarNova=document.getElementById("novaCurva");

function resizeCanvas() {
  canvas.width = parseFloat(window.getComputedStyle(canvas).width);
  canvas.height = parseFloat(window.getComputedStyle(canvas).height);
}

function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}

function decas(){
  curves[0]=[];

  for(var i=0; i<=avaliacoes.value;i++){
    aux=[];
    for (var j in points[0]){
      aux.push(points[0][j]);
    }
    curves[0].push(tejau(i));
  }
}

function tejau(para){
  if (aux.length==1){
    return aux[0];
    alert(aux[0]);
  }
  else{
    var aux1=[];
      for(var j in aux){
        if(j!=0){
          aux1.push({x: (aux[j-1].x*(para/avaliacoes.value)) + (aux[j].x*(1-para/avaliacoes.value)), y: (aux[j-1].y*(para/avaliacoes.value)) + (aux[j].y*(1-para/avaliacoes.value))});
        }
      }
    aux=[];
    for (var j in aux1){
      aux.push(aux1[j]);
    }
    return tejau(para);
  }
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  

  if(document.getElementById('pontos').checked){
  for(var j in points){
  for (var i in points[j]) {
    ctx.beginPath();
    ctx.arc(points[j][i].x, points[j][i].y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(points[j][i].x, points[j][i].y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  }
  }

  if(document.getElementById('poligonais').checked){
  for(var j in points){
  var x=points[0][0].x;
  var y=points[0][0].y;
  for (var i in points[0]) {
    
    if(i!=0){
      ctx.beginPath();
      ctx.strokeStyle = 'black'; //Cor do traço
      ctx.lineWidth = 2; //Espessura do traço
      ctx.moveTo(x,y); //Move o Ponteiros
      ctx.lineTo(points[0][i].x,points[0][i].y);
      x=points[0][i].x;
      y=points[0][i].y;
      ctx.stroke();
    }
  }
  }


  if(document.getElementById('curvas').checked){
  x=curves[0][0].x;
  y=curves[0][0].y;
  for (var i in curves[0]) {
    if(i!=0){
      ctx.beginPath();
      ctx.strokeStyle = 'black'; //Cor do traço
      ctx.lineWidth = 2; //Espessura do traço
      ctx.moveTo(x,y); //Move o Ponteiro
      ctx.lineTo(curves[0][i].x,curves[0][i].y);
      x=curves[0][i].x
      y=curves[0][i].y;
      ctx.stroke();
    }
  }
}
}

function dist(p1, p2) {
  var v = {x: p1.x - p2.x, y: p1.y - p2.y};
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function getIndex(click) {
  for (var j in points){
  for (var i in points[j]) {
    if (dist(points[j][i], click) <= 5) {
      return i;
      nowCurve=j;
    }
  }
}
  return -1;
}

var nowCurve=0;
var points= [];
var curves= [];
curves.push([]);
points.push([]);
var aux =[];
var parametrics=[];
var move = false;
var index = -1;

resizeCanvas();

canvas.addEventListener('mousedown', e => {
  var click = {x: e.offsetX, y: e.offsetY};
  index = getIndex(click);
  if (index === -1) {
    points[nowCurve].push(click);
    decas();
  } else {
    move = true;
  }
});

canvas.addEventListener('mousemove', e => {
  if (move) {
    points[nowCurve][index] = {x: e.offsetX, y: e.offsetY};
    draw();
    decas();
    draw();
  }
});

canvas.addEventListener('mouseup', e => {
  move = false;
});

canvas.addEventListener('dblclick', e => {
  if (index !== -1) {
    points[nowCurve].splice(index, 1);
    decas();
  }
});

avaliacoes.addEventListener('change', function () {
    draw();
});

criarNova.addEventListener('click', function() {
  var nochange=-1;
  for(var i in points){
    if(points[i]===[]){
      nochange=i;
    }
  }
  if(nochange==-1){
    points.push([]);
    nowCurve=points.length;
  }else{
    nowCurve=nochange;
  }
})

setInterval(() => {
    draw();
}, 1/30);
