import { Component } from '@angular/core';
import { AccountingModule } from '../../accounting.module';

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent {
  files: any[] = [];
  decoder = new TextDecoder();
  reader = new FileReader();

  /**
   * on file drop handler
   */
  onFileDropped(event: any) {
    console.log(event);
    this.prepareFilesList(event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    const files = event.target.files;
    console.log('files: ', files);
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }



  // fileToUpload: File | null = null;
  //
  // handleFileInput(event: any): void {
  //   const fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     this.fileToUpload = fileList[0];
  //     this.parseCertificate();
  //   }
  // }
  //
  // parseCertificate() {
  //   if (this.fileToUpload) {
  //     console.log('fileToUpload: ', this.fileToUpload);
  //     const fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       const contents = fileReader.result as string;
  //       if (contents.includes('SEQUENCE')) {
  //         console.log('Word "SEQUENCE" found in the certificate.');
  //       } else {
  //         console.log('Word "SEQUENCE" not found in the certificate.');
  //       }
  //     };
  //     fileReader.readAsText(this.fileToUpload);
  //   }
  // }
}
