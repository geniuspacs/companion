import { Component } from '@angular/core';

// Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;

  usuarios:any[] = [];

  taxistaSeleccionado:any = {};
  siguiendo:boolean = false;

  constructor(afDB: AngularFireDatabase) {
    afDB.list('/usuarios').subscribe( taxistas => {
      console.log(taxistas);
      this.usuarios = taxistas;

      if(this.siguiendo) {
        // Estoy siguiendo a un taxista
        for (let miTaxista of taxistas ) {
          if(miTaxista.$key === this.taxistaSeleccionado.$key) {
            this.lat = miTaxista.lat;
            this.lng = miTaxista.lng;
          }
        }
      }

    });
  }

  seguir_taxista(taxista:any) {
    this.siguiendo = true;
    this.lat = taxista.lat;
    this.lng = taxista.lng;
    this.taxistaSeleccionado = taxista;
  }

  dejar_seguir() {
    this.siguiendo = false;
    this.taxistaSeleccionado = {};
  }


}
