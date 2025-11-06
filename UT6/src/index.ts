// Ejemplo 3:
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string { // Returns string
    return this.name;
  }
}

let jesus: Person = new Person("Jesús");
console.log(jesus.getName());

// Aquí escribimos TypeScript
alert("Hola mundo en TypeScript");