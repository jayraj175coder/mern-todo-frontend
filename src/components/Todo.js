import React, { useState } from 'react';
import styled from 'styled-components';

const Todo = ({ todo, onComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(todo._id, newText);
    setIsEditing(false);
  };

  return (
    <TodoItem className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <input
          type="text"
          className="form-control me-3"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <p style={{ textDecoration: todo.completed ? 'line-through' : 'none', margin: 0 }}>
          {todo.text}
        </p>
      )}
      <div>
        {isEditing ? (
          <button className="btn btn-success btn-sm" onClick={handleSave}>
            <i className="fa fa-check"></i> Save
          </button>
        ) : (
          <>
            <button className="btn btn-warning btn-sm me-2" onClick={handleEdit}>
              <i className="fa fa-pencil"></i> Edit
            </button>
            <button className="btn btn-success btn-sm me-2" onClick={() => onComplete(todo._id)}>
              <i className="fa fa-check"></i> Complete
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo._id)}>
              <i className="fa fa-trash"></i> Delete
            </button>
          </>
        )}
      </div>
    </TodoItem>
  );
};

const TodoItem = styled.div`
  background: #ffffff;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default Todo;
