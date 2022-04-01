import { Component } from '@angular/core';
import directorio from '../../files/directorio.json';

interface BotonDireccion {
  nombre: string;
  abreviatura: string;
  tipo: string;
}
<<<<<<< HEAD
@Component({ 
=======

interface Validaciones {
  tipo: string;
  funcion: () => void;
}

@Component({
>>>>>>> df2237bd49a59f9a3fb712ff00a4f13b1811c642
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent {
  varDireccion: string[] = [];
  varTipoDireccion: string[] = [];
  varDirCofificada: string[] = [];
  ultimaPosicion: number = this.varTipoDireccion.length - 1;
  ultimoTipo: string = this.varTipoDireccion[this.ultimaPosicion];
  penUltimoTipo: string = this.varDireccion[this.ultimaPosicion - 1];
  ultimaDireccion: string = this.varDireccion[this.ultimaPosicion];
  directorioList: BotonDireccion[] = directorio;

  datosSelector: BotonDireccion[] = this.directorioList.filter((dir) => {
    return dir.tipo === 'opcion' || dir.tipo === 'nomenclatura';
  });

<<<<<<< HEAD
  varDireccion      : string[] = [];
  varTipoDireccion  : string[] = [];
  varDirCofificada  : string[] = [];
  directorioList    : BotonDireccion[] = directorio;
=======
  datosNomenclatura: BotonDireccion[] = this.directorioList.filter((dir) => {
    return dir.tipo === 'nomenclatura';
  });
>>>>>>> df2237bd49a59f9a3fb712ff00a4f13b1811c642

  datosNumeros: BotonDireccion[] = this.directorioList.filter((dir) => {
    return dir.tipo === 'numero' || dir.tipo === 'especial';
  });

  datosLetras: BotonDireccion[] = this.directorioList.filter((dir) => {
    return dir.tipo === 'letra';
  });

<<<<<<< HEAD
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
=======
  constructor() {}
  // agregar() {
  //   console.log('Esto es una prueba');
  // }

  validarDirecciones(boton: BotonDireccion): void {
    let tipo: string = boton.tipo;
    let tipoTipos: string[] = [
      'opcion',
      'nomenclatura',
      'numero',
      'especial',
      'letra',
    ];

    if (this.varDireccion[0] === undefined) {
      if (tipo === ('nomenclatura' || 'opcion')) {
        this.llenarDirecciones(boton);
      } else {
        console.log('Alert ->Debe ser tipo nomenclatura');
      }
    } else {
      tipo === ('nomenclatura' || 'opcion')
        ? this.nomenclaturaIgual(boton)
        : false;
    }
  }

  nomenclaturaIgual(boton: BotonDireccion): void {
    this.ultimoTipo !== ('nomenclatura' || 'opcion')
      ? this.llenarDirecciones(boton)
      : console.log(
          'Alert -> No se puede ingresar 2 nomenclaturas del mismo tipo'
        );

    console.log('Se esta ejecutando');
  }

  letraIgual(boton: BotonDireccion): void {
    this.ultimaDireccion !== boton.nombre
      ? this.llenarDirecciones(boton)
      : console.log('Alert -> No se puede ingresar la misma letra');
  }

  letrasSeguidas(boton: BotonDireccion): void {
    (this.ultimoTipo && this.penUltimoTipo) === 'numero'
      ? console.log('Alert -> No se puede ingresar 3 letras seguidas')
      : this.llenarDirecciones(boton);
  }

  simbolosRepetidos(boton: BotonDireccion): void {
    this.ultimaDireccion !== boton.nombre
      ? this.llenarDirecciones(boton)
      : console.log('Alert -> No se puede ingresar la misma letra');
>>>>>>> df2237bd49a59f9a3fb712ff00a4f13b1811c642
  }

  imprimirDirecciones(direccion: string[]): string {
    let impDireccion = '';
    direccion.forEach((element) => {
      impDireccion += `${element} `;
    });
    return impDireccion;
  }

  llenarDirecciones(boton: BotonDireccion): void {
    this.varDireccion.push(boton.nombre);
    this.varDirCofificada.push(boton.abreviatura);
    this.varTipoDireccion.push(boton.tipo);
<<<<<<< HEAD

=======
    console.log(this.varDireccion, this.varDirCofificada);
>>>>>>> df2237bd49a59f9a3fb712ff00a4f13b1811c642
  }

  deshacer(): void {
    this.varDireccion.pop();
    this.varDirCofificada.pop();
  }

<<<<<<< HEAD
  limpiar():void {
    this.varDireccion     = []; 
    this.varDirCofificada = []; 
=======
  limpiar(): void {
    this.varDireccion = [];
    this.varDirCofificada = [];
    console.log(this.varDireccion, this.varDirCofificada);
>>>>>>> df2237bd49a59f9a3fb712ff00a4f13b1811c642
  }

  enviar(): void {
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'http://example.com/'; //Aquí va la URL del proyecto al que le va a llegar el dato

    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'test';
    hiddenField.value = 'testeando la aplicacion';

    document.body.appendChild(form);
    form.submit();
  }
}
