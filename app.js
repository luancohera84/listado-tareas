
require('colors');
const { guardarDB, leerDB }  = require('./helpers/interaccionDB');
const { 
        inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostarListadoCheckList
    }                        = require('./helpers/inquirer');
const Tareas                 = require('./models/tareas');



const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB  = leerDB();

    if ( tareasDB ) {
        // Establecer las tareas
        tareas.cargaTareasFromArray( tareasDB );
    }
    
    do {
        
        // Imprimir el menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Crear tarea
                const desc  = await leerInput( 'Descripción :' );
                tareas.crearTarea( desc );
            break;
            
            case 2:
                // Listar tareas
                tareas.listadoCompleto();
            break;

            case 3:
                // Listar tareas completadas
                tareas.listarPedientesCompletadas( true );
            break;

            case 4:
                // Listar tareas pendientes
                tareas.listarPedientesCompletadas( false );
            break;

            case 5:
                // Completar tareas
                const ids =  await mostarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                
            break;


            case 6:
                // Borrar tareas
                const id =  await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== 0 ) {
                    const confirm = await confirmar( 'Está seguro de borrar está tarea?' );
                    if (confirm) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada con exitó');
                    }
                }
            break;
            
        };

        // Guardar en DB
        guardarDB( tareas.listadoArr );

        
        await pausa();
        
    } while ( opt !== 0 );
};

main();