async function  main() {
    // Check the health of the server
    let response = await fetch('http://localhost:3000/health');
    let data = await response.json();
    console.log(JSON.stringify(data) + "\n");

    // Create a task
    console.log("Creating a task");
    response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: "Client Task", course: "CS553"}),
    });
    data = await response.json();
    console.log(JSON.stringify(data) + "\n");

    console.log("List all tasks");
    // List all tasks
    response = await fetch('http://localhost:3000/api/tasks', {
        method: 'GET',
    });
    data = await response.json();
    console.log(JSON.stringify(data) + "\n");

    console.log("List created task");
    // Get one task by id
    response = await fetch('http://localhost:3000/api/tasks/1', {
        method: 'GET',
    });
    data = await response.json();
    console.log(JSON.stringify(data) + "\n");

    console.log("Update created task");
    // Update a task
    response = await fetch('http://localhost:3000/api/tasks/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({completed: true}),
    });

    data = await response.json();
    console.log(JSON.stringify(data) + "\n");

    console.log ("Deleting created task" + "\n");
    // Delete a task
    response = await fetch('http://localhost:3000/api/tasks/1', {
        method: 'DELETE',
    });

    console.log("List all tasks");
    // List all tasks
    response = await fetch('http://localhost:3000/api/tasks', {
        method: 'GET',
    });
    data = await response.json();
    console.log(JSON.stringify(data) + "\n");
}

main();