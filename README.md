# Nicholas Garner CS553 Midterm

## Overview

Express API for a course task tracker.

## Features

The API manages an in-memory list of tasks.

Each task has:

```json
{
 "id": "1",
 "title": "Finish Midterm Exam",
 "course": "CS553",
 "completed": false   
}
```

The following routes are supported:

| Method | Route | Description |
| ------ | ----- | ----------- |
| GET | `/health` | Return a simple health check response |
| GET | `/api/tasks` | Return all tasks |
| GET | `/api/tasks/:id` | Return one task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Replace an existing task |
| PATCH | `/api/tasks/:id` | Partially update an existing task |
| DELETE | `/api/tasks/:id` | Delete an existing item |

## Server Logger

The server logs each method and route to the terminal. Also logged are the response status code and the execution time to
fulfill the request.

Example server output:

```
GET /health
Status: 200
Execution time: 0.2870179999999891 ms

POST /api/tasks
Status: 201
Execution time: 0.39053400000011607 ms
```

## Example routes

### `GET /health`

Returns:

```json
{
    "status": "Server is OK"
}
```

### `GET /api/tasks`

Returns an array of tasks.

Example response:

```json
{
    "tasks": 
    [
        {
          "id": "1",
          "title": "Finish Midterm Exam",
          "course": "CS553",
          "completed": false
        },
        {
          "id": "2",
          "title": "Watch Week 4 Lecture",
          "course": "CS553",
          "completed": false
        }
    ]
}
```

### `GET /api/tasks/:id`
 
Returns a specific task.

Example Response:

 ```json
{
    "id": "1",
    "title": "Finish Midterm Exam",
    "course": "CS553",
    "completed": false
}
```

If the item does not exist, returns a `404` response.

Example error response:

```json
{
    "error": "Task not found"
}
```

### `POST /api/tasks`

Creates a new task.

The client sends a JSON request with `title`, `course` and `completed`.

The server assigns the id.

Example Request Body:

 ```json
{
    "title": "Finish Midterm Exam",
    "course": "CS553",
    "completed": false
}
```

Example Response:

 ```json
{
    "id": "1",
    "title": "Finish Midterm Exam",
    "course": "CS553",
    "completed": false
}
```

A successful create request returns status code `201`.

If the request body is missing required fields or contains invalid data, returns a `400` response with a JSON error message.

### `PUT /api/tasks/:id`

Replaces an existing task. The client must specify `title`, `course` and `completed`.

Example Request Body:

 ```json
{
    "title": "Finish Midterm Exam",
    "course": "CS553",
    "completed": false
}
```

If the item exists, returns the updated item.

If the item does not exist, returns a `404` response.

If the request body is missing required fields or contains invalid data, returns a `400` response with a JSON error message.

### `PATCH /api/tasks/:id`

Partially updates an existing item. Optional fields include `title`, `course` and `completed`.

Example Request Body:

 ```json
{
    "title": "Finish Midterm Exam",
    "course": "CS553",
    "completed": false
}
```

Example response:

 ```json
{
    "id": "1",
    "title": "Finish Midterm Exam",
    "course": "CS553",
    "completed": false
}
```

If the item exists, returns the updated item.

If the item does not exist, returns a `404` response.

If the request body contains invalid data, returns a `400` response with a JSON error message.

### `DELETE /api/tasks/:id`

Deletes an existing task.

If the item exists, it is deleted and returns status code `204`.

A `204` response does not need to include a response body.

If the item does not exist, return a `404` response.

## OpenAPI

The API is documented in the `openapi.yaml` file.

## Running
Open two terminals and navigate to the top level of this directory. Execute `npm run server` to run the server. Then, in
the other terminal, execute `npm run client`. The client will run through a list of preprogrammed requests and print the
result to the console. The server console will log all of the requests from the client.