
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder
  ) {
    if (this.tokenService.getUser()) {
      this.router.navigate(['main']);
    }
  }
  createLoginForm(): FormGroup {
  return this.formBuilder.group({
    username: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required])],
  })
}
  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  submitDataToServer(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      console.log(data);

      this.tokenService.saveToken(data.token);
      this.tokenService.saveUser(data);

      this.notificationService.showSnackBar('Successful authorization');
      this.router.navigate(['/index']);
      window.location.reload();
    },error => {
        console.log(error);
        this.notificationService.showSnackBar('Incorrect login or password' + error.message);
      });
  }
}
