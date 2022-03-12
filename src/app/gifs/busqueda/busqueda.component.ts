import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  @ViewChild('txtBuscar')
  txtBuscar!: ElementRef<HTMLInputElement>;
  
  constructor() { }

  ngOnInit(): void {
  }

  buscar(patron: string) {
    console.log(patron);
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
