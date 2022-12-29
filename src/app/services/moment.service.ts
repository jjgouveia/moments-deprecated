import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMoment } from './interface/IMoment';
import { IResponse } from './interface/IResponse';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MomentService {

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}/api/moments`

  constructor(private http: HttpClient) {}

  getMoments(): Observable<IResponse<IMoment[]>> {
    return this.http.get<IResponse<IMoment[]>>(this.apiUrl)
  }

  createMoment(formData: FormData): Observable<FormData> {
    
    return this.http.post<FormData>(this.apiUrl, formData)
  }


}