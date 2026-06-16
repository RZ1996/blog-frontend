import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TagDTO {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiUrl = 'https://blog-app-production-ede9.up.railway.app/api/tags';

  constructor(private http: HttpClient) {}

  getAllTags(): Observable<TagDTO[]> {
    return this.http.get<TagDTO[]>(this.apiUrl);
  }

  createTag(name: string): Observable<TagDTO> {
    return this.http.post<TagDTO>(this.apiUrl, { name });
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}