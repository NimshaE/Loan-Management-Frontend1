import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  url = environment.apiUrl;


  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url + "/seller/add",data,{
      headers: new HttpHeaders().set('Content.Type',"application/json"
      )
    })
  }

  update(data:any){
    return this.httpClient.post(this.url + "/seller/update",data,{
      headers: new HttpHeaders().set('Content.Type',"application/json"
      )
    })
  }

  getSellers(){
    return this.httpClient.get(this.url + "/seller/get");
  }
}
