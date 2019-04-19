import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-onboarding-medical-questionnaire',
  templateUrl: './onboarding-medical-questionnaire.component.html',
  styleUrls: ['./onboarding-medical-questionnaire.component.scss']
})
export class OnboardingMedicalQuestionnaireComponent implements OnInit {
  introFormGroup: FormGroup;
  personalDetailsFormGroup: FormGroup;
  identificationFormGroup: FormGroup;
  medicalHistoryFormGroup: FormGroup;
  medicationFormGroup: FormGroup;
  lifeStyleFormGroup: FormGroup;
  commPreferencesFormGroup: FormGroup;
  imptInfoFormGroup: FormGroup;
  userPhotoFilename: string;
  idCardPhotoFilename: string;
  showTermsError: boolean;
  medicalHistoryArr = [
    {description: 'Hypertension', value: 'hypertension'},
    {description: "Asthma", value: 'asthma'},
    {description: "Cardiovascular disease (under age of 60 yrs)", value: 'cardioDisease'},
    {description: "Diabetes", value: 'diabetes'}
  ];
  commPreferencesArr = [
    {description: 'I would like to receive emails', value: 'emails'},
    {description: "I would like to receive SMS", value: 'sms'}
  ];
  
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.introFormGroup = this._formBuilder.group({});
    this.personalDetailsFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      jobTitle: ['', Validators.required],
    });
    this.identificationFormGroup = this._formBuilder.group({
      userPhoto: [''],
      idCardPhoto: ['']
    });
    this.medicalHistoryFormGroup = this._formBuilder.group({
      personalHistory: this._formBuilder.array([]),
      otherPersonalHistory: [''],
      familyHistory: this._formBuilder.array([]),
      otherFamilyHistory: ['']
    });
    this.medicationFormGroup = this._formBuilder.group({
      prescribedMedication: [''],
      nonPrescribedMedication: ['']
    });
    this.lifeStyleFormGroup = this._formBuilder.group({
      isSmoke: [''],
      allergies: [''],
      activeRating: [''],
      stressRating: ['']
    });
    this.commPreferencesFormGroup = this._formBuilder.group({
      communicationPreferences: this._formBuilder.array([])
    });
    this.imptInfoFormGroup = this._formBuilder.group({
      subscribeToPromos: [false],
      agreedToTermsAndConditions: [false, Validators.requiredTrue]
    });
  }

  updateCheckboxArray(id, isChecked, key, formGroup) {
    const chkArray = < FormArray > this[formGroup].get(key);
    if (isChecked) {
      chkArray.push(new FormControl(id));
    } else {
      let idx = chkArray.controls.findIndex(x => x.value == id);
      chkArray.removeAt(idx);
    }
  }

  updateFile(ev, filename) {
    let input = ev.srcElement;
    this[filename] = input.files[0].name;
  }

  openWindow(link) {
    let width = window.innerWidth * 0.8 ;
    let height = width * window.innerHeight / window.innerWidth ;
    window.open(link, 'newwindow', 'width=' + width + ', height=' + height + ',resizable=yes , scrollbars=yes'); 
    return false;
  }

  submit() {
    this.showTermsError = false;
    if (this.imptInfoFormGroup.invalid) {
      this.showTermsError = true;
    }
    // TODO: submit data
  }
}
