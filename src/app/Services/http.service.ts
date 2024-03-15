import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formData } from '../Model/form-data';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseurl: string = 'https://angularhttp-b4c1a-default-rtdb.firebaseio.com'
  constructor(private dp: HttpClient) { }
  getAll() {
    return this.dp.get<{ [id: string]: formData }>(`${this.baseurl}/data.json`).pipe(map(response => {
      let tasks: formData[] = [];
      for (let task in response) {
        tasks.push({ ...response[task], id: task });
      }
      return tasks;
    }));
  }
  addData(data: any) {
    return this.dp.post<formData>(`${this.baseurl}/data.json`, data);
  }
  updateData(id: string | undefined, data: formData) {
    return this.dp.put<formData>(`${this.baseurl}/data/${id}.json`, data)
  }
  deleteData(id: string | undefined) {
    return this.dp.delete<formData>(`${this.baseurl}/data/${id}.json`);
  }
  deleteAll() {
    return this.dp.delete<formData>(`${this.baseurl}/data.json`);
  }
}
