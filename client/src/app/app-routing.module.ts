import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AddUserComponent } from './component/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent

  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
