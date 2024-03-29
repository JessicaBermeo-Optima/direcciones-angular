import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { MatDialogRef } from '@angular/material';
import directorio from '../../files/directorio.json';

interface BotonDireccion {
  nombre      : string;
  abreviatura : string;
  tipo        : string;
  nombrable   : boolean;
}
@Component({
  selector    : 'app-listado',
  templateUrl : './listado.component.html',
  styleUrls   : ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  opcionSelector   : string  = '';
  nombreExterno    : string  = '';
  nomPersonalizado : string  = '';
  estadoNombrable  : boolean = false;
  opcionNombrable  : boolean = false;
  url              : string  = '';
  document         : string  = '';
  disableInput     : boolean = true;
  direccionFinal   : BotonDireccion[] = [{ nombre: '', abreviatura: '', tipo: '', nombrable: false }];
  directorioList   : BotonDireccion[] = directorio;


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

  constructor(private _route: ActivatedRoute ) {
  // constructor(private _route: ActivatedRoute, public dialogRef: MatDialogRef<ListadoComponent>) {
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
    if(this.opcionNombrable){this.disableInput=false}
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
    } else if (this.nombreExterno === '') {
      alert('El nombre no puede estar vacio');
    } else {

      let boton     : BotonDireccion = {
        nombre      : this.nombreExterno,
        abreviatura : this.nombreExterno,
        tipo        : 'otro',
        nombrable   : false,
      };

      this.validarNombrableInicial(boton);
    }
  }

  validarNombrableInicial(boton: BotonDireccion) {
    this.opcionNombrable = true;
    if (this.direccionFinal[0].nombre === '') 
      {
        this.direccionFinal[0] = boton;
      } 
      else 
      {
        this.llenarDirecciones(boton);
      }
    this.estadoNombrable  = false;
    this.nombreExterno    = '';
    this.disableInput     = true;
    this.opcionNombrable  = false;
    this.nomPersonalizado = ''; 
  }

  validacionInicial(boton: BotonDireccion): boolean {
    let tipoBoton      : string  = boton.tipo;
    let nombreBoton    : string  = boton.nombre;
    let nombrableBoton : boolean = boton.nombrable;

    this.nomPersonalizado = nombreBoton;
    this.cambiarEstadoNombrable(nombrableBoton);

    if (this.direccionFinal[0].tipo === '') {
      if (tipoBoton === 'nomenclatura' || tipoBoton === 'opcion') {
        this.direccionFinal[0] = boton;
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

    if (dato !== 'OTRA NOMENCLATURA') {
      this.validarNomenclaturas(boton);
    } else {
      this.estadoNombrable = true;
    }

    this.opcionSelector = '';
  }

  validarNomenclaturas(boton: BotonDireccion): void {

    let nombreBoton: string = boton.nombre;
    let ultimaPosicion: number = this.direccionFinal.length - 1;
    let ultimaNomenclatura: string = this.direccionFinal[ultimaPosicion].nombre;

    if (this.validacionInicial(boton)) {
      ultimaNomenclatura === nombreBoton
        ? alert('No se puede ingresar 2 nomenclaturas iguales')
        : this.llenarDirecciones(boton);
    }
  }

  validarNumeros(boton: BotonDireccion): void {
    let tipoBoton: string = boton.tipo;
    let ultimaPosicion: number = this.direccionFinal.length - 1;
    let ultimoTipo: string = this.direccionFinal[ultimaPosicion].tipo;

    if (this.validacionInicial(boton)) {
      tipoBoton === 'numero'
        ? this.llenarDirecciones(boton)
        : this.validarUltimoTipo(ultimoTipo, boton);
    }
  }

  validarUltimoTipo(ultimoTipo: string, boton: BotonDireccion): void {
    ultimoTipo === 'especial'
      ? alert('No se puede ingresar 2 nomenclaturas especiales')
      : this.llenarDirecciones(boton);
  }

  validarLetras(boton: BotonDireccion): void {

    let tamañoDireccion: number = this.direccionFinal.length;
    let ultimaPosicion: number = tamañoDireccion - 1;

    if (this.validacionInicial(boton)) {
      tamañoDireccion > 2
        ? this.validarPenultimoTipo(ultimaPosicion, boton)
        : this.validarUltimoNombre(ultimaPosicion, boton);
    }
  }

  validarPenultimoTipo(ultimaPosicion: number, boton: BotonDireccion): void {

    let ultimoTipo: string = this.direccionFinal[ultimaPosicion].tipo;
    let PenUltimoTipo: string = this.direccionFinal[ultimaPosicion - 1].tipo;

    (ultimoTipo === 'letra' && PenUltimoTipo === 'letra')
      ? alert('No se puede ingresar 3 letras seguidas')
      : this.validarUltimoNombre(ultimaPosicion, boton);

  }
  validarUltimoNombre(ultimaPosicion: number, boton: BotonDireccion): void {
    let ultimoNombre: string = this.direccionFinal[ultimaPosicion].nombre;
    ultimoNombre === boton.nombre
      ? alert('No se puede ingresar 2 letras iguales')
      : this.llenarDirecciones(boton);
  }

  imprimirDirecciones(): string {

    let tipoAnterior: string = 'nomenclatura'
    let impDireccion: string = '';
    this.direccionFinal.forEach((elemento) => {

      if (
          (elemento.tipo !== tipoAnterior || elemento.tipo === 'otro') || 
          (elemento.tipo === 'nomenclatura' && tipoAnterior === 'nomenclatura') || 
          (elemento.tipo === 'opcion' && tipoAnterior === 'opcion')
          ) 
        {
          impDireccion += ` ${elemento.nombre}`;
        } 
          else 
        {
          impDireccion += `${elemento.nombre}`;
      }
      
      tipoAnterior = elemento.tipo;
    });
    return impDireccion.trim().toUpperCase() ;

  }

  imprimirDireccionesCC(): string {

    let tipoAnterior: string = 'nomenclatura'
    let impDireccion: string = '';
    this.direccionFinal.forEach((elemento) => {

      if (
          (elemento.tipo !== tipoAnterior || elemento.tipo === 'otro') || 
          (elemento.tipo === 'nomenclatura' && tipoAnterior === 'nomenclatura') || 
          (elemento.tipo === 'opcion' && tipoAnterior === 'opcion') 
        )
        {
          impDireccion += ` ${elemento.abreviatura}`;
        }
        else
        {
          impDireccion += `${elemento.abreviatura}`;
        }
  
      tipoAnterior = elemento.tipo;
    });

    return impDireccion.trim().toUpperCase();

  }

  llenarDirecciones(boton: BotonDireccion): void {
    this.direccionFinal.push(boton);
  }

  deshacer(): void {
    if (this.direccionFinal.length === 1) {
      this.direccionFinal[0] = { nombre: '', abreviatura: '', tipo: '', nombrable: false };
    } else {
      this.direccionFinal.pop();
    }
    this.cambiarEstadoNombrable(false); 
    this.nomPersonalizado = '';   
  }

  limpiar(): void {
    this.direccionFinal = [{ nombre: '', abreviatura: '', tipo: '', nombrable: false }];
    this.cambiarEstadoNombrable(false);
    this.nomPersonalizado = '';     
  }

  enviar(): void {
    // const form = document.createElement('form');
    // form.method = 'post';
    // form.action = 'http://example.com/'; //Aquí va la URL del proyecto al que le va a llegar el dato

    // const hiddenField = document.createElement('input');
    // hiddenField.type = 'hidden';
    // hiddenField.name = 'test';
    // hiddenField.value = 'testeando la aplicacion';

    // document.body.appendChild(form);
    // form.submit();


    // ESTE ES EL DATO QUE SE VA A ENVIAR
    // this.dialogRef.close(this.imprimirDireccionesCC());
    console.log(this.imprimirDireccionesCC());
  }
}
