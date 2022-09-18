import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map, tap } from 'rxjs';
import {
  ProdusDisponibil,
  PseudoApiService,
} from '../services/pseudo-api.service';

@Component({
  selector: 'app-cafenea',
  templateUrl: './cafenea.component.html',
  styleUrls: ['./cafenea.component.scss'],
})
export class CafeneaComponent implements OnInit {
  idCafenea: number;
  cafele: ProdusDisponibil[] = [];
  displayedColumns: string[] = ['id', 'denumire', 'descriere'];
  coffee_header: string[] = ['coffee_header'];
  tableSource;
  sortedData: ProdusDisponibil[] = [];
  message: string = '';
  listaCafele: boolean;

  constructor(private route: ActivatedRoute, private api: PseudoApiService) {}

  sortData(sort: Sort) {
    const data = this.cafele.slice();

    if (!sort.active || sort.direction === '') {
      this.tableSource = data;
      return;
    }

    this.tableSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'denumire':
          return compare(a.denumire, b.denumire, isAsc);
        case 'descriere':
          return compare(a.descriere, b.descriere, isAsc);
        default:
          return 0;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();
    console.log(typeof this.tableSource.filter);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idCafenea = params['id'];
      this.api
        .getAvailableProductByCoffee(this.idCafenea.toString())
        .subscribe((list) => {
          if (list != undefined) {
            this.listaCafele = true;
            this.message = '';

            this.cafele = list.cafele;
            this.tableSource = new MatTableDataSource(this.cafele);
            console.log(this.tableSource.filteredData);
          } else {
            this.listaCafele = false;
            this.message =
              'Cafeneaua cu id= ' + this.idCafenea + ' ridica o exceptie';
          }
        });
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
