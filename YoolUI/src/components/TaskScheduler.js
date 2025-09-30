import React, { useState } from 'react';
import './TaskScheduler.css';

const TaskScheduler = ({ tasks, setTasks, onSelectTask }) => {
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: newTaskName,
        completed: false,
        gpsPoints: [], // New tasks start with no GPS points
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskName('');
    }
  };

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="New mission briefing..."
        />
        <button onClick={handleAddTask}>Add Mission</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => handleToggleComplete(task.id)} className="task-name">
              {task.name}
            </span>
            <div className="task-actions">
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