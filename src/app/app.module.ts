import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingComponent } from './components/setting/setting.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { MaxpointComponent } from './components/maxpoint/maxpoint.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestypePipe } from './pipes/questype.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SettingComponent,
    PlaygroundComponent,
    MaxpointComponent,
    HomeComponent,
    QuestypePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
