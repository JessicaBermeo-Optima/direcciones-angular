import { Component } from '@angular/core';
import directorio from '../../files/directorio.json';

interface BotonDireccion {
  nombre: string;
  abreviatura: string;
  tipo: string;
}

interface Validaciones {
  tipo: string;
  funcion: () => void;
}

@Component({
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

  datosNomenclatura: BotonDireccion[] = this.directorioList.filter((dir) => {
    return dir.tipo === 'nomenclatura';
  });

  datosNumeros: BotonDireccion[] = this.directorioList.filter((dir) => {
    return dir.tipo === 'numero' || dir.tipo === 'especial';
  });

  datosLetras: BotonDireccion[] = this.directorioList.filter((dir) => {
    return dir.tipo === 'letra';
  });

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
    console.log(this.varDireccion, this.varDirCofificada);
  }

  deshacer(): void {
    this.varDireccion.pop();
    this.varDirCofificada.pop();
    console.log(this.varDireccion, this.varDirCofificada);
  }

  limpiar(): void {
    this.varDireccion = [];
    this.varDirCofificada = [];
    console.log(this.varDireccion, this.varDirCofificada);
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
