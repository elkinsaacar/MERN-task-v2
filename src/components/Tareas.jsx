import React, { useEffect, useState, useCallback  } from "react";

function Tareas() {

    const [infoTareas, setInfoTareas] = useState([]);
    const [consultarTareas, setConsultarTareas] = useState(true);
    const [idTarea, setIDTarea] = useState(0);
    const [tituloTarea, setTituloTarea] = useState('');
    const [descripcionTarea, setDescripcionTarea] = useState('');

    useEffect( () => {
        //console.log("--CONSULTAR TAREAS--");
        obtenerTareas();
        setConsultarTareas(false);
      },
    [consultarTareas]);

    const obtenerTareas = () => {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            console.log( data );
            setInfoTareas( data );
        });
    }

    const handleChangeTitle = (event) => {
        setTituloTarea(event.target.value)
    }

    const handleChangeDescription = (event) => {
        setDescripcionTarea(event.target.value)
    }

    const listaTareas = infoTareas.map(
        tarea => {
            return(
                <tr key={tarea._id}>
                <td>{tarea.title}</td>
                <td>{tarea.description}</td>
                <td>
                    <button onClick={() => deleteTask(tarea._id)} className="btn light-blue darken-4">
                        <i className="material-icons">delete</i>
                    </button>
                    <button onClick={() => editTask(tarea._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                        <i className="material-icons">edit</i>
                    </button>
                </td>
            </tr>
            )
        }
    );

    const addTask = (event) => {
        event.preventDefault();
        if( idTarea ){
            //alert("--EDITAR TAREA--");
            fetch(`/api/tasks/${idTarea}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: tituloTarea,
                    description: descripcionTarea
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                window.M.toast({html: 'Tarea Actualizada !!'});
                setIDTarea(0);
                setTituloTarea('');
                setDescripcionTarea('');
                obtenerTareas();
            });
        } else {
            //alert("--NUEVA TAREA--");
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    title: tituloTarea,
                    description: descripcionTarea
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.M.toast({html: 'Tarea Guardada !!'});
                setIDTarea(0);
                setTituloTarea('');
                setDescripcionTarea('');
                obtenerTareas();
            })
            .catch(err => console.error(err));
        }
    }

    const editTask = (idTarea) => {
        //alert(`--EDITAR TAREA ${idTarea}--`);
        fetch(`/api/tasks/${idTarea}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setIDTarea( data._id );
            setTituloTarea( data.title );
            setDescripcionTarea( data.description );
        });
    }

    const deleteTask = (idTarea) => {
        //alert("--BORRAR TAREA--");
        if( confirm('De verdad quiere borrar la tarea?') ){
            fetch(`/api/tasks/${idTarea}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Borrada !!'});
                obtenerTareas();
            });
        }
    }
    
    return(
        <div>
            {/* Navegacion */}
            <nav className="light-blue darken-4">
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">MERN Tasks</a>
                    </div>
                </div>
            </nav>
            
            {/* Formulario Y Lista */}
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={addTask}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="title" type="text" placeholder="Task Title" onChange={handleChangeTitle} value={tituloTarea} autoFocus/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="description" cols="30" rows="10" placeholder="Task Description" onChange={handleChangeDescription} value={descripcionTarea} className="materialize-textarea"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">Guardar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaTareas}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Tareas;