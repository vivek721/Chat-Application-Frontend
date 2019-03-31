import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private email;
  private password;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private Cookie: CookieService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  goToSignUp() {
    this.router.navigate(["/sign-up"]);
  }
  signinFunction() {
    let data = {
      email: this.email,
      password: this.password
    };
    this.appService.signinFunction(data).subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {
          console.log(apiResponse);

          this.Cookie.set("authtoken", apiResponse.data.authToken);

          this.Cookie.set("receiverId", apiResponse.data.userDetails.userId);

          this.Cookie.set(
            "receiverName",
            apiResponse.data.userDetails.firstName +
              " " +
              apiResponse.data.userDetails.lastName
          );

          this.appService.setUserInfoInLocalStorage(
            apiResponse.data.userDetails
          );

          this.router.navigate(["/chat"]);
        } else {
          this.toastr.error(apiResponse.message);
        }
      },
      err => {
        this.toastr.error("some error occured");
      }
    );
  }
}
