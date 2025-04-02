import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';



export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'devices',
        component:DevicesComponent
    },
    {
        path:'devices/:id',
        component:DeviceDetailsComponent
    },
    {
        path:'user-details',
        component:UserDetailsComponent
    }
];
