const start = performance.now();

function test(start) {
    console.log(performance.now() - start)
}

setTimeout(test, 1000, start);