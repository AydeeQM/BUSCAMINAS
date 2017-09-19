var cuadros = 10;
var bombas = 10;
var tablero;
var Quedan = cuadros * cuadros;

//Funcion que ubica las bombas en el tablero
function Bombas(B) {
    var i, j;
    var Restan = B;
    while (Restan > 0) {
        i = Math.floor(cuadros * Math.random());
        j = Math.floor(cuadros * Math.random());
        if (tablero[i][j] == 0) {
            tablero[i][j] = -1;
            Restan--;
        }
    }
    for (i = 0; i < cuadros; i++) {
        for (j = 0; j < cuadros; j++) {
            if (tablero[i][j] < 0) {
                Marca(i - 1, j - 1);
                Marca(i - 1, j);
                Marca(i - 1, j + 1);
                Marca(i, j - 1);
                Marca(i, j + 1);
                Marca(i + 1, j - 1);
                Marca(i + 1, j);
                Marca(i + 1, j + 1);
            }
        }

    }

}

function Marca(x, y) {
    if (x >= 0 && x <= cuadros - 1 && y >= 0 && y <= cuadros - 1) {
        if (tablero[x][y] >= 0) {
            tablero[x][y]++;
        }

    }

}

//Funcion que construye el tablero
function Tablero(N) {
    var i, j;
    tablero = new Array(N)
    for (i = 0; i < N; i++) {
        tablero[i] = new Array(N);
    }

    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            tablero[i][j] = 0;
        }
    }

}

//Funcion que construye el tablero graficamente e internamente
function Construye() {
    var i, j;
    delete (tablero);
    Tablero(cuadros);
    Quedan = cuadros * cuadros;
    var Contenido = "<form action='' name='form1'><table>";
    for (i = 0; i < cuadros; i++) {
        Contenido = Contenido + "<tr>";
        for (j = 0; j < cuadros; j++) {
            Contenido = Contenido + "<td><input type='button' class='boton1' id='boton_" + i.toString() + "_" + j.toString() + "' onclick='Chequea(" + i.toString() + "," + j.toString() + ");'></td>";
        }

        Contenido = Contenido + "</tr>"
    }
    Contenido = Contenido + "</table></form>";
    window.document.getElementById('cuadro').innerHTML = Contenido;
    Bombas(bombas);
}

function Abre(x, y) {
    if (x >= 0 && x <= (cuadros - 1) && y >= 0 && y <= (cuadros - 1)) {
        if (tablero[x][y] >= 0 && (window.document.form1.elements[y + cuadros * x].value.length == 0)) {
            window.document.form1.elements[y + cuadros * x].value = tablero[x][y];
            Quedan--;
            if (tablero[x][y] == 0) {
                Abre(x - 1, y - 1);
                Abre(x, y - 1);
                Abre(x + 1, y - 1);
                Abre(x - 1, y);
                Abre(x + 1, y);
                Abre(x - 1, y + 1);
                Abre(x, y + 1);
                Abre(x + 1, y + 1);
            }
        }
    }

}

function Chequea(x, y) {
    if (tablero[x][y] >= 0) {
        Abre(x, y);
    } else {
        for (i = 0; i < cuadros; i++) {
            for (j = 0; j < cuadros; j++) {
                if (tablero[i][j] >= 0) {
                    window.document.form1.elements[j + cuadros * i].value = tablero[i][j];
                } else {
                    window.document.form1.elements[j + cuadros * i].style.background = "#AA0000";
                }

            }

        }
        alert("Perdiste");
        Quedan = 0;
    }
    if (Quedan == bombas) {
        for (i = 0; i < cuadros; i++) {
            for (j = 0; j < cuadros; j++) {
                if (tablero[i][j] < 0) {
                    window.document.form1.elements[j + cuadros * i].background = "#00AA00";
                }

            }

        }

        alert("Ganaste");
    }
}
function Limpiar() {
    var i, j;
    for (i = 0; i < cuadros; i++) {
        for (j = 0; j < cuadros; j++) {
            window.document.form1.elements[j + cuadros * i].style.background = "#BBBBBB";
            window.document.form1.elements[j + cuadros * i].value = "";
        }
    }
    Quedan = cuadros * cuadros;
}