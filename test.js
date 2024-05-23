class Person {
  static species = 22;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log(`Hello, I am ${this.name}`);
  }
}

// Iterate over own properties of the class
for (let [key, value] of Object.entries(Person)) {
    // Check if the property is a function
      // If the property is a function, log it
      console.log(value);
    
  }