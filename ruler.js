// Add additional aspect ratios here, e.g. [w,h]
var aspectRatios = [
  [5,8],
  [1,1],
  [4,3],
  [5,3],
  [16,9],
  [2,1],
  [3,1],
  [4,1]
];

var board = document.createElement('div');
var ruler = document.createElement('div');
var coord = document.createElement('div');

board.setAttribute('id', 'ar-select-board');
ruler.setAttribute('id', 'ar-select');
ruler.setAttribute('hidden', 'true');
coord.setAttribute('id', 'ar-select-coord');

ruler.appendChild(coord);
board.appendChild(ruler);
document.body.appendChild(board);

var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
var track = false;

function nearest(w, h) {
  var targetRatio = w/h;
  var rs = aspectRatios.map(function(el) {
    return Math.abs(1 - targetRatio / (el[0] / el[1]));
  });
  
  return aspectRatios[rs.indexOf(Math.min.apply(Math, rs))];
}
function reCalc() {
  var x3 = Math.min(x1,x2);
  var x4 = Math.max(x1,x2);
  var y3 = Math.min(y1,y2);
  var y4 = Math.max(y1,y2);
  
  var width = x4 - x3;
  var height = y4 - y3;
  
  ruler.style.left = x3 + 'px';
  ruler.style.top = y3 + 'px';
  ruler.style.width = width + 'px';
  ruler.style.height = height + 'px';
  
  coord.innerHTML = nearest(width, height) + ' <span>(' +  width + ',' + height + ')</span>';
}
board.onmousedown = function(e) {
  ruler.hidden = 0;
  x1 = x2 = e.clientX;
  y1 = y2 = e.clientY;
  reCalc();
  track = true;
};
board.onmousemove = function(e) {
  if (track) {
    x2 = e.clientX;
    y2 = e.clientY;
    reCalc();
  }
};
board.onmouseup = function(e) {
  ruler.hidden = 1;
  track = false;
};
