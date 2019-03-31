import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AppService {
  private url = "http://localhost:3000";

  constructor(public http: HttpClient, private Cookie: CookieService) { } // end constructor

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }; // end getUserInfoFromLocalstorage

  public setUserInfoInLocalStorage = data => {
    localStorage.setItem("userInfo", JSON.stringify(data));
  };
  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("mobile", data.mobile)
      .set("email", data.email)
      .set("password", data.password)
      .set("apiKey", data.apiKey);

    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  } // end of signupFunction function.

  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set("email", data.email)
      .set("password", data.password);

    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of signinFunction function.

  public logout(): Observable<any> {
    const params = new HttpParams().set(
      "authToken",
      this.Cookie.get("authtoken")
    );

    return this.http.post(`${this.url}/api/v1/users/logout`, params);
  } // end logout function

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";

    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
        }`;
    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);
  } // END handleError
}
