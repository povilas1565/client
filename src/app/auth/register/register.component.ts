import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

  export class RegisterComponent implements OnInit {
      public registerForm!: FormGroup;
      constructor(private authService: AuthService,
                  private tokenService: TokenStorageService,
                  private notificationService: NotificationService,
                  private router: Router,
                  private formBuilder: FormBuilder)
      {
        if (this.tokenService.getUser()) {
          this.router.navigate(['/']);
        }
      }

      createRegisterForm(): FormGroup {
        return this.formBuilder.group({
          username: ['', Validators.compose([Validators.required, Validators.email])],
          password: ['', Validators.compose([Validators.required])],
        })
      }

      ngOnInit(): void {
        this.registerForm = this.createRegisterForm();
      }

      submitDataToServer(): void {
        this.authService.register({
          username: this.registerForm.value.username,
          password: this.registerForm.value.password
        }).subscribe(data => {
            console.log(data);

            this.tokenService.saveToken(data.token);
            this.tokenService.saveUser(data);

            this.notificationService.showSnackBar('Successful registration');
            this.router.navigate(['/index']);
            window.location.reload();
          }
          ,error => {
            console.log(error);
            this.notificationService.showSnackBar('Incorrect login or password' + error.message);
          });
      }
    }


