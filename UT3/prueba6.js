/*// Prueba 6
console.log("Prueba 6");
console.log('documnetElement', document.documentElement);
console.log('head', document.head);
console.log('body', document.body);
console.log('id', document.getElementById("titulo1"));
console.log('class', document.getElementsByClassName("parrafos"));
console.log('html tag', document.getElementsByTagName("p"));

// Prueba 6.1
console.log("Prueba 6.1");
let body = document.body;
let head = document.head;
console.log('chilNodes de head', head.childNodes);
console.log('chilNodes de body', body.childNodes);
console.log('children de head', head.children);
console.log('children de body', body.children);
console.log('parentNode de head', head.parentNode);
console.log('parentNode de body', body.parentNode);
console.log('nextSibling de head', head.nextSibling); // null si es body
console.log('previousSibling de body', body.previousSibling); // null si es head
console.log('nextElementSibling de head', head.nextElementSibling); // null si es body
console.log('previousElementSibling de body', body.previousElementSibling); // null si es head
*/

// Prueba 7
console.log("Prueba 7")

let elementosP = document.getElementsByTagName("p");
for (let i = 0; i < elementosP.length; i++){
    console.log(elementosP[i]);
}

while(document.getElementsByClassName("parrafos").length > 0){
    document.getElementsByClassName("parrafos")[0].remove();
}

for (let i = 0; i < elementosP.length; i++){
    console.log(elementosP[i]);
}
