import { Component, OnInit } from '@angular/core';
import {
  ProdusDisponibil,
  PseudoApiService,
} from './services/pseudo-api.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { CafeneaSauLocalitate } from './models/cafeneasaulocalitate';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface FoodNode {
  name: string;
  children?: FoodNode[];
}
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

class DFSGraph {
  public adj: Array<number>[];
  public size: number;
}

class DFS {
  public dfs(G: DFSGraph, startVert: number) {
    let visited: boolean[] = Array<boolean>();

    for (let i = 0; i < G.size; i++) {
      visited.push(false);
    }

    let s: number[] = new Array();
    visited[startVert] = true;
    console.log('nod curent' + startVert);

    s.push(startVert);

    while (s.length > 0) {
      const v = s.pop();
      for (let adjV of G.adj[v]) {
        if (!visited[adjV]) {
          visited[adjV] = true;
          s.push(adjV);
        }
      }
    }
  }
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Localitati',
    children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
  },
  {
    name: 'Cafenele',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ExAngular';
  cafeOrCity: CafeneaSauLocalitate[] = [];
  localitati: Array<string> = [];
  cafenele: CafeneaSauLocalitate[] = [];
  coffees;
  treeNodes: FoodNode[] = [];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private api: PseudoApiService) {}
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  private _coffeeSubject = new BehaviorSubject<[]>([]);
  coffee$ = this._coffeeSubject.asObservable();

  ngOnInit(): void {
    this.api.cafeOrCity$.subscribe((lista) => (this.cafeOrCity = lista));
    this.treeNodes = TREE_DATA;
    this.dataSource.data = this.treeNodes;

    //   this.api.ProduseDisponibile(8133).subscribe((cafele) => {
    //     console.log('Am obtinut o lista cu cafele', cafele);
    //   });
  }
}
