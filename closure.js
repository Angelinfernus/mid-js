/*1- closure : los closure son funciones que manejan variables independientes en otras palabras la función definida
en el closure ¨ recuerda ¨ el entorno en el que se ha creado*/

function nombre(primerNombre) {
    var saludo = "¿Cómo estas?";
    return function (apellido) {
        console.log('Hola ' + primerNombre + ' ' + apellido + ' ' + saludo);
    }
}
nombre('hector')('gonzales');

var apellido = nombre('Guillermo');
apellido('Solveyra');
/*2- Event propagation */

var
    table = document.querySelector('table'),
    tbody = table.querySelector('tbody')
;

addEventListeners();

function addEventListeners() {
    window.addEventListener('click', clearLog, true);
    
    var innerBox = document.querySelector('.box.inner');
    
    var n = innerBox;
    while (n) {
        n.addEventListener('click', listener('c1'), true);
        n.addEventListener('click', listener('c2'), true);
        n.addEventListener('click', listener('b1'));
        n.addEventListener('click', listener('b2'));

        n = n.parentNode;
    }
    window.addEventListener('click', listener('c1'), true);
    window.addEventListener('click', listener('c2'), true);
    window.addEventListener('click', listener('b1'));
    window.addEventListener('click', listener('b2'));
}

function listener(id) {
    return function(e) {
        log(e.eventPhase, e.currentTarget, this, e.target, id);
    }
}

function log(phase, currentTarget, _this, target, id) {
    var row = document.createElement('tr');
    
    td = document.createElement('td');
    td.innerHTML = formatNode(target);
    row.appendChild(td);

    switch (phase) {
        case Event.CAPTURING_PHASE:
            phase = 'capturing';
            break;
        case Event.AT_TARGET:
            phase = 'at target';
            break;
        case Event.BUBBLING_PHASE:
            phase = 'bubbling';
            break;
    }
    var td = document.createElement('td');
    td.innerHTML = phase;
    row.appendChild(td);
    
    td = document.createElement('td');
    td.innerHTML = formatNode(currentTarget);
    row.appendChild(td);
    
    td = document.createElement('td');
    td.innerHTML = formatNode(_this);
    row.appendChild(td);
    
    td = document.createElement('td');
    td.innerHTML = id;
    row.appendChild(td);
    
    tbody.appendChild(row);
}

function formatNode(n) {
    var out;
    
    if (n == window)
        out = 'window';
    else {
        out = n.nodeName.toLowerCase();
        if (n.id) 
            out += '#' + n.id;
    }
    
    return out;
}

function clearLog() {
    tbody.innerHTML = '';
    table.classList.remove('empty');
}
/* ejercicio 3 */
var x = 10;
function y() {
 x = 100;
 return;
 function x() {}
}
y();
/* ¿Que se imprime aca? se imprimira 10 ya que una vez que termina de ejecutarse la funcion
todas las funciones variables y parametros quedan intactos en memoria esa es la funcion de los closure*/
console.log(x);

/* ejercicio 4*/
const user1 = {
    name: 'Jordan',
    age: 28,
   };
   const user2 = {
    name: 'Jordan',
    age: 28,
   };
   console.log(user1 == user2);
   console.log(user1 === user2);
/*Una expresión que compara objetos solo es verdadera si los operandos hacen referencia al mismo objeto*/

/* ejercicio 5 */ 

  /*
    0, 1, 1, 2, 3, 5, 8, 13...
    fn = f(n - 1) + f(n - 2)
    cuando n >= 2
*/

addEventListener('load', function() {
    ejecutarPrograma();
    function ejecutarPrograma() {
        let n = parseInt(prompt('Cantidad de número:'));
        if (Number.isInteger(n) && n > 0) {
            let arrayFibonacci = generarFibonacci(n);
            imprimirArray(arrayFibonacci);
            /*generarFibonacci(n);*/
        } else {
            console.log('El número ingresado no es un entero > 0');
        }
    }

    function generarFibonacci(n) {
        /*let f0 = 0;
        let f1 = 1;
        let fn = null;*/
        let fn = [0, 1];
        if (n <= 1) {
            /*console.log(f0);
            console.log(f1);
            return;*/
            return fn;
        }
        /*console.log(f0);
        console.log(f1);*/
        for (let i = 2; i <= n; i++) {
            fn[i] = fn[i - 1] + fn[i - 2];
            /*fn = f1 + f0;
            f0 = f1;
            f1 = fn;
            console.log(fn);
            */
        }
        return fn;
    }

    function imprimirArray(array) {
        for(let i = 0; i < array.length; i++) {
            console.log(array[i]);
        }
    }
});