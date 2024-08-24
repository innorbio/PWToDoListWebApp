import { useEffect, useState } from "react";
import { TodoItem as TodoItemType } from "../interfaces/types";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../services/realtimeDatabase";
import { listenForTodos } from "../services/realtimeDatabase";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
    const [todos, setTodos] = useState<TodoItemType[]>([]);
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

    const handleAddTodo = async () => {
        if (newTodoTitle.trim() === '') return;

        const newTodo = {
            title: newTodoTitle,
            completed: false,
        };

        await createTodo(newTodo);
        setNewTodoTitle('');
    };

    const handleToggleCompletion = async (id: string, completed: boolean) => {
        console.log(!completed)
        await updateTodo(id, { completed: !completed });
    };

    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id);
    };

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
                    <div className="card-footer"></div>
                </div>
            </form>
        </>
    )
}

export default ToDoList;
