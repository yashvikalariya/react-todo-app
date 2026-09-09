import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      {
        id: 1,
        text: "Learn React Hooks",
        completed: true,
      },
      {
        id: 2,
        text: "Practice JavaScript",
        completed: false,
      },
      {
        id: 3,
        text: "Complete Project",
        completed: false,
      },
    ];
  });

  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // =========================
  // Add Task
  // =========================
  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  // =========================
  // Check / Uncheck
  // =========================
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  // =========================
  // Delete
  // =========================
  const deleteTask = (id) => {
    setTasks(
      tasks.filter((item) => item.id !== id)
    );
  };

  // =========================
  // Edit
  // =========================
  const startEdit = (id) => {
    const selectedTask = tasks.find(
      (item) => item.id === id
    );

    setEditId(id);
    setEditText(selectedTask.text);
  };

  // =========================
  // Save Edit
  // =========================
  const saveEdit = (id) => {
    if (editText.trim() === "") return;

    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              text: editText.trim(),
            }
          : item
      )
    );

    setEditId(null);
    setEditText("");
  };

  // =========================
  // Clear Completed
  // =========================
  const clearCompleted = () => {
    const remainingTasks = tasks.filter(
      (item) => !item.completed
    );

    setTasks(remainingTasks);
  };

  // =========================
  // Filter Tasks
  // =========================
  const filteredTasks = tasks.filter((item) => {
    if (filter === "active") {
      return item.completed === false;
    }

    if (filter === "completed") {
      return item.completed === true;
    }

    return true;
  });

  // =========================
  // Statistics
  // =========================
  const totalTasks = tasks.length;

  const activeTasks = tasks.filter(
    (item) => !item.completed
  ).length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="container">
      <div className="todo-box">

        {/* Better Header */}
        <div className="header">
          <h1>My To-Do App</h1>
        </div>

        {/* Add Task */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>
            Add
          </button>
        </div>

        {/* Statistics */}
        <div className="statistics">

          <div className="stat-box">
            <h3>{totalTasks}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-box">
            <h3>{activeTasks}</h3>
            <p>Active Tasks</p>
          </div>

          <div className="stat-box">
            <h3>{completedTasks}</h3>
            <p>Completed Tasks</p>
          </div>

        </div>

        {/* Filters */}
        <div className="filters">

          <button
            className={
              filter === "all"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </button>

          <button
            className={
              filter === "active"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setFilter("active")
            }
          >
            Active
          </button>

          <button
            className={
              filter === "completed"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setFilter("completed")
            }
          >
            Completed
          </button>

        </div>

        {/* Conditional Rendering */}
        {filteredTasks.length === 0 ? (

          <div className="empty-message">
            <h3>📭 No tasks found!</h3>
            <p>Add a new task to get started.</p>
          </div>

        ) : (

          <ul>

            {filteredTasks.map((item) => (

              <li key={item.id}>

                {editId === item.id ? (

                  <div className="edit-box">

                    <input
                      type="text"
                      value={editText}
                      onChange={(e) =>
                        setEditText(
                          e.target.value
                        )
                      }
                    />

                    <button
                      className="save-btn"
                      onClick={() =>
                        saveEdit(item.id)
                      }
                    >
                      Save
                    </button>

                  </div>

                ) : (

                  <>

                    <span
                      className={
                        item.completed
                          ? "completed"
                          : ""
                      }
                    >

                      <input
                        type="checkbox"
                        checked={
                          item.completed
                        }
                        onChange={() =>
                          toggleTask(
                            item.id
                          )
                        }
                      />

                      {item.text}

                    </span>

                    <div className="actions">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          startEdit(
                            item.id
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteTask(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </>

                )}

              </li>

            ))}

          </ul>

        )}

        {/* Bottom Section */}
        <div className="bottom-section">

          <span>
            Showing: {filteredTasks.length}
          </span>

          {completedTasks > 0 && (
            <button
              className="clear-btn"
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;