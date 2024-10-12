import { Component } from '@angular/core';
import { Contact } from './contact.interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  contacts: Contact[] = [
    {
      name: 'Ahmad Ashfaq',
      role: 'Software Engineer',
      imgSrc: 'https://via.placeholder.com/110',
      facebookLink: '#',
      whatsappLink: '#',
      linkedinLink: '#',
    },
    {
      name: 'Hamad Ashfaq',
      role: 'Managing Head',
      imgSrc: 'https://via.placeholder.com/110',
      facebookLink: '#',
      whatsappLink: '#',
      linkedinLink: '#',
    },
    {
      name: 'Abdul Wahid',
      role: 'Marketing Head',
      imgSrc: 'https://via.placeholder.com/110',
      facebookLink: '#',
      whatsappLink: '#',
      linkedinLink: '#',
    },
    {
      name: 'Muhammad Ashfaq',
      role: 'CEO & Founder',
      imgSrc: 'https://via.placeholder.com/110',
      facebookLink: '#',
      whatsappLink: '#',
      linkedinLink: '#',
    },
    // Add more contacts as needed (up to 20)
  ];
}
