import "../index.css"

const ToDoItem = (props: any) => {

    // Handles toggle of completed / not completed tasks and calls parent component logic
    const handleToggle = () => {
        props.onToggleCompletion(props.todo.id, props.todo.completed);
    };

    // Handled deletion of task and calls parent component logic
    const handleDelete = () => {
        props.onDelete(props.id);
    };

    // Handles key presses and disables default logic for key presses
    const handleKeyPress = (e: any) => {
        e.preventDefault()
    }


    return (
        <>
            <div className="item">
                <div className="item-header">

                </div>
                <div className="item-body checkbox-wrapper-11">
                    <input id={props.todo.id} name={props.todo.id} className="check" type="checkbox" checked={props.todo.completed} onChange={handleToggle} /> <label data-content="------" htmlFor={props.todo.id} className="item-title">{props.item.title}</label> 
                    <button type="button" onKeyUp={handleKeyPress} onClick={handleDelete} className="btnDelete"><svg fill="red" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fillRule="nonzero" /></svg></button>
                </div>
                
                <div className="item-footer">

                </div>
            </div>
        </>
    )
}

export default ToDoItem;
