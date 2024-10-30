import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      Subject: ['', [Validators.required, Validators.maxLength(20)]],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Handle form submission
    } else {
      this.contactForm.markAllAsTouched(); // Mark all fields as touched if invalid
    }
  }
}
