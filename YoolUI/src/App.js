/* [[YoolUI/src/App.js]] */
import React, { useState, useCallback } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import TaskScheduler from './components/TaskScheduler';
import GPSTracker from './components/GPSTracker';
import MyLocation from './components/MyLocation'; // Import the MyLocation component

function App() {
    const [activeView, setActiveView] = useState('chat'); // 'chat', 'tasks', 'gps', 'myLocation'
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "Investigate anomaly at Sector 7G",
            completed: false,
            // gpsPoints are now types that can be fulfilled by any matching GPS point
            requiredGpsTypes: ["anomaly", "research"],
            gpsPoints: [
                { id: 101, lat: 34.0522, lng: -118.2437, type: "anomaly", description: "Anomaly Site A", visited: false },
                { id: 102, lat: 15.0000, lng: -100.0000, type: "research", description: "Research Outpost", visited: false },
            ],
        },
        {
            id: 2,
            name: "Retrieve data core from abandoned facility",
            completed: true,
            requiredGpsTypes: ["facility"],
            gpsPoints: [
                { id: 201, lat: 33.9578, lng: -118.4000, type: "facility", description: "Old Facility Entrance", visited: true },
                { id: 202, lat: 33.9600, lng: -118.4100, type: "facility", description: "Facility Rear Gate", visited: false }, // Added another facility
            ],
        },
        {
            id: 3,
            name: "Restock supplies at distribution hub",
            completed: false,
            requiredGpsTypes: ["supermarket", "gym"], // Task requires visiting a supermarket and a gym
            gpsPoints: [
                { id: 301, lat: 34.1000, lng: -118.5000, type: "supermarket", description: "Main Provisioning Hub", visited: false },
                { id: 302, lat: 34.1122, lng: -118.5134, type: "gym", description: "Rec Center", visited: false },
                { id: 303, lat: 34.1050, lng: -118.4900, type: "supermarket", description: "West Side Market", visited: false }, // Added another supermarket
            ],
        },
    ]);
    const [currentTask, setCurrentTask] = useState(null);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
        { id: 2, text: "I have a question about YoolAI.", sender: "user" },
    ]);

    const handleSendMessage = useCallback((newMessageText) => {
        const newMessage = {
            id: Date.now(),
            text: newMessageText,
            sender: "user",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

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
        setCurrentTask(task);
        setActiveView('gps');
    }, []);

    const updateTaskGpsPoints = useCallback((updatedGpsPoints) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === currentTask.id ? { ...task, gpsPoints: updatedGpsPoints } : task
            )
        );
        // Also update currentTask state for immediate UI reflection without re-selecting
        setCurrentTask((prevTask) => prevTask ? { ...prevTask, gpsPoints: updatedGpsPoints } : null);
    }, [currentTask]);

    const handleToggleComplete = useCallback((id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <nav className="main-nav">
                    <button onClick={() => { setActiveView('chat'); setCurrentTask(null); }} className={activeView === 'chat' ? 'active' : ''}>Chat</button>
                    <button onClick={() => { setActiveView('tasks'); setCurrentTask(null); }} className={activeView === 'tasks' ? 'active' : ''}>Tasks</button>
                    <button onClick={() => setActiveView('gps')} className={activeView === 'gps' ? 'active' : ''}>GPS Points</button>
                    <button onClick={() => { setActiveView('myLocation'); setCurrentTask(null); }} className={activeView === 'myLocation' ? 'active' : ''}>My Location</button> {/* Add My Location button */}
                </nav>
            </header>
            <div className="content-area">
                {activeView === 'chat' && (
                    <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
                )}
                {activeView === 'tasks' && (
                    <TaskScheduler
                        tasks={tasks}
                        setTasks={setTasks}
                        onSelectTask={handleSelectTask}
                        onToggleComplete={handleToggleComplete}
                    />
                )}
                {activeView === 'gps' && currentTask && (
                    <GPSTracker
                        taskName={currentTask.name}
                        // Ensure gpsPoints and requiredGpsTypes are always arrays, even if currentTask is null
                        gpsPoints={currentTask.gpsPoints || []}
                        requiredGpsTypes={currentTask.requiredGpsTypes || []}
                        setGpsPoints={updateTaskGpsPoints}
                    />
                )}
                {activeView === 'gps' && !currentTask && (
                    <div className="no-task-selected-message">
                        <p>No task selected. Please select a task from the "Tasks" view to see its GPS points.</p>
                        <button onClick={() => setActiveView('tasks')}>Go to Tasks</button>
                    </div>
                )}
                {activeView === 'myLocation' && (
                    <MyLocation /> // Render MyLocation component
                )}
            </div>
        </div>
    );
}

export default App;
