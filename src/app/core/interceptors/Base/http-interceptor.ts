import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, finalize, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../../loader/loader.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    errorMessage: string;
    constructor(private loaderService: LoaderService, private router: Router,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();

        return next.handle(request).pipe(tap(evt => {
            // custom api errors
            if (evt instanceof HttpResponse) {
                this.loaderService.hide();
            }
        }),

            catchError((error: HttpErrorResponse) => {
                this.loaderService.hide();
                if (error.status === 401) {
                    localStorage.clear();
                    sessionStorage.clear();
                    location.reload();
                    this.router.navigateByUrl('/');
                }

                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    this.errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error

                    switch (error.status) {
                        case 503: {
                            this.errorMessage = 'An Internal Error Occured. Our Engineers Have Been Contacted';
                            break;
                        }
                        case 500: {
                            this.errorMessage = 'An Internal Error Occured. Our Engineers Have Been Contacted';
                            break;
                        }
                        case 400: {
                            this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';
                            if (error.error.error === 'invalid_grant' || 'access_denied') {
                                
                            } else {
                                
                            }
                            break;
                        }
                        case 404: {
                            this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';
                            break;
                        }
                        case 405: {
                            this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';
                            break;
                        }
                        case 0: {
                            this.errorMessage = 'A Connection Error Occured. Please Check Your Network Connection';
                            break;
                        }
                    }
                }

                if (error.status === 503 || error.status === 0) {
                    return throwError(this.errorMessage);
                }
            })
        );
    }
}
