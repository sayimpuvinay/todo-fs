export function Todos(props) {
    const { todos, setTodos } = props;

    const handleMarkAsComplete = async (id) => {
        try {
            const response = await fetch("http://localhost:3456/completed", {
                method: "PUT",
                body: JSON.stringify({
                    id: id,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });

            const data = await response.json();
            alert(data.msg);

            // Update the local state to reflect the change in completion status
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            );
        } catch (error) {
            console.error("Error marking todo as completed:", error);
        }
    };

    return (
        <div className="container mt-5">
            {todos.map(function(todo) {
                return (
                    <div key={todo._id} className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5 className="card-title">{todo.title}</h5>
                                    <p className="card-text">{todo.description}</p>
                                    <button 
                                        className={`btn btn-${todo.completed ? 'success' : 'primary'}`}
                                        onClick={() => handleMarkAsComplete(todo._id)}
                                    >
                                        {todo.completed ? "Completed" : "Mark as complete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}