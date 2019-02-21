import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PreviewData} from './plainObject/PreviewData';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  takePreviewData(previewData: PreviewData): Observable<any> {
    return this.httpClient.post('http://localhost/ucg_v1/?api=preview', previewData);
  }
}
