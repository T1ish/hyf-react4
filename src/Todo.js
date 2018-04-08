import React from 'react';

class Todo extends React.Component {
	
	render(){
		const {todo, index, deleteTodoItem, updateTodoItem} = this.props;
		return(
			<li className={todo.done ? 'checked' : 'unchecked'}> 
			  {todo.description}, 
			  Deadline: {`${todo.deadline}`}
			  <input 
			  	type='checkbox'
			  	checked={todo.done}
			  	onChange={() => { 
			  		updateTodoItem(index);

			  	}}
			  /> 
			   
			  <button 
			  	onClick={() => { 
			  		deleteTodoItem(index); 
			  	}}
			  >
			  	Delete
			  </button>
			</li>

			);
	}
}

export default Todo; 