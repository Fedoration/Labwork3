import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataComponent } from './data/data.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', component: DataComponent},
  { path: 'editing', component: TableComponent},
  { path: 'auth', component: LoginComponent},
  { path: '**', redirectTo: 'auth'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
