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
  for(k in points){
  curves[k]=[];

  for(var i=0; i<=avaliacoes.value;i++){
    aux=points[k];
    curves[k].push(tejau(i));
  }
  }
}

function unitdecas(k){
  curves[k]=[];

  for(var i=0; i<=avaliacoes.value;i++){
    aux=points[k];
    curves[k].push(tejau(i));
  }
}

function tejau(para){
  while(aux.length>1){
    var aux1=[];
      for(var j in aux){
        if(j!=0){
          aux1.push({x: (aux[j-1].x*(para/avaliacoes.value)) + (aux[j].x*(1-para/avaliacoes.value)), y: (aux[j-1].y*(para/avaliacoes.value)) + (aux[j].y*(1-para/avaliacoes.value))});
        }
      }
    aux=aux1;
    
}
   return aux[0];
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for(var j in points){
  if(document.getElementById('pontos').checked){
  
  for (var i in points[j]) {
    ctx.beginPath();
    ctx.arc(points[j][i].x, points[j][i].y, 6, 0, 2 * Math.PI);
    if(nowCurve==j)
      ctx.fillStyle = 'blue';
    else
      ctx.fillStyle = 'black';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(points[j][i].x, points[j][i].y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  }

  if(document.getElementById('poligonais').checked){
  var x=points[j][0].x;
  var y=points[j][0].y;
  for (var i in points[j]) {
    
    if(i!=0){
      ctx.beginPath();
      if(nowCurve==j)
        ctx.strokeStyle = 'blue';
      else
        ctx.strokeStyle = 'black';
      ctx.lineWidth = 2; //Espessura do traço
      ctx.moveTo(x,y); //Move o Ponteiros
      ctx.lineTo(points[j][i].x,points[j][i].y);
      x=points[j][i].x;
      y=points[j][i].y;
      ctx.stroke();
    }
  }
  }


  if(document.getElementById('curvas').checked){
  x=curves[j][0].x;
  y=curves[j][0].y;
  for (var i in curves[j]) {
    if(i!=0){
      ctx.beginPath();
      if(nowCurve==j)
        ctx.strokeStyle = 'blue';
      else
        ctx.strokeStyle = 'black';
      ctx.lineWidth = 2; //Espessura do traço
      ctx.moveTo(x,y); //Move o Ponteiro
      ctx.lineTo(curves[j][i].x,curves[j][i].y);
      x=curves[j][i].x
      y=curves[j][i].y;
      ctx.stroke();
    }
  }
}
}
}

function dist(p1, p2) {
  var v = {x: p1.x - p2.x, y: p1.y - p2.y};
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function getIndex(click) {
  if(!criarNova.disabled){
  for (var j in points){
  for (var i in points[j]) {
    if (dist(points[j][i], click) <= 5) {
      return i;
    }
  }
  }
  }
  return -1;
}

function getCurve(click) {
  if(!criarNova.disabled){
  for (var j in points){
  for (var i in points[j]) {
    if (dist(points[j][i], click) <= 5) {
      return j;
    }
  }
}
}
  return nowCurve;
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
criarNova.disabled=true;

resizeCanvas();

canvas.addEventListener('mousedown', e => {
  var click = {x: e.offsetX, y: e.offsetY};
  index = getIndex(click);
  nowCurve = getCurve(click);
  if (index === -1) {
    points[nowCurve].push(click);
    criarNova.disabled=false;
    unitdecas(nowCurve);
  } else {
    move = true;
  }
});

canvas.addEventListener('mousemove', e => {
  if (move) {
    points[nowCurve][index] = {x: e.offsetX, y: e.offsetY};
    unitdecas(nowCurve);  
  }
});

canvas.addEventListener('mouseup', e => {
  move = false;
});

canvas.addEventListener('dblclick', e => {
  if (index !== -1) {
    points[nowCurve].splice(index, 1);
    unitdecas(nowCurve);
    if(points[nowCurve].length==0){
      points.splice(nowCurve,1);
      curves.splice(nowCurve,1);
    }
  }
});

avaliacoes.addEventListener('change', function () {
    decas();
    draw();
});

criarNova.addEventListener('click', function() {
    points.push([]);
    curves.push([]);
    nowCurve=points.length-1;
    criarNova.disabled=true;
})

setInterval(() => {
    unitdecas(nowCurve);
    draw();
}, 1);
