/**
 * Libraries
 **/

import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { animate } from '@angular/animations';

/**
 * services
 **/

import { UserService } from '../user.service';
import { MessageService } from 'src/app/global/message.service';

/**
 * services
 **/
import { GenericValidator } from '../shared/generic-validator';

/**
 * Classes
 **/
import { User } from '../models/user';

/**
* Enums
**/
import { FormMode } from '../../global/enums/form-mode.enum';

/** Animations */
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { slideInOutAnimation } from '../../animations/slide-out-animation';


@Component({
  selector: 'app-upsert-user',
  templateUrl: './upsert-user.component.html',
  styleUrls: ['./upsert-user.component.scss'],
  animations: [fadeInAnimation]
})
export class UpsertUserComponent implements OnInit, AfterViewInit {

  /** needed to bind the fade in animation */
  @HostBinding('@fadeInAnimation') animate: string;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  /** User ID that will be assgined from the query string */
  userId: string;

  /** initialise the enum for the form modes */
  formMode = FormMode;

  selectedFormMode: FormMode;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};

  userForm: FormGroup;
  private validationMessages;
  private genericValidator: GenericValidator;

  public userModel: User;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public userloading$ = this.loadingSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {

    /** Initialise the error message strings for earch form field... TODO: refactor */
    this.validationMessages = {
      email: {
        required: 'An email address is required.',
        email: 'Please enter a valid email format e.g. \'john@doe.com\'',
        maxlength: 'Email cannot be longet than 250 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loadingSubject.next(true);

    this.userId = this.route.snapshot.paramMap.get('id');

    // this.validationMessages = this.userService.getValidationMessages().subscribe();

    // Build the form fields to be used for the reactive user form
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
    });

    if (this.userId) {
      this.handleEditInit();
    } else {
      this.handleAddInit();
    }

  }

  /** Function to update the model when the record to update has been retrieved */
  handleEditInit(): void {
    this.selectedFormMode = FormMode.edit;
    this.userService.get(this.route.snapshot.paramMap.get('id')).subscribe(user => this.userModel = user,
      e => this.messageService.error(`Error - ${e}`),
      () => {
        this.userForm.patchValue({
          email: this.userModel._email
        });
        this.loadingSubject.next(false);
      }
    );
  }

  /** Function to handle the add functionality for a new user */
  handleAddInit(): void {
    this.selectedFormMode = FormMode.add;
    this.userModel = new User();
    this.loadingSubject.next(false);
  }


  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.userForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.userForm);
    });
  }

  onSubmit() {

    console.log(`submission attempted, formvalid = ${this.userForm.valid}`);

    if (this.userForm.valid) {

      if (this.userForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const updatedUser = { ...this.userModel, ...this.userForm.value };

        if (this.selectedFormMode = this.formMode['add']) {

          this.userService.add(updatedUser)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.messageService.errorMsg(<any>error)
            );
        } else {

          this.userService.update(updatedUser)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.messageService.errorMsg(<any>error)
            );
        }
      } else {
        this.messageService.errorMsg('No Changes Detected... Redirecting to User List.', true);
        this.onSaveComplete();
      }
    } else {
      this.messageService.errorMsg('Please correct the validation errors.');
    }
  }

  /** Function to reset to handle when the user has been created/saved */
  onSaveComplete(): void {

    // Reset the form to clear the flags
    this.userForm.reset();
    this.router.navigate(['../user/list/']);
  }
}

