import React from 'react';

class TodoAdd extends React.Component{
	render(){
		const { todoText, updateTodoText, addTodoItem } = this.props;
		return(
			<div>
				<input type='text' value={todoText} onChange={updateTodoText}/>
				<input type="date" name="deadlineDate" id="deadlineDate"/>
				<button onClick={addTodoItem}>Post</button>
			</div>
			);
	}
}

export default TodoAdd;