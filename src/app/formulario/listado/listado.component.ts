import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import directorio from '../../files/directorio.json';

interface BotonDireccion {
  nombre: string;
  abreviatura: string;
  tipo: string;
  nombrable: boolean;
}
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  opcionSelector: string = '';
  nombreExterno: string = '';
  nomPersonalizado: string = '';
  estadoNombrable: boolean = false;
  opcionNombrable: boolean = false;
  direccionFinal: BotonDireccion[] = [{ nombre: '', abreviatura: '', tipo: '', nombrable: false }];
  directorioList: BotonDireccion[] = directorio;
  url: string = '';
  document: string = '';

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

  constructor(private _route: ActivatedRoute) {
    console.log('Constructor de direcciones');
  }
  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      this.url = params['url'];
      this.document = params['document'];
    });
  }

  cambiarEstadoNombrable(estado: boolean): void {
    this.estadoNombrable = Boolean(estado);
    this.opcionNombrable = false;
  }

  validarNombrable() {
    let regexObj1 = /(?=.*\d+)/;
    let regexObj2 = /(?=.*[!@#$%&*]+)/;
    if (
      regexObj1.test(this.nombreExterno) ||
      regexObj2.test(this.nombreExterno)
    ) {
      alert('El nombre no puede contener numeros o caracteres especiales');
      this.nombreExterno = '';
    } if (this.nombreExterno === '') {
      alert('El nombre no puede estar vacio');
    } else {
      let boton: BotonDireccion = {
        nombre: this.nombreExterno,
        abreviatura: this.nombreExterno,
        tipo: 'otro',
        nombrable: false,
      };
      this.llenarDirecciones(boton);
      this.estadoNombrable = false;
      this.nombreExterno = '';
    }
  }

  validacionInicial(boton: BotonDireccion): boolean {
    let tipo: string = boton.tipo;
    let nombre : string  = boton.nombre;
    let nombrable: boolean = boton.nombrable;
    
    this.nomPersonalizado = nombre;
    this.cambiarEstadoNombrable(nombrable);

    if (this.direccionFinal[0] === undefined) {
      if (tipo === 'nomenclatura' || tipo === 'opcion') {
        this.llenarDirecciones(boton);
        return false;
      } else {
        alert('Debe ser tipo nomenclatura');
        return false;
      }
    } else {
      return true;
    }
  }

  validarSelector(dato: string): void {
    let boton: BotonDireccion = this.directorioList.find(
      (dir) => dir.nombre === dato
    ) || { nombre: '0', abreviatura: '0', tipo: '0', nombrable: false };

    this.opcionSelector = '';
    this.validarNomenclaturas(boton);
  }

  validarNomenclaturas(boton: BotonDireccion): void {

    let ultimaPosicion: number = this.direccionFinal.length - 1;
    let ultimoTipo: string = this.direccionFinal[ultimaPosicion].tipo;

    if (this.validacionInicial(boton)) {
      ultimoTipo === 'nomenclatura' || ultimoTipo === 'opcion'
        ? alert('No se puede ingresar 2 nomenclaturas del mismo tipo')
        : this.llenarDirecciones(boton);
    }
  }

  validarNumeros(boton: BotonDireccion): void {
    let tipo: string = boton.tipo;
    let ultimaPosicion: number = this.direccionFinal.length - 1;
    let ultimoTipo: string = this.direccionFinal[ultimaPosicion].tipo;

    if (this.validacionInicial(boton)) {
      tipo === 'numero'
        ? this.llenarDirecciones(boton)
        : this.validarUltimoTipo(ultimoTipo, boton);
    }
  }

  validarUltimoTipo(ultimoTipo: string, boton: BotonDireccion): void {
    if (ultimoTipo === 'especial') {
      alert('No se puede ingresar 2 nomenclaturas especiales');
    } else {
      this.llenarDirecciones(boton);
    }
  }

  validarLetras(boton: BotonDireccion): void {
    let ultimaPosicion: number = this.direccionFinal.length - 1;
    let ultimoTipo: string = this.direccionFinal[ultimaPosicion].tipo;
    let PenUltimoTipo: string = this.direccionFinal[ultimaPosicion - 1].tipo;
    let ultimoNombre: string = this.direccionFinal[ultimaPosicion].nombre;

    if (this.validacionInicial(boton)) {
      (ultimoTipo && PenUltimoTipo) === 'letra'
        ? alert('No se puede ingresar 3 letras seguidas')
        : this.validarUltimoNombre(ultimoNombre, boton);
    }
  }

  validarUltimoNombre(ultimoNombre: string, boton: BotonDireccion): void {
    if (ultimoNombre === boton.nombre) {
      alert('No se puede ingresar 2 letras iguales');
    } else {
      this.llenarDirecciones(boton);
    }
  }

  imprimirDirecciones1(): string {

    let impDireccion: string = '';
    this.direccionFinal.forEach((element) => {
      impDireccion += `${element.nombre} `;
    });
    return impDireccion;

  }

  imprimirDirecciones2(): string {

    let impDireccion: string = '';
    this.direccionFinal.forEach((element) => {
      impDireccion += `${element.abreviatura} `;
    });
    return impDireccion;

  }

  llenarDirecciones(boton: BotonDireccion): void {
    this.direccionFinal.push(boton);
  }

  deshacer(): void {
    this.direccionFinal.pop();
    this.cambiarEstadoNombrable(false);
  }

  limpiar(): void {
    this.direccionFinal = [{ nombre: '', abreviatura: '', tipo: '', nombrable: false }];
    this.cambiarEstadoNombrable(false);
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
