// GENERATOR FUNCTIONS
// mostly specific to sagas...
// good at async operations

// Declare a generator function with 'function*'

function* myGenerator() {
    // yield will pause and exit the function
    yield true;
    // logic can go between the yields
    yield 100;
    yield 'hello';
}
// multiple axios requests can be made in order along with a dispatch

// Generator functions are stored in a variable as an instance of the function
const goDogGo = myGenerator();
// .next calls our generator function
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
