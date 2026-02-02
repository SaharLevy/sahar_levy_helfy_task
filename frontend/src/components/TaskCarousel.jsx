import React, { useState } from "react";
import binIcon from "../assets/bin.png";

export default function TaskCarousel({ tasks, onDelete, onToggle }) {
  const [index, setIndex] = useState(0);

  if (tasks.length === 0) return <div className="empty">No tasks found.</div>;

  const next = () => setIndex((prev) => (prev + 1) % tasks.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + tasks.length) % tasks.length);

  const getPriorityColor = (priority) => {
    if (priority === "high") return "#d05769";
    if (priority === "medium") return "#c09b60";
    return "#59b261";
  };

  return (
    <div className="carousel-wrapper">
      <button className="nav-btn" onClick={prev}>
        &#10094;
      </button>

      <div className="carousel-body">
        <div
          className="track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {tasks.map((task) => (
            <div className="slide" key={task.id}>
              <div
                className="card"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                <div className="card-header">
                  <span className="badge">{task.priority}</span>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="delete-btn"
                  >
                    <img
                      src={binIcon}
                      alt="Delete"
                      style={{ width: "1rem", height: "1rem" }}
                    />
                  </button>
                </div>

                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <div className="card-footer">
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggle(task.id)}
                    />
                    {task.completed ? " Done" : " Pending"}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="nav-btn" onClick={next}>
        &#10095;
      </button>
    </div>
  );
}
