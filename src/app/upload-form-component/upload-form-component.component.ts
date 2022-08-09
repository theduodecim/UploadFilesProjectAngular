import { Component, OnInit, ErrorHandler, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageService } from '../image-service.service';


class ImageSnippet {
  pending = false;
  status = 'initializing';
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-upload-form-component',
  templateUrl: './upload-form-component.component.html',
  styleUrls: ['./upload-form-component.component.scss']
})
export class UploadFormComponentComponent implements OnInit {
  selectedFile: ImageSnippet;
  public url: SafeResourceUrl;

  constructor(private imageService: ImageService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onGetTeamImages() {
    this.imageService.getTeamImages().subscribe(res => {
      if(res) {
        var imageUrl = URL.createObjectURL(res)
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl); 
      }else {
        console.log('error');
      }
    
    });
  }


  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      // const tempFile = this.escapeSpecialChars(this.selectedFile.file);
      this.selectedFile.pending = true;
      this.imageService.storageImage(this.selectedFile.file).subscribe((res) => {
        console.log('Image uploaded');
        this.onSuccess();
      }, (err) => {
        console.log('Image error');
        this.onError();
        console.error(err);
      });
    });
    reader.readAsDataURL(file);
  }

}
