function devolverMayor(...arrayValores) {
    return arrayValores.some(num => isNaN(num)) ? undefined :
        arrayValores.reduce((max, num) => num > max ? num : max, arrayValores[0]);

}

let arrayValores = [12, 34, 56, 78, 90, 123, 456, 789, 2345, 6789];
console.log(devolverMayor(...arrayValores));


