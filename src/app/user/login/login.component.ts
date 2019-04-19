/** Libraries */
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/** Services */
import { UserService } from '../user.service';
import { LocalStorageService } from '../../global/local-storage.service';
import { NavListService } from '../../global/nav-list.service';

/** Models */
import { LoginForm } from '../models/loginform';
import { LoginResponse } from '../models/loginresponse';

/** Animations */
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { slideInOutAnimation } from '../../animations/slide-out-animation';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {
  hide = true;
  loginButtonDisabled = false;
  loginForm: FormGroup;
  returnUrl: string;
  showLoginError: boolean;

  /** needed to bind the fade in animation */
  @HostBinding('@fadeInAnimation') animate: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private navListService: NavListService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // reset login status
    this.localStorageService.deleteItem('obj');

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.navListService.setNavBarState([]);
  }

  onSubmit() {
    this.showLoginError = false;

    if (this.loginForm.valid) {
      this.loginButtonDisabled = true;

      this.userService.login(this.loginForm.value as LoginForm)
        .subscribe((user: LoginResponse) => {
          if (user) {
            this.localStorageService.storeString('obj', user.token);
            this.router.navigate([this.returnUrl]);
          } else {
            this.showLoginError = true;
          }
          this.loginButtonDisabled = false;
        });
    } else {
      this.showLoginError = true;
    }
  }

  get lf() { return this.loginForm.controls; }
}
