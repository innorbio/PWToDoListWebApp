import { useEffect, useState } from "react";
import { TodoItem as TodoItemType } from "../interfaces/types";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../services/realtimeDatabase";
import { listenForTodos } from "../services/realtimeDatabase";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
    // Store todos
    const [todos, setTodos] = useState<TodoItemType[]>([]);
    // Store new todos being added to the database (for use with the input of new todos)
    const [newTodoTitle, setNewTodoTitle] = useState<string>('');

    useEffect(() => {
        // Fetch initial todos
        const fetchInitialTodos = async () => {
            const initialTodos = await fetchTodos();
            setTodos(initialTodos);
        };

        fetchInitialTodos();

        // Set up real-time listener
        const unsubscribe = listenForTodos((updatedTodos) => {
            console.log('Received todos update:', updatedTodos); // Debugging
            setTodos(updatedTodos);
        });

        return () => {
            // Clean up the listener
            unsubscribe();
        };
    }, []);

    // Adds and calls service level logic to add new todos to the db and display
    const handleAddTodo = async () => {
        if (newTodoTitle.trim() === '') return;

        const newTodo = {
            title: newTodoTitle,
            completed: false,
        };

        await createTodo(newTodo);
        setNewTodoTitle('');
    };

    // Updates and calls service level logic to update todos in the db and display
    const handleToggleCompletion = async (id: string, completed: boolean) => {
        console.log(!completed)
        await updateTodo(id, { completed: !completed });
    };

    // Deletes and calls service level logic to delete todos from the db and display
    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id);
    };

    // Allows new todos the be added when the neter key is pressed
    const handKeyPress = (e: any) => {
        if (e.keyCode == 13) {
            console.log("Enter key pressed")
            handleAddTodo()
        }
    }
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="card">
                    <div className="card-header">
                        <div className="input-group">
                            <label htmlFor="" className="lblAddItem">To Do List:</label>
                            <div className="input-group">
                                <div className="cta-container">
                                    <input autoFocus onKeyUp={handKeyPress} type="text" placeholder="Tell my wife I love her!" value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} />
                                    <button onClick={handleAddTodo} type="button" className="cta-primary btnAddItem"><span>Add</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {
                            todos.map((todo) => (
                                <ToDoItem className="card-todo-list" key={todo.id} id={todo.id} todo={todo} item={todo} onToggleCompletion={handleToggleCompletion}
                                    onDelete={handleDeleteTodo} />
                            ))
                        }
                    </div>
                </div>
            </form>
        </>
    )
}

export default ToDoList;
