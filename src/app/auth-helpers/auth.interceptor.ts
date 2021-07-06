import { AuthService } from '../servicios/auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.auth.getAccessToken();
        
        if (!token) {
            return next.handle(req);
        }

        const headers = new HttpHeaders({
            'Authorization': token
        });
    
    
        const cloneReq = req.clone({headers});

        return next.handle(cloneReq);
    }
}
