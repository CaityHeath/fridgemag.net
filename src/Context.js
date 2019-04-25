import React, { Component } from 'react';
import Item from './Item.js';
import Target from './Target.js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styles from './style/example.scss';


class Context extends Component {
  state = {
    items: [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
      {id: 3, name: 'Item 3'},
      {id: 4, name: 'Item 4'},

    ],
    trash: []
  }

  deleteItem = (id) => {
    this.state.trash.push(id);
    this.setState(prevState => {
      let items = prevState.items;
      const index = items.findIndex(item => item.id === id);

      items.splice(index, 1);
      return { items };
    })
  };

  render() {
    return(
      <div className="example" style={styles}>
        <div className="app-container">
          <div className="item-container">
            {this.state.items.map((item, index) => (
              <Item key={item.id} item={item} handleDrop={ (id) => this.deleteItem(id)} />
              ))}
              <Target/>
          </div>
        </div>
      </div>
    )
  }
}


export default DragDropContext(HTML5Backend)(Context);