# Task Management System

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

A robust and scalable task management system built with TypeScript and Express.js. This project demonstrates best practices in building a RESTful API with TypeScript, including task creation, updates, analytics, and more.

## Features

- Create, read, update, and delete tasks
- Assign tasks to users
- Track task status (todo, in-progress, done)
- Task analytics (productivity, task distribution by status)
- Identify the most productive user

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/s1rusOne/task-management-system.git
   ```

2. Navigate to the project directory:

   ```
   cd task-management-system
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory:

   ```
   touch .env
   ```

2. Add the following environment variables:
   ```
   PORT=3000
   ```

## Usage

### Starting the Server

To start the server in development mode with hot-reloading:

```
npm run dev
```

To build and start the server in production mode:

```
npm run build
npm start
```

### Running the Client Example

We've provided a client example to demonstrate how to interact with the API. To run it:

```
npm run client
```

## API Endpoints

- `POST /api/tasks`: Create a new task
- `GET /api/tasks`: Retrieve all tasks
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task
- `GET /api/analytics/productivity`: Get overall productivity
- `GET /api/analytics/status`: Get tasks distribution by status
- `GET /api/analytics/most-productive-user`: Get the most productive user
