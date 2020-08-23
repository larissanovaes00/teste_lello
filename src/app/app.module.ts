import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { HomeContainerComponent } from './components/home-container/home-container.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SidemenuComponent,
    UsersListComponent,
    ModalComponent,
    HomeContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
