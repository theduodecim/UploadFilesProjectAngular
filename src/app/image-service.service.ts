import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  uploadApi = 'https://upload-tournament-team-images.herokuapp.com/upload';
  constructor(private http: HttpClient) { }


  public storageImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('sampleFile', image);
    console.log(formData);
    return this.http.post(this.uploadApi, formData).pipe(delay(2500));
  }

  public getTeamImages() {
    return this.http.get('http://localhost:3000/get-team-images', { responseType: 'blob' });
  }
  


}
