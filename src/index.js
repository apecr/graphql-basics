import myCurrentLocation, { message, name, getGreeting } from './myModule';
import subs, { add } from './math';

console.log(message);
console.log(name);
console.log(myCurrentLocation);
console.log(getGreeting('Jessica'));

// 1. Create a new file called math.js
// 2. Define add function
// 3. Define sbstract
// 4. add default
// 5. substract named export
// 6. Import both in index.js
// 7. Use both to print the result

console.log(add(5, 4), subs(12, 40));