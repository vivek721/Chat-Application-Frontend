import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaderResponse,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private baseUrl = "http://localhost:3000";
  private socket;
  constructor(private http: HttpClient, private Cookie: CookieService) {
    this.socket = io(this.baseUrl);
  }
  // events to be listened

  public verifyUser = () => {
    return Observable.create(observer => {
      this.socket.on("verifyUser", data => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  }; // end verifyUser

  public onlineUserList = () => {
    return Observable.create(observer => {
      this.socket.on("online-user-list", userList => {
        observer.next(userList);
      }); // end Socket
    }); // end Observable
  }; // end onlineUserList

  public disconnectedSocket = () => {
    return Observable.create(observer => {
      this.socket.on("disconnect", () => {
        observer.next();
      }); // end Socket
    }); // end Observable
  }; // end disconnectSocket

  // end events to be listened

  // events to be emitted

  public setUser = authToken => {
    this.socket.emit("set-user", authToken);
  }; // end setUser

  public markChatAsSeen = userDetails => {
    this.socket.emit("mark-chat-as-seen", userDetails);
  }; // end markChatAsSeen

  // end events to be emitted

  // chat related methods

  public getChat(senderId, receiverId, skip): Observable<any> {
    return this.http.get(
      `${
      this.baseUrl
      }/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${this.Cookie.get(
        "authtoken"
      )}`
    );
  } // end logout function

  public chatByUserId = userId => {
    return Observable.create(observer => {
      this.socket.on(userId, data => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  }; // end chatByUserId

  public SendChatMessage = chatMsgObject => {
    this.socket.emit("chat-msg", chatMsgObject);
  }; // end getChatMessage

  public exitSocket = () => {
    this.socket.disconnect();
  }; // end exit socket

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
