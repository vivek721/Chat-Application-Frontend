import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  private firstName: any;
  private lastName: any;
  private mobile: any;
  private email: any;
  private password: any;
  private apiKey: any;

  constructor(
    private appService: AppService,
    private _route: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() { }

  goToSignIn() {
    this._router.navigate(["/"]);
  }

  signupFunction() {
    if (!this.firstName) {
      this.toastr.warning("enter first name");
    } else if (!this.lastName) {
      this.toastr.warning("enter last name");
    } else if (!this.mobile) {
      this.toastr.warning("enter mobile");
    } else if (!this.email) {
      this.toastr.warning("enter email");
    } else if (!this.password) {
      this.toastr.warning("enter password");
    } /* else if (!this.apiKey) {
      this.toastr.warning("Enter your API key");
    } */ else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        /*  apiKey: this.apiKey */
      };
      console.log(data);
      this.appService.signupFunction(data).subscribe(
        apiResponse => {
          console.log(apiResponse);

          if (apiResponse.status === 200) {
            this.toastr.success("Signup successful");

            setTimeout(() => {
              this.goToSignIn();
            }, 2000);
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
}
