
const magnets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' © CH'];

const colors = ['#FF0000', '#403383', '#098571', '#F8e100'];

const dropZone = document.getElementById('zone');


function Magnet(mag, x, y) {
  this.magnetName = mag;
  this.posx = x;
  this.posy = y;

  Magnet.allMagnets.push(this);
}

Magnet.allMagnets = [];


function createMagnets() {
  magnets.forEach(idx => {
    let x = rando(5, 95);
    let y = rando(5, 95);

    new Magnet(idx, x, y);

    let tag = addElement('p', idx, zone);
    tag.setAttribute('style', `position: absolute; left: ${x}%; top: ${y}%;`);
    // tag.addEventListener('dragstart', dragstart_handler);
  });
}

$( function() {
  $( ".draggable" ).draggable();
} );


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

function grabMagnet(e, data) {
  e.preventDefault();
  let id = data;
  Magnet.allMagnets.forEach(idx => {
    if (idx.magnetName === id) {

      idx.posx = - e.pageX;
      idx.posy = - e.pageY;
      return;
    }
  });
}


////////// Handlers \\\\\\\\\\\\\\\\\\\\
function dragstart_handler(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

function dragover_handler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

function drop_handler(e) {
  e.preventDefault();
  let data = e.dataTransfer.getData('text/plain');
  let selected = document.getElementById(data);
  e.target.appendChild(document.getElementById(data));
  selected.style.position = 'fixed';

  let calcX = 100 / document.documentElement.clientWidth;
  let calcY = 100 / document.documentElement.clientHeight;
  let randomColor = Math.floor(Math.random() * 4);
  let x = e.pageX * calcX;
  let y =  e.pageY * calcY;
  //console.log('client height',document.documentElement.clientHeight);
  selected.style.color = `${colors[randomColor]}`;
  selected.style.left = `${x}vw`;
  selected.style.top = `${y}vh`;
  selected.style.padding = `${calcX * 1}vw`;
  grabMagnet(e, data);
}




createMagnets();
//dropZone.addEventListener('dragover', dragover_handler);


// dropZone.addEventListener('drop', drop_handler);
// dropZone.addEventListener('touchend', drop_handler);