import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAppComponent } from './components/edit-app/edit-app.component';

const routes: Routes = [
  { path: "admin", component: EditAppComponent },
  { path: "", redirectTo: "/admin", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
