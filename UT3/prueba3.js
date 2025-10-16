let num=1;
let idInterval = setInterval( function(){
    console.log(num++);
    if(num>10){
        clearInterval(idInterval);
    }
}, 1000);