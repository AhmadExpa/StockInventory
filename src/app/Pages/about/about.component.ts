import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  image = {
    MainImage: {
      ImageSrc: 'assets/Image/awanStore.webp',
      alt: 'Awan Traders',
    },
    TeamMember_1: {
      ImageSrc: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      Name: 'Ahmad Ashfaq',
      Role: 'Software Engineer',
    },
    TeamMember_2: {
      ImageSrc: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      Name: 'Hamad Ashfaq',
      Role: 'Managing Head',
    },
    TeamMember_3: {
      ImageSrc: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      Name: 'Muhammad Ashfaq',
      Role: 'Manager',
    },
  };
}
