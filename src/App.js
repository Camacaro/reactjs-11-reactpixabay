import React, { Component } from 'react';
import Formulario from './componentes/Formulario';
import Resultado from './componentes/Resultado';
import './App.css';

class App extends Component {
	
	state = {
		termino: '',
		imagenes: [],
		pagina: '',
		cargando: false
	}

	consultarAPI = async () => {
		
		const termino = this.state.termino;

		const pagina = this.state.pagina;

		const url =  `https://pixabay.com/api/?key=12855250-4db4c6535427b3fdbb3cda2d4&q=${termino}&per_page=30&page=${pagina}`;

		console.log(url);

		await fetch(url)
			.then( respuesta  => {
				
				this.setState({
					cargando: true
				});

				return respuesta.json()
			})
			.then( resultado  =>  {

				/**
				 * Simular retardo en carga de imagenes
				 */
				setTimeout(() => {
					this.setState({ 
						imagenes: resultado.hits,
						cargando: false 
					});	
				}, 2000);

				/*this.setState({ 
					imagenes: resultado.hits,
					cargando: false 
				});*/
			})
		} 

	datosBusqueda = (termino) => {
		
		/** 
		 * Implementando un callback al setearse la variable en el state
		 */
		this.setState(
			{
				termino,
				pagina: 1
			},
			() => {
				this.consultarAPI();
			}
		);
	}

	paginaAnterior = () => {
		
		let pagina = this.state.pagina;

		if( pagina === 1 ){
			return null;
		}
		
		pagina--;

		this.setState({
			pagina
		}, () => { 
			this.consultarAPI();
			this.scroll();
		});

		//console.log(pagina);
	}

	paginaSiguiente = () => {

		let pagina = this.state.pagina;
		
		pagina++;

		this.setState({
			pagina
		}, () => { 
			this.consultarAPI() ;
			this.scroll();
		});

		//console.log(pagina);
	}

	scroll = () => {
		/**
		 * Con querySelector puedo seleccionar clases, id de todo el documento
		 */
		const elemento = document.querySelector('.jumbotron');
		/**
		 * Con esto reinicio el scroll al inicio y le toma un efecto smooth
		 */
		elemento.scrollIntoView('smooth', 'start');
	}
	
	render() {
		
		const cargando = this.state.cargando;
		
		let resultado;

		if( cargando ){

			resultado = <div className="spinner">
							<div className="double-bounce1"></div>
							<div className="double-bounce2"></div>
						</div>
		}else {

			resultado = <Resultado 
							imagenes={this.state.imagenes} 
							paginaAnterior = {this.paginaAnterior}
							paginaSiguiente = {this.paginaSiguiente}
						/>
		}
				
		return (
			<div className="app container">
				<div className="jumbotron">
					<p className="lead text-center"> Buscador de Imagenes </p>

					<Formulario datosBusqueda={this.datosBusqueda} />

				</div>

				<div className="row justify-content-center">
					{ resultado }
				</div>
			</div>
		);
	}
}

export default App;