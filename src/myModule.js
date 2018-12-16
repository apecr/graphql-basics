// Named export - Has a name. Have as many as needed
// Default export (no name, only one)

const message = 'Some message from myModule.js';
const name = 'Alberto';
const location = 'Santiago de Compostela';

const getGreeting = (personName) => `Welcome to the course ${personName}`;

export { message, name, location as default, getGreeting };

