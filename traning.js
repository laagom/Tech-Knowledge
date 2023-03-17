function first() { 
    console.log("Call function first!")
}

function second() {
    first()
    console.log("Call function second!")
}

function third() { 
    second()
    console.log("Call function third")
}

third()