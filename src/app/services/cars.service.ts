import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http:HttpClient) { }

  // get api
  getCars(){
    return this.http.get('http://localhost:3000/cars')
    .pipe(map(res=>{
      return res;
    }));
  }

  // post api
  postCars(data:any){
    return this.http.post('http://localhost:3000/cars',data)
    .pipe(map(res=>{
      return res;
    }))
  }

  // delete api
  deleteCars(id:number){
    return this.http.delete<any>('http://localhost:3000/cars/'+id)
    .pipe(map(res=>{
      return res;
    }))
  }

  //edit api
  updateCars(data:any, id:number){
    return this.http.put<any>('http://localhost:3000/cars/'+id, data)
    .pipe(map(res=>{
      return res;
    }))
  }
}
