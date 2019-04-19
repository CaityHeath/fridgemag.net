'use strict';
const magnets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' © Caity Heath'];

const colors = ['#FF0000', '#0000FF', '#FFFF00', '#7FFF00', '#FF7F00', '#7F00FF'];

const dropZone = document.getElementById('zone');
const body = document.getElementsByTagName('body');


function Magnet(mag, x, y) {
  this.magnetName = mag;
  this.posx = x;
  this.posy = y;

  Magnet.allMagnets.push(this);
}

Magnet.allMagnets = [];


function createMagnets() {
  magnets.forEach(idx => {
    let x = rando(10, 90);
    let y = rando(10, 90);

    new Magnet(idx, x, y);

    let tag = addElement('p', idx, zone)
    let randomColor = Math.floor(Math.random() * 6);
    tag.setAttribute('style', `position: absolute; left: ${x}%; top: ${y}%; padding: 3px; color:${colors[randomColor]};`);
    tag.addEventListener('dragstart', dragstart_handler);
  });
}




/////////// HELPER FUNCTIONS \\\\\\\\\\\\\\\\

function addElement(ele, content, parent) {
  let newEl = document.createElement(ele);
  let newContent = document.createTextNode(content);
  let newId = document.createAttribute('id');
  let drag = document.createAttribute('draggable');

  newId.value = content;
  drag.value = true;

  newEl.setAttributeNode(newId);
  newEl.setAttributeNode(drag);
  newEl.appendChild(newContent);
  parent.appendChild(newEl);

  return newEl;
}

function rando(min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

function grabMagnet(e, data) {
  e.preventDefault();
  let id = data;
  Magnet.allMagnets.forEach(idx => {
    if (idx.magnetName === id) {
      console.log(e.pageX);
      console.log(e.pageY);
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
  console.log(selected);
  e.target.appendChild(document.getElementById(data));
  selected.style.position = 'fixed';
  console.log('e.pagex', e.pageX);
  selected.style.left = `${e.pageX}px`;
  selected.style.top = `${e.pageY}px`;

  console.log('selected', selected);
  grabMagnet(e, data);
}




createMagnets();
dropZone.addEventListener('dragover', dragover_handler);
dropZone.addEventListener('drop', drop_handler);