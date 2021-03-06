import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  estados;

  constructor(
    private router: Router,
    private statesSrv: StatesService
  ) { }

  ngOnInit() {
    const $mapa = document.getElementsByTagName('svg')[0];
    const $etiqueta = document.getElementById('etiqueta');
    const estadosHash = {};

    this.statesSrv.getStates().subscribe(data => {
      this.estados = data;
      for (const estado of this.estados) {
        estadosHash[estado.id_state] = estado.name;
      }
    });


    // Mostrar el estado en la etiqueta
    $mapa.addEventListener('mouseover', function(evt) {
      const target = evt.target as HTMLElement;
      const key = target.dataset.key;
      const edo = estadosHash[key];
      $etiqueta.innerText = edo ? edo : '';
    });

    // Navega hacia el estado seleccionado
    $mapa.addEventListener('click', (evt) => {
      this.selectEstado(evt);
      this.irEstado();
    });

  }

  selectEstado(evt: MouseEvent) {
    const $estadosSelect = document.getElementById('estadoSelect') as HTMLSelectElement;
    const target = evt.target as HTMLElement;
    const key = target.dataset.key;
    if (key) {
      $estadosSelect.value = key;
    }
  }

  irEstado(estado?: string) {
    const $estadosSelect = document.getElementById('estadoSelect') as HTMLSelectElement;
    if ($estadosSelect.value === '0') { return; }
    estado = estado || $estadosSelect.value;
    this.router.navigate(['estado', estado]);
  }

}
