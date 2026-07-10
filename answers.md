# Part 1
## 1. Sockets vs. HTTP
A socket facilitates communication between a server and client over a network. The client opens a socket connection
to a known port address, and at the same time the server opens a listening socket on the same port address. When the
server receives a message from the client, it creates a new dedicated socket connection to the client's address.

HTTP defines the request and response structure of the messages between the server and client. The client side
program makes requests that are consistent with the documented HTTP methods, and the server side implements logic
that can respond to those requests. In addition, HTTP also defines the response structure which allows the client
developers to handle the possible responses.

The server does not expose raw socket protocols to avoid having to parse nonuniform
requests from different clients. HTTP forces the client to adhere to a clear list of methods, allowing the server to
handle all possible requests. 

## 2. Request/Response
In the request/response model, the client sends a request to the server. The server then applies logic to the request
to determine if it is valid and to extract the necessary information to service it. After the server has applied logic
it sends a response with either the requested data or an error message indicating why the request couldn't be serviced.

In our TCP command server, the client sent requests that included a command, such as ECHO or TIME, and some additional
data when applicable. The server would process the request and perform logic depending on the requested command. The
server would then respond to the client with the appropriate data.

An HTTP API works similarly, with the primary difference being in how the requests and responses are structured. HTTP
defines a clear structure for requests and responses that includes a status code indicating the result and a body that
includes additional data when applicable.

Express route handlers make responding to requests easier on the developer side. A route handler uses the combination of
an HTTP method and a URI to provide an endpoint for a client request. The request is processed inside the route handler,
and the response is sent.

## 3. Statelessness
A stateless API requires that all of the necessary context be present in a client request and operates without any
prior knowledge of previous requests. 

An advantage of stateless systems is parallelism, meaning that many of these systems can be running at the same time
without having to synchronize with each other. 

A disadvantage is that it can be less efficient than a stateful system. For example, a server could avoid having to
query a database if it knows that the data that is being requested hasn't been modified since the last `get` request.

## 4. HTTP Status Codes
| Situation | Status Code | Justification |
| --------- | ----------- | ------------- |
| A new resource was successfully created | `201` | The status code for successfull resource creation|
| The client requested an item that does not exist | `404` | The status code for a resource not found|
| The client sent JSON missing a required field | `400` | The status code for a bad request|
| The server had an unexpected error | `500` | The status code for an internal server error|
| A successful request returns JSON data | `200` | The status code for successfull request|

# Part 2
## 1. Resource URIs
| Resource | Example URI |
| ----------------- | --- |
| Getting all tasks | `GET /tasks` |
| Getting one task by id | `GET /tasks/1` |
| Creating a task | `POST /tasks` |
| Replacing a task | `PUT /tasks/1` |
| Partially updating a task | `PATCH /tasks/1` |
| Deleting a task | `DELETE /tasks/1` |

## 2. Method Semantics
| Route | Safe | Idempotent |
| ----- | ---- | ---------- |
| `GET /tasks` | Yes, doesn't change anything in the server | Yes, it returns the same result when run more than once |
| `GET /tasks/1` | Yes, doesn't change anything in the server | Yes, it returns the same result when run more than once |
| `POST /tasks` | No, it creates a resource in the server | No, the resource would be duplicated |
| `PUT /tasks/1` | No, replaces a resource in the server | Yes, replacing the same resource produces the same result |
| `PATCH /tasks/1` | No, modifies a resource in the server | Yes if patching with the same data, no if the data is new |
| `DELETE /tasks/1` | No, removes a resource from the server | Yes, deleting the same resource produces the same result|

## 3. JSON Representation
{
    "title": "Complete Midterm Exam",
    "course": "CS453",
    "completed": false
}

# Part 3
See `README.md`

# Part 4
## Middleware
The error handler and logger are implemented in middleware software to make the code more modular. In addition, it helps
keep the scope of the service code to the essential functions of the service. Finally, it allows separate services
to make use of the same infrastructure code which makes the software more scalable.

## Part 5
See `README.md`

## Part 6
See `src/openapi.yml`

# Part 7
## 1. Code vs Contract
The express route is ideally the code implementation of the OpenAPI contract. The express code implements the logic
of different routes that are accessed. The OpenAPI contract describes the valid routes for the API as well as the valid
requests and expected responses.

## 2. Drift
One example of drift could occur if a resource is moved to a different URL and the OpenAPI documentation is not updated.
Another instance of drift could occur if the shape of the return JSON is changed.

## 3. Client Impact
Client developers need to understand the behavior of the API that they are accessing. Accurate documentation lets
the developer know what format the requested data will be in. It also allows the developer to design useful tests and
handle potential errors. Inaccurate documentation leaves the developer unsure of how to interface with the API and
creates the potential for unhandled errors and edge cases.

# Part 8 Graduate
## Option A - Architecture Critique
A multi-service architecture could be used to expand the current course API. The grades and assignments could be grouped
into one service since it is unlikely that one would be accessed without the other. The users and notifications
services could be separate services as well. The services would communicate to one another through middleware. For
example, if the assignments/grades service was updated, it could make an API call to the notifications service
to notify the users. This would in turn result in the notifications service accessing the users service. All of this
internal logic would be abstracted from the client which would access the course API through one entry point.