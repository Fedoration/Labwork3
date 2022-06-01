import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SRV_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;
    

    const token = localStorage.getItem('token');
    headers = headers.append('Authorization', `Bearer ${token}`);


    const request = req.clone({
      headers,
      url:`${SRV_URL}${req.url}`,
    });
    return next.handle(request);
  }
}
