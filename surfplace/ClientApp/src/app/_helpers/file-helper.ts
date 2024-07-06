import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FileHelper {
    constructor(private http: HttpClient) {
    }

    Download(data: any, type: string, fileName: string) {
        const blob: Blob = new Blob([data], { type: type });
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
    }

}