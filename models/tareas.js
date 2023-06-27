const Tarea = require('./tarea');
const colors =  require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys( this._listado ).forEach( key => {
            listado.push( this._listado[key] );
        });

        return listado;

    };

    constructor( ) {
        this._listado = {};
    };

    borrarTarea( id = '' ){
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    };

    cargaTareasFromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });


    };

    crearTarea( desc ) {
        
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto(){
        console.log();
        /*  Tarea a resolver.
            1: en verde
            Completada: en verde
            Pendiente: rojo

            1. Alma :: Completada | Pendiente
            2. Mente :: Completada | Pendiente
            3. Poder :: Completada | Pendiente
        */
        /*
            Resolución 1
            for (let index = 0; index < this.listadoArr.length; index++) {
                const element = this.listadoArr[index];
                let completadoEn = 'Pendiente'.red;
                if ( element.completadoEn ) {
                    completadoEn = 'Completada'.green;
                }
                console.log(` ${ colors.green(index+1) }${'.'.green}`, element.desc,'::', completadoEn);
                
            }
        */
        // Resolución 2
        this.listadoArr.forEach( ( tarea, i  ) => {

            const idx                    = `${ i + 1 }.`.green;
            const { desc, completadoEn } = tarea;
            const estado                 = ( completadoEn )
                                         ? 'Completada'.green
                                         : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado } `);

        });
    };

    listarPedientesCompletadas( completada = true ){
        console.log();
        let idx  =  0;
        this.listadoArr.forEach( ( tarea, i  ) => {

            const { desc, completadoEn } = tarea;
            const estado                 = ( completadoEn )
                                         ? 'Completada'.green
                                         : 'Pendiente'.red;
            if ( completada ) {
                // Mostrar completadas
                if ( completadoEn ) {
                    idx += 1;
                    console.log(`${ ( idx + '.').green } ${ desc } :: ${ completadoEn.green } `);
                }
            } else {
                // Mostrar pendientes
                if ( !completadoEn ) {
                    idx += 1;
                    console.log(`${ ( idx + '.').green } ${ desc } :: ${ estado } `);
                }
            }


        });
    };

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( ! ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }

        });


    };

};

module.exports = Tareas;