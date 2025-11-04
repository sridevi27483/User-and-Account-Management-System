
 function block(){
    function foo(){
        console.log(x);
    }
    foo();
    let x=3;
    foo();
 }

 console.log(x);

 let vals = [];
 for (var x=0;x<4;x += 1){
    vals.push(() => x);
 }
 console.log(vals.map(x => x()));

 let val = [];
for (let x = 0; x < 4; x += 1) {
  val.push(() => x);
}
console.log(val.map(x => x())); // [0, 1, 2, 3]



let name ='jan';
`hi {name},
did you know`;

console.log(name);
//a symbol is immutable and unique
let s1 = Symbol('test');
let s2 = Symbol('test');

console.log(s1 === s2);


//class
class Jedi {
    constructor() {
        this.forceIsDark = false;  // ✅ property defined inside constructor
    }

    toString() {
        return (this.forceIsDark ? 'Join' : 'Fear is the path to') + ' the dark side';
    }
}

// create an object (instance) of the class
const luke = new Jedi();

// call the toString() method
console.log(luke.toString());   // 👉 Output: "Fear is the path to the dark side"

// now change the property
luke.forceIsDark = true;

// call again
console.log(luke.toString()); 

//useless loop
var arr = ['a', 'b', 'c'];

for (var i in arr) {
    if (arr.hasOwnProperty(i)) {
        console.log(i);
    }
}
//Iterator protocol

let it =[1,2,3] [Symbol.iterator]();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function gen(n) {
    return {
      [Symbol.iterator]() {
        let i = 0;
        return {
          next() {
            return {
              done: i > n ? true : false,
              value: i++
            };
          }
        };
      }
    };
  }
  
  console.log(gen(10));
/*for each

const ratings =[5,4,5];
let sum =0;
const asyncSumFunction = async (a,b) => a+b;
const syncSumFunction = (a,b) => a+b;
rarings.forEach(async(rating) => {
    sum=await asyncSumFunction(sum,rating);
});*/
//keys
const arr1 = ['a', 'b', 'c'];
const iterator = arr1.keys();

console.log(iterator);

//map
let m = new Map([...'abcd'].map(x => [x +x]));
console.log(JSON.stringify([...m]));
console.log(JSON.stringify([...m.keys()]));
console.log(JSON.stringify([...m.values()]));
console.log(JSON.stringify([...m.entries()]));

//Generator
// Generator function
function* genFour() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
  }
  
  // Call the generator
  let four = genFour();
console.log(four); // { value: 1, done: false }
console.log(four.next()); // { value: 2, done: false }
console.log(four.next()); // { value: 3, done: false }
console.log(four.next()); // { value: 4, done: true }
console.log(four.next()); // { value: undefined, done: true }



