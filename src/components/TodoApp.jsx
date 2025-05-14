import { useState } from 'react';
import { Check, Trash2, Plus } from 'lucide-react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
  ]);
  const [newTodoText, setNewTodoText] = useState('');
  
  // Add a new todo
  const addTodo = () => {
    if (newTodoText.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };
  
  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  
  // Count completed and total todos
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">React Todo List</h1>
      
      {/* Add todo form */}
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 border rounded-l focus:outline-none"
          placeholder="Add a new task..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r flex items-center justify-center"
          onClick={addTodo}
        >
          <Plus size={18} />
        </button>
      </div>
      
      {/* Todo list */}
      <div className="space-y-2">
        {todos.map(todo => (
          <div 
            key={todo.id} 
            className={`flex items-center p-3 border rounded ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-6 h-6 rounded-full border mr-3 flex items-center justify-center ${
                todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
            >
              {todo.completed && <Check size={14} className="text-white" />}
            </button>
            <span 
              className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Progress and stats */}
      {todos.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <p>{completedCount} of {totalCount} tasks completed</p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Empty state */}
      {todos.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          Your todo list is empty. Add some tasks to get started!
        </div>
      )}
    </div>
  );
}

export default TodoApp;