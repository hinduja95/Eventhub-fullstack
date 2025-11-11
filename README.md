# EventHub-Fullstack

## Overview
EventHub is a full-stack web application that allows users to create, manage, and register for events.  
It supports two types of users — organizers and attendees — providing features for event creation, registration, and management.  
The project is built using React for the frontend, Node.js with Express for the backend, and MySQL as the database.

---

## Tech Stack
**Frontend:** React, CSS, Axios  
**Backend:** Node.js, Express.js  
**Database:** MySQL  
**Authentication:** JSON Web Token (JWT)  
**Environment Management:** dotenv  

---

## Environment Variables
Create a `.env` file inside your backend folder (`event-mgmt-service/`) with the following:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=eventhub_db
JWT_SECRET=your_jwt_secret
PORT=8080
