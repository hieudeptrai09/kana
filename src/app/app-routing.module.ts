import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { MaxpointComponent } from './components/maxpoint/maxpoint.component';
import { SettingComponent } from './components/setting/setting.component';
import { PlaygroundGuard } from './guards/playground.guard';

const routes: Routes = [
  {
    path: 'playground',
    component: PlaygroundComponent,
    canActivate: [PlaygroundGuard],
  },
  { path: 'maxpoint', component: MaxpointComponent },
  { path: 'setting', component: SettingComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
