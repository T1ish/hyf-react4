import React from 'react';
import TodoAdd from './TodoAdd';
import TodoFetch from './TodoFetch';

class TodoListAppManager extends React.Component{
	render() {
		const { todoText, todoDate, updateTodoText, addTodoItem, refreshData, error, todos, updateTodoItem, deleteTodoItem, updateTodoDate } = this.props;
		return(
			<div>
				<h1>Todo List!</h1>
				<TodoAdd 
					todoText={todoText} 
					todoDate={todoDate}
					updateTodoText={updateTodoText} 
					addTodoItem={addTodoItem}
					updateTodoDate={updateTodoDate}
				/>
				<hr />
				<TodoFetch 
					refreshData={refreshData} 
					error={error} 
					todos={todos} 
					updateTodoItem={updateTodoItem} 
					deleteTodoItem={deleteTodoItem} 
				/>
			</div>
			);
	}
}

export default TodoListAppManager;