import React from 'react';
import Todo from './Todo'

class TodoList extends React.Component{

	render(){
		const {todos, updateTodoItem, deleteTodoItem} = this.props;
		return(
			<ul>
				{
					todos
					.map((todo) => {
						const key = todos.indexOf(todo);
						return <Todo 
									key={key} 
									updateTodoItem={updateTodoItem} 
									deleteTodoItem={deleteTodoItem} 
									todo={todo} 
									index ={key}
								/>
						})
				}
			</ul>
			);
	}
}

export default TodoList;