import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageService } from './image.service';
import { environment } from '../../environments/environment';

describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });
    service = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get an image from backend', () => {
    const productId = '1';
    const mockImage = 'imageData';

    service.getImageFromBackend(productId).subscribe(image => {
      expect(image).toEqual(mockImage);
    });

    const req = httpMock.expectOne(`${environment.api}/api/products/image/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ image: mockImage });
  });
});