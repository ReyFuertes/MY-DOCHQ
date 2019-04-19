import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { NavListService } from 'src/app/global/nav-list.service';
import { RegisterForm } from '../models/registerform';
import { MessageService } from 'src/app/global/message.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerButtonDisabled: boolean = false;
  showSuccessMessage: boolean = false;
  registerForm: FormGroup;
  showRegisterError: boolean;
  validationMsgs: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private navListService: NavListService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email_address: ['', [Validators.required, Validators.maxLength(250), Validators.email]],
      department: ['', [Validators.required]],
      password: [null, [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*\_\-])(?=.{8,})/)
      ]],
      confirmPassword: [null, [Validators.required]]
    });

    this.navListService.setNavBarState([]);

    this.userService.getValidationMessages().subscribe(
      validation_messages => this.validationMsgs.next(validation_messages)
    )
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // NOTE : replace with proper validation (Custom Validator)
      if (this.registerForm.controls.password.value === this.registerForm.controls.confirmPassword.value) {
        this.registerButtonDisabled = true;
        this.userService.register(this.registerForm.value as RegisterForm)
          .subscribe(
            (response: any) => {
              this.registerButtonDisabled = false;
              if(response){
                this.showSuccessMessage = true;
              } else {
                this.messageService.errorMsg('Failed to Register User.' + response);
              }
            }
          )
      } else {
        // NOTE : replace with proper validation (Custom Validator)
        this.registerForm.controls.confirmPassword.setErrors({ 'matching_password' : true });
      }
    }
  }
}
