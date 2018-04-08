import React from 'react';
import Todolist from './Todolist';

class Todolistcontainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todos: [],
			error: '',
			todoText: ''
		};
		this.fetchData = this.fetchData.bind(this);
		this.refreshData = this.refreshData.bind(this);
		this.updateTodoItem = this.updateTodoItem.bind(this);
		this.updateTodoText = this.updateTodoText.bind(this);
		this.deleteTodoItem = this.deleteTodoItem.bind(this);
		this.addTodoItem = this.addTodoItem.bind(this);

	}

	updateTodoText(event){
		this.setState({ todoText: event.target.value });
	}


	//Do not work - dunno why
	updateTodoItem(todoId){
		//Remember we are working with an array and not an object
		//so it's different than how it was in class.
		const oldTodo = this.state.todos[todoId];
		const newTodo = {...oldTodo, done: !oldTodo.done}
		const newTodos = this.state.todos;
		newTodos[todoId] = newTodo;
		fetch(`http://hyf-react-api.herokuapp.com/todos/${newTodo._id}`, 
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


	//Delete works fine, no need to test this one anymore.
	deleteTodoItem(todoId){
		const oldTodo = this.state.todos[todoId];
		const newTodos = this.state.todos;
		newTodos.splice(todoId, 1);
		fetch(`http://hyf-react-api.herokuapp.com/todos/${oldTodo._id}`, 
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


  	//POST works fine, no need to test this one anymore.
  	addTodoItem(){
  		const date = document.getElementById("deadlineDate").value;
  		const { todos, todoText } = this.state;
  		const newTodo = { description: todoText, deadline: date };
  		const newTodos = this.state.todos;
  		newTodos.push(newTodo);
  		fetch(`http://hyf-react-api.herokuapp.com/todos/create`, {
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
  		fetch(`http://hyf-react-api.herokuapp.com/todos`)
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
		const { todos, error, todoText } = this.state;
		return(<div>
				<h1>Todo List!</h1>
				<div>
					<input type='text' value={todoText} onChange={this.updateTodoText}/>
					<input type="date" name="deadlineDate" id="deadlineDate"/>
					<button onClick={this.addTodoItem}>Post</button>

				</div>
				<hr />
				<div>
					<button onClick={this.refreshData}>Refresh</button>
					{
	         			 error && <h3 className='error-msg'>error: { error }</h3>
	        		}
					{
						todos && 

						<Todolist updateTodoItem={this.updateTodoItem} deleteTodoItem={this.deleteTodoItem} todos={todos}/>
					}
					{
	          			!todos && !error && <p>No todos, sorry!</p>
	        		}
        		</div>
			</div>);
	}
}


export default Todolistcontainer;