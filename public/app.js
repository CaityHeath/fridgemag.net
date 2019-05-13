
const magnets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' © CH'];

const colors = ['#FF0000', '#403383', '#098571', '#F8e100'];

const dropZone = document.getElementById('zone');

Magnet.allMagnets = [];

function Magnet(mag, x, y) {
  this.magnetName = mag;
  this.posx = x;
  this.posy = y;

  Magnet.allMagnets.push(this);
}

function createMagnets() {
  magnets.forEach(idx => {
    let x = rando(5, 85);
    let y = rando(5, 85);
    let color = rando(0, 3);
    new Magnet(idx, x, y);

    let tag = addElement('p', idx, zone);
    tag.setAttribute('style', `left: ${x}vw; top: ${y}vh; color:${colors[color]}`);
  });
}

$( function() {
  $( ".draggable" ).draggable();
} );

$( function() {
  $("#zone").droppable();
})

$("#zone").on("drop", function(event, ui){
  let id = `#${ui.draggable[0].id}`;
  let x = calcRelativeWidth(ui.position.left);
  let y = calcRelativeHeight(ui.position.top);

  $(ui.draggable[0]).css('top', `${y}vh`);
  $(ui.draggable[0]).css('left', `${x}vw`);
});


/////////// HELPER FUNCTIONS \\\\\\\\\\\\\\\\

function addElement(ele, content, parent) {
  let newEl = document.createElement(ele);
  let newContent = document.createTextNode(content);
  let newId = document.createAttribute('id');
  let newClass = document.createAttribute('class');
  newId.value = content;
  newClass.value = "draggable";
  newEl.setAttributeNode(newId);
  newEl.setAttributeNode(newClass);
  newEl.appendChild(newContent);
  parent.appendChild(newEl);
  return newEl;
}

function rando(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function calcRelativeWidth(posX){
let calcX = 100 / document.documentElement.clientWidth;
return calcX * posX;
}

function calcRelativeHeight(posY){
let calcY = 100/ document.documentElement.clientHeight;
return calcY * posY;
}


createMagnets();
