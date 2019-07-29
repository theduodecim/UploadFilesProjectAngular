import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFormComponentComponent } from './upload-form-component/upload-form-component.component';

const routes: Routes = [
  { path: '', component: UploadFormComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
