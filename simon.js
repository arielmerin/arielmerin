
const btnEmpezar = document.getElementById('btnEmpezar')
const azul = document.getElementById('azul')
const magenta = document.getElementById('magenta')
const verde = document.getElementById('verde')
const naranja = document.getElementById('naranja')
const ULTIMO_NIVEL = 10

class Juego{
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)

    }
    inicializar(){
        this.inicializar= this.inicializar.bind(this)
        this.elegirColor= this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            azul,
            magenta,
            verde,
            naranja
        }
    }
    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else {
            btnEmpezar.classList.add('hide')
        }
    }
    generarSecuencia(){
        /**
         * Es importante llamar a la función fill, para que estén definidios y al menos tengan un valor
         * luego llamar a map
         * @type {any[]}
         */
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClic()
    }
    tranformarNumeroAColor(numero){
        switch (numero){
            case 0:
                return 'azul'
            case 1:
                return 'magenta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(color){
        switch (color){
            case 'azul':
                return 0
            case 'magenta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3

        }
    }

    iluminarSecuencia(){
        for ( let i = 0; i < this.nivel; i++){
            const color = this.tranformarNumeroAColor(this.secuencia[i])
            setTimeout( () => this.iluminarColor(color), 1000*i)
        }
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    agregarEventosClic(){

        this.colores.azul.addEventListener('click', this.elegirColor)
        this.colores.magenta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClic(){
        this.colores.azul.removeEventListener('click', this.elegirColor)
        this.colores.magenta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }
    ganoElJuego(){
        swal('Felicidades', '¡Ganste el juego!', "success")
            .then(this.inicializar)
    }
    perdioElJuego(){
        swal('Error', 'Lamentablemente perdiste el juego\nSígelo intentando', "error")
            .then(() => {
                this.eliminarEventosClic()
                this.inicializar()
            })
    }
    elegirColor(ev){
        /**
         * para ver quién es quien dispara este método
         * console.log(this)
         *
         * con bind vamos a atar el método a this
         */
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel){
                this.nivel++
                // this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                }
                else {
                    setTimeout( this.siguienteNivel, 1500)
                }
            }
        }else {
            this.perdioElJuego()
            // tocó mal el botón, perdió
        }


    }
}
function empezarJuego(){
    window.juego = new Juego()
}
