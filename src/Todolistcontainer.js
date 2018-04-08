import React from 'react';
import TodoListAppManager from './TodoListAppManager';

const API_URL = 'http://hyf-react-api.herokuapp.com/todos';

class TodoListContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todos: [],
			error: '',
			todoText: '',
			todoDate: ''
		};
		this.fetchData = this.fetchData.bind(this);
		this.refreshData = this.refreshData.bind(this);
		this.updateTodoItem = this.updateTodoItem.bind(this);
		this.updateTodoText = this.updateTodoText.bind(this);
		this.deleteTodoItem = this.deleteTodoItem.bind(this);
		this.addTodoItem = this.addTodoItem.bind(this);
		this.updateTodoDate = this.updateTodoDate.bind(this);

	}

	updateTodoText(event){
		this.setState({ todoText: event.target.value });
	}

	updateTodoDate(event){
		this.setState({ todoDate: event.target.value });
	}

	//Works for the checkbox only, didn't implement changing the text but same kind of function.
	updateTodoItem(todoId){
		//Remember we are working with an array and not an object
		//so it's different than how it was in class.
		const oldTodo = this.state.todos[todoId];
		const newTodo = {...oldTodo, done: !oldTodo.done}
		const newTodos = this.state.todos;
		newTodos[todoId] = newTodo;
		fetch(`${API_URL}/${newTodo._id}`, 
  			{ 
  				method: 'PATCH', 
  				body: JSON.stringify(newTodo),
  				headers: new Headers({
    			'Content-Type': 'application/json'
  				})
  			})
  		.then(
  		this.setState( {todos: newTodos} )
  			)
    	.catch(err => err);
	}

	deleteTodoItem(todoId){
		const oldTodo = this.state.todos[todoId];
		//The line below is wrong to use since it makes a new reference to the same array,
		//meaning you are changing the state which should be immutable!
		//const newTodos = this.state.todos;
		// Use instead the spread function which clones the state and put it into a new array:
		const newTodos = [...this.state.todos];
		newTodos.splice(todoId, 1);
		fetch(`${API_URL}/${oldTodo._id}`, 
  			{ 
  				method: 'DELETE',
  			})
  		.then(
	  		this.setState( {todos: newTodos} )
  			)
    	.catch(err => err);	
	}


    componentDidMount() {
    	setTimeout(this.fetchData, 1500);
  	}


  	addTodoItem(){
  		const { todoText, todoDate } = this.state;
  		const newTodo = { description: todoText, deadline: todoDate };
  		const newTodos = this.state.todos;
  		newTodos.push(newTodo);
  		fetch(`${API_URL}/create`, {
  			method: 'POST',
  			body: JSON.stringify(newTodo),
  			headers: new Headers({
    			'Content-Type': 'application/json'
  			})
  		})
  		.then(this.setState({ todos: newTodos }))
  		.catch(err => err);
  	}


  	fetchData(){
  		fetch(`${API_URL}`)
			.then((response) => response.json())
			.then((body) => {
				this.setState({
					todos: body	
				})
			})
			.catch(() => this.setState({error: 'Error - Cannot load data'}));
  	}


  	refreshData(){
  		this.setState({ error: null, todos: null});
  		setTimeout(this.fetchData, 500);
  	}


	render(){
		const { todos, error, todoText, todoDate } = this.state;
		return(
			<TodoListAppManager 
				todoText={todoText} 
				todoDate={todoDate}
				updateTodoText={this.updateTodoText} 
				addTodoItem={this.addTodoItem}  
				refreshData={this.refreshData}
				error={error}
				todos={todos}
				updateTodoItem={this.updateTodoItem}
				deleteTodoItem={this.deleteTodoItem}
				updateTodoDate={this.updateTodoDate}
			/>
			);
	}
}

export default TodoListContainer;