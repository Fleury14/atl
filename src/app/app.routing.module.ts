import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { TipComponent } from './components/tip/tip.component';

const routes = [{
    path: 'home',
    component: LandingComponent
},
{
    path: 'login',
    component: LoginComponent
},
{
    path: 'tip',
    component: TipComponent
},
{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {

}

export const RoutingComponents = [ LandingComponent, LoginComponent, TipComponent ];
