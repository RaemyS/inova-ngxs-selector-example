import { Routes } from '@angular/router';
import {NgxsProblemComponent} from "./ngxs-problem/ngxs-problem.component";
import {NgxsSolutionComponent} from "./ngxs-solution/ngxs-solution.component";

export const routes: Routes = [
  { path: 'ngxs-problem', component: NgxsProblemComponent},
  { path: 'ngxs-solution', component: NgxsSolutionComponent},
  { path: '', redirectTo: '/ngxs-problem', pathMatch: 'full' }
];
