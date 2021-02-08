import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DndModule } from 'ngx-drag-drop';

import { AppComponent } from './app.component';
import { EditAppComponent } from './components/edit-app/edit-app.component';

@NgModule({
  declarations: [
    AppComponent,
    EditAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
