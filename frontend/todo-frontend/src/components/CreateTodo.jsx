import { useState } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return ( 
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group mt-3">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="title" 
                            placeholder="Enter title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="description" 
                            placeholder="Enter description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button 
                        className="btn btn-primary mt-3" 
                        onClick={() => { 
                            fetch("http://localhost:3456/todo", {
                                method: "POST",
                                body: JSON.stringify({
                                    title: title,
                                    description: description
                                }),
                                headers: {
                                    "Content-type": "application/json"
                                }
                            })
                            .then(async function(res){
                                const json = await res.json();
                                alert("Todo added");
                            });
                        }}
                    >
                        Add a todo
                    </button>
                </div>
            </div>
        </div>
    );
}


