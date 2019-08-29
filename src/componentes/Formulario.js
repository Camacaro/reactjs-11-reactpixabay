import React, { Component } from 'react';

class Formulario extends Component {
    
    busquedaRef = React.createRef();

    obtenerDatos = (e) => {    
        e.preventDefault();

        const termino = this.busquedaRef.current.value;

        //console.log(termino);
        /** Esto viene de app.js */
        this.props.datosBusqueda(termino);
        

    }
    
    render() {
        return (
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input ref={this.busquedaRef} className="form-control form-control-lg" type="text" placeholder="busca tu imagen.. ejemplo: futboll" />
                    </div>

                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar"/>
                    </div>
                </div>
            </form>
        );
    }
}

export default Formulario;