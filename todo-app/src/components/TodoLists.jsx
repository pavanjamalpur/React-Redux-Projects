import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo, clearAlltodo } from "../redux/actions";

export const TodoLists = () => {
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState([]);

  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      dispatch(editTodo(data?.todo?.id));
    } else if (data && data?.type === "delete") {
      dispatch(deleteTodo(data?.todo?.id));
    }
  };

  const changeEvent = (e, todoId) => {
    if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
      if (selectedTodo.indexOf(todoId) === -1) {
        setSelectedTodo((todo) => [...todo, todoId]);
      }
    } else if (e?.target?.name !== "select_all_todo" && e?.target?.checked === false) {
      const todos = selectedTodo.filter((todo) => todo !== todoId);
      setSelectedTodo(todos);
    }

    if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);

        for (let chk of allChkbox) {
          chk.checked = true;
          let todoId = todo?.id;

          setSelectedTodo((todo) => [
            ...todo,
            todoId
          ]);
        }
      });
    }

    else if (e?.target?.name === "select_all_todo" && e?.target?.checked === false) {
      todos && todos.forEach((todo, index) => {
        const allChkbox = document.getElementsByName(`todo_${index}`);
        for (let chk of allChkbox) {
          chk.checked = false;
          setSelectedTodo([]);
        }
      });
    }
  };

  return (
    <div className="container my-2">
      <div className="row pb-4" style={{height: "60px"}}>
        <div className="col-xl-12 text-right">
          {selectedTodo.length > 0 && (
            <>
              <button
                className="btn btn-outline-danger"
                onClick={() => dispatch(clearAlltodo())}
              >
                Clear Todos
              </button>
             
            </>
          )}
        </div>
      </div>

      <table className="table table-success table-striped" style={{width:"700px"}}>
        <thead>
          <tr>
            <th width="10px">
              <input
                type={"checkbox"}
                onChange={(e) => changeEvent(e)}
                name={"select_all_todo"}
              />
            </th>
            <th width="350px">Name</th>
            <th width="250px">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos && todos.map((todo, index) => (
            <tr key={index}>
              <td>
                <input
                  type={"checkbox"}
                  value={todo?.id}
                  onChange={(e) => changeEvent(e, todo?.id)}
                  name={`todo_${index}`}
                />
              </td>
              <td>{todo?.title}</td>
              <td>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => actionClick({ todo: todo, type: "edit" })}
                >
                  Edit
                </button>
                <button style={{marginLeft:"10px"}}
                  className="btn btn-outline-danger btn-sm mr-4"
                  onClick={() => actionClick({ todo: todo, type: "delete" })}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
