import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule, MatDialogModule,
  MatDividerModule, MatGridListModule, MatIconModule,
  MatInputModule, MatProgressBarModule, MatSelectModule, MatSidenavModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { MainComponent } from './main/main.component';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GenerateDialogComponent } from './generate-dialog/generate-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PreviewDialogComponent,
    GenerateDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule
  ],
  entryComponents: [
    PreviewDialogComponent,
    GenerateDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
