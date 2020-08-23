import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Users } from '../models/users';

@Injectable({
    providedIn: 'root'
})

export class UsersListService {

    url = 'https://api.github.com/orgs/angular/public_members';
    followers = 'https://api.github.com/users/';

    constructor(private httpClient: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    getAllUsers(): Observable<Users[]> {
        return this.httpClient.get<Users[]>(this.url)
            .pipe(
                retry(2),
                catchError(this.handleError))
    }

    getUserById(id: number): Observable<Users> {
        return this.httpClient.get<Users>(this.url + '/' + id)
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

    getFollowers(user: string): Observable<any>{
        return this.httpClient.get<any>(`${this.followers}${user}/followers`)            
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };

}
