import { Component } from '@angular/core';
import directorio from '../../files/directorio.json'

interface BotonDireccion {
  nombre      : string;
  abreviatura : string;
  tipo        : string;
}
@Component({ 
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent{

  varDireccion      : string[] = [];
  varTipoDireccion  : string[] = [];
  varDirCofificada  : string[] = [];
  directorioList    : BotonDireccion[] = directorio;

  datosSelector     : BotonDireccion[] = this.directorioList.filter((dir) => {
                        return dir.tipo === 'opcion' || dir.tipo === 'nomenclatura';
                      });

  datosNomenclatura : BotonDireccion[] = this.directorioList.filter((dir) => {
                      return dir.tipo === 'nomenclatura';
                      });

  datosNumeros      : BotonDireccion[] = this.directorioList.filter((dir) => {
                        return dir.tipo === 'numero' || dir.tipo === 'especial';
                      });

  datosLetras       : BotonDireccion[] = this.directorioList.filter((dir) => {
                        return dir.tipo === 'letra';
                      });

  constructor() { 

  }

  validacionInicial( boton : BotonDireccion ):boolean {
    
    let tipo : string = boton.tipo;
    if (this.varDireccion[0] === undefined ) {
      if (tipo === ('nomenclatura' || 'opcion')) {
        this.llenarDirecciones( boton );
        return false;
      } else {
        alert('Debe ser tipo nomenclatura');
        return false;
      }      
    } else {
      return true;
    }
  }
  
  validarNomenclaturas( boton : BotonDireccion ): void {

    let ultimaPosicion : number  = this.varTipoDireccion.length - 1 ;
    let ultimoTipo     : string  = this.varTipoDireccion[ultimaPosicion];

    if (this.validacionInicial( boton )) {
      ultimoTipo !== ('nomenclatura' || 'opcion')
                      ? this.llenarDirecciones( boton )
                      : alert('No se puede ingresar 2 nomenclaturas del mismo tipo');
    }
    console.log(ultimoTipo);
  }

  validarNumeros( boton : BotonDireccion ): void {

    let tipo           : string  = boton.tipo;
    let ultimaPosicion : number  = this.varTipoDireccion.length - 1 ;
    let ultimoTipo     : string  = this.varTipoDireccion[ultimaPosicion];

    if (this.validacionInicial( boton )) {

      tipo === 'numero' ? this.llenarDirecciones( boton )
                        : ultimoTipo === 'especial' ? alert('No se puede ingresar 2 nomenclaturas especiales')
                        : this.llenarDirecciones( boton );
    }
    console.log(ultimoTipo);
  }

  validarLetras( boton : BotonDireccion ): void {
    
    let nombre         : string  = boton.nombre;
    let ultimaPosicion : number  = this.varTipoDireccion.length - 1 ;
    let ultimoTipo     : string  = this.varTipoDireccion[ultimaPosicion];
    let PenUltimoTipo  : string  = this.varTipoDireccion[ultimaPosicion - 1];
    let ultimoNombre   : string  = this.varDireccion[ultimaPosicion];

    if (this.validacionInicial( boton )) {

      ( ultimoTipo && PenUltimoTipo ) === 'letra' ? alert('No se puede ingresar 3 letras seguidas')
                                      :  ultimoNombre === nombre ? alert('No se puede ingresar 2 letras iguales')
                                      : this.llenarDirecciones( boton );
    }
  }

  imprimirDirecciones( direccion: string[] ) : string {

    let impDireccion = '';
    direccion.forEach(element => {
        impDireccion  += `${element} `;
    });
    return impDireccion;

  }

  llenarDirecciones( boton : BotonDireccion ):void {
    
    this.varDireccion.push(boton.nombre); 
    this.varDirCofificada.push(boton.abreviatura);
    this.varTipoDireccion.push(boton.tipo);

  }

  deshacer(): void {
    this.varDireccion.pop(); 
    this.varDirCofificada.pop();
  }

  limpiar():void {
    this.varDireccion     = []; 
    this.varDirCofificada = []; 
  }

  enviar():string {
    return this.imprimirDirecciones(this.varDirCofificada);
  }

}
