import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CafeneaComponent } from './cafenea/cafenea.component';

const routes: Routes = [
  { path: 'cafenea/:id', component: CafeneaComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
