import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoItems extends React.Component {
  render() {
    let todoEntries = this.props.entries;
    let deleteItem = this.props.deleteItem;
    
    function createTasks(item) {
      return (
        <li key={item.key}>
          <div>{item.text}</div>
          <button type="button" className="x-button" onClick={() => deleteItem(item)}>-</button>
        </li>
      ) 
    }

    let listItems = todoEntries.map(createTasks);

    return (
      <ul className="theList">
        {listItems}
      </ul>
    );
  }  
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    }

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      let itemArray = this.state.items;

      itemArray.push(
        {
          text: this._inputElement.value,
          key: Date.now()
        }
      );

      this.setState({
        items: itemArray
      });
    }

    this._inputElement.value = "";
    e.preventDefault();
  }

  deleteItem(item) {
    let itemArray = this.state.items;
    let index = itemArray.indexOf(item);

    itemArray.splice(index,1);

    this.setState({
      items: itemArray
    });
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a}
              placeholder="enter task">
            </input>
            <button type="submit">+</button>
          </form>
        </div>
        <TodoItems entries={this.state.items} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

ReactDOM.render(
    <TodoList />,
    document.getElementById('container'));
