import React from 'react';
import TodoList from './TodoList';

class TodoFetch extends React.Component{
	render(){
		const { refreshData, error, todos, updateTodoItem, deleteTodoItem } = this.props;
		return(
			<div>
				<button onClick={refreshData}>Refresh</button>
				{
         			 error && <h3 className='error-msg'>error: { error }</h3>
        		}
				{
					todos && 
					<TodoList updateTodoItem={updateTodoItem} deleteTodoItem={deleteTodoItem} todos={todos}/>
				}
				{
          			!todos && !error && <p>No todos, sorry!</p>
        		}
    		</div>
			);
	}
}

export default TodoFetch;