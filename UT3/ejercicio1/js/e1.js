// 1
let variable = document.getElementById("primerelemento");

console.log(variable);

// 2
do{
    
    // a)
    console.log(variable.nodeName);
    // b)
    console.log(variable.nodeType);
    // c)
    console.log(variable.nodeValue);
    // d)
    console.log(variable.textContent);
    
} while(variable = variable.nextElementSibling);