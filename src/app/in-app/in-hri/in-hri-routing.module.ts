import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InHriComponent } from './in-hri.component';
import { Hri001EvaluationListComponent } from './pages/hri001-evaluation-list/hri001-evaluation-list.component';

const routes: Routes = [
  {
    path: '',
    component: InHriComponent,
    children: [
      {
        path: '',
        redirectTo: 'hri001-evaluation-list',
        pathMatch: 'full',
      },
      {
        path: 'hri001-evaluation-list',
        component: Hri001EvaluationListComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PHriRoutingModule {}
