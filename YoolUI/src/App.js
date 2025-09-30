import React, { useState, useCallback } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import TaskScheduler from './components/TaskScheduler';
import GPSTracker from './components/GPSTracker';

function App() {
  const [activeView, setActiveView] = useState('chat'); // 'chat', 'tasks', 'gps'
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Investigate anomaly at Sector 7G",
      completed: false,
      gpsPoints: [
        { id: 101, lat: 34.0522, lng: -118.2437, type: "anomaly", description: "Anomaly Site A" },
        { id: 102, lat: 15.0000, lng: -100.0000, type: "research", description: "Research Outpost" },
      ],
    },
    {
      id: 2,
      name: "Retrieve data core from abandoned facility",
      completed: true,
      gpsPoints: [
        { id: 201, lat: 33.9578, lng: -118.4000, type: "facility", description: "Old Facility Entrance" },
      ],
    },
    {
      id: 3,
      name: "Restock supplies at distribution hub",
      completed: false,
      gpsPoints: [
        { id: 301, lat: 34.1000, lng: -118.5000, type: "supermarket", description: "Main Provisioning Hub" },
        { id: 302, lat: 34.1122, lng: -118.5134, type: "gym", description: "Rec Center" },
      ],
    },
  ]);
  // We need to keep track of which task's GPS points we are currently viewing
  const [currentTask, setCurrentTask] = useState(null); // Stores the full task object
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "I have a question about YoolAI.", sender: "user" },
  ]);

  const handleSendMessage = useCallback((newMessageText) => {
    const newMessage = {
      id: Date.now(), // Use Date.now() for unique IDs
      text: newMessageText,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `Thanks for your message: "${newMessageText}". I'll get back to you shortly.`,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  }, []);

  const handleSelectTask = useCallback((task) => {
    setCurrentTask(task); // Set the entire task object
    setActiveView('gps'); // Automatically switch to GPS view when a task is selected
  }, []);

  const updateTaskGpsPoints = useCallback((updatedGpsPoints) => {
    // This function updates the GPS points for the current task
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === currentTask.id ? { ...task, gpsPoints: updatedGpsPoints } : task
      )
    );
    // Also update the currentTask state so GPSTracker re-renders with fresh props
    setCurrentTask((prevTask) => ({ ...prevTask, gpsPoints: updatedGpsPoints }));
  }, [currentTask]);

  return (
    <div className="App">
      <header className="App-header">
        <nav className="main-nav">
          <button onClick={() => { setActiveView('chat'); setCurrentTask(null); }} className={activeView === 'chat' ? 'active' : ''}>Chat</button>
          <button onClick={() => { setActiveView('tasks'); setCurrentTask(null); }} className={activeView === 'tasks' ? 'active' : ''}>Tasks</button>
          <button onClick={() => setActiveView('gps')} className={activeView === 'gps' ? 'active' : ''}>GPS Points</button>
        </nav>
        <div className="content-area">
          {activeView === 'chat' && (
            <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
          )}
          {activeView === 'tasks' && (
            <TaskScheduler tasks={tasks} setTasks={setTasks} onSelectTask={handleSelectTask} />
          )}
          {activeView === 'gps' && currentTask && (
            <GPSTracker
              taskName={currentTask.name} // Pass task name for context
              gpsPoints={currentTask.gpsPoints}
              setGpsPoints={updateTaskGpsPoints}
            />
          )}
          {activeView === 'gps' && !currentTask && (
            <div className="no-task-selected-message">
              <p>No task selected. Please select a task from the "Tasks" view to see its GPS points.</p>
              <button onClick={() => setActiveView('tasks')}>Go to Tasks</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;