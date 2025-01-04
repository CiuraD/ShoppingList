import {NumberInput} from "@angular/cdk/coercion";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from '../../environments/environment';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
    constructor(private http: HttpClient) {}

    
    convertImageToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
  
          
          const img = new Image();
          img.src = base64Image;
  
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
  
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const bitmapBase64 = canvas.toDataURL('image/png');
              resolve(bitmapBase64);
            } else {
              reject('Failed to get canvas context.');
            }
          };
  
          img.onerror = () => reject('Failed to load image for canvas processing.');
        };
  
        reader.onerror = () => reject('Error reading file.');
        reader.readAsDataURL(file);
      });
    }
  
    uploadImageToBackend(productId: string, base64Image: string = ''): Observable<void> {
      const payload = { image: base64Image };
      return this.http.put<void>(`${environment.api}/api/products/image/${productId}`, payload);
    }

    deleteImageFromBackend(productId: string): Observable<void> {
        return this.http.delete<void>(`${environment.api}/api/products/image/delete/${productId}`);
    }

    getImageFromBackend(productId: string): Observable<string> {
        return this.http.get<{ image: string }>(`${environment.api}/api/products/image/${productId}`).pipe(
            map(response => {
              return response ? response.image : '';
            })
        );
    }
}
