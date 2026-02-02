# Task Manager App

A full-stack task management application

1. Backend Setup
   The backend runs on port **4000**.

cd backend
npm install
npm start

2. Frontend Setup
   The backend runs on port **3000**.

cd frontend
npm install
npm start


GET	    /api/tasks	            Fetch all tasks	
POST	/api/tasks	            Create a new task	{ title: "...", description: "...", priority: "low" }
PUT 	/api/tasks/:id	        Update a task	    { title: "...", ... }
DELETE	/api/tasks/:id	        Delete a task	    id (URL param)
PATCH	/api/tasks/:id/toggle	Toggle completion	id (URL param)

Backend API: ~2 hour

Frontend: ~2 hours