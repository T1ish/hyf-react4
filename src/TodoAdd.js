import React from 'react';

class TodoAdd extends React.Component{
	render(){
		const { todoText, todoDate, updateTodoText, addTodoItem, updateTodoDate } = this.props;
		return(
			<div>
				<input type='text' value={todoText} onChange={updateTodoText}/>
				<input type="date" name="deadlineDate" onChange={updateTodoDate} value={todoDate}/>
				<button onClick={addTodoItem}>Post</button>
			</div>
			);
	}
}

export default TodoAdd;