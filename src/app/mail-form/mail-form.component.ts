import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.scss']

})
export class MailFormComponent {

  mailForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.mailForm = this.fb.group({
      requiredToRecipient: ['', Validators.required],
      toRecipients: this.fb.array(['']),
      ccRecipients: this.fb.array(['']),
      subject: [''],
      body: [''],
      emailAttachments: [''],
      inlineAttachments: ['']
    });
  }

  ngOnInit() {
    // console.log(Date.now());
  }

  get toRecipients() {
    return this.mailForm.get('toRecipients') as FormArray;
  }

  get ccRecipients() {
    return this.mailForm.get('ccRecipients') as FormArray;
  }

  addRecipient(recipientType: 'toRecipients' | 'ccRecipients') {
    this[recipientType].push(this.fb.control(''));

  }

  removeRecipient(index: number, recipientType: 'toRecipients' | 'ccRecipients') {
    this[recipientType].removeAt(index);

  }

  submitForm() {
    // Handle form submission
    if (this.mailForm.valid) {
      this.toRecipients.value.unshift(this.mailForm.value.requiredToRecipient);
      console.log(this.mailForm.value);
      this.snackbar.open('Email sent!', '😋', { duration: 10000 });
    } else {
      this.snackbar.open('At least one TO recipient must be added.', 'close', { duration: 5000 });
    }

  }

}