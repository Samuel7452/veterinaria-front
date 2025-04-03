import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetUploadService {

  constructor(
    private http: HttpClient
  ) { }

  upload(){
    return this.http.post<FormData>
  }
}
