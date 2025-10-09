import React, { useState } from 'react';
import './TaskScheduler.css';

const TaskScheduler = ({ tasks, setTasks, onSelectTask, onToggleComplete }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskRequiredTypes, setNewTaskRequiredTypes] = useState(''); // New state for required GPS types

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const requiredGpsTypesArray = newTaskRequiredTypes.split(',').map(type => type.trim().toLowerCase()).filter(Boolean);
      const newTask = {
        id: Date.now(),
        name: newTaskName,
        completed: false,
        gpsPoints: [],
        requiredGpsTypes: requiredGpsTypesArray,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskName('');
      setNewTaskRequiredTypes('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };


  return (
    <div className="task-scheduler-container">
      <h2>Mission Log</h2>
      <div className="new-task-input">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="New mission briefing..."
        />
        <input
          type="text"
          value={newTaskRequiredTypes}
          onChange={(e) => setNewTaskRequiredTypes(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Required GPS types (comma-separated, e.g., supermarket, gym)"
        />
        <button onClick={handleAddTask}>Add Mission</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content"> {/* Added a div to wrap name and types */}
              <span className="task-name" title={task.name}>
                {task.name}
              </span>
              {task.requiredGpsTypes && task.requiredGpsTypes.length > 0 && (
                <div className="task-required-types">
                  {task.requiredGpsTypes.map((type, index) => (
                    <span key={index} className="task-type-tag">
                      {type.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="task-actions">
              {!task.completed && (
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className="done-button"
                  title="Mark as Done"
                >
                  Done
                </button>
              )}
              <button
                onClick={() => onSelectTask(task)}
                className="view-gps-button"
                title="View GPS Points"
              >
                GPS
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="delete-button">
                Del
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskScheduler;