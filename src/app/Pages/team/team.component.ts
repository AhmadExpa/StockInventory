import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  coreBeliefs = [
    {
      title: 'Striving for Excellence',
      text: 'Excellence is the limitless capacity to raise the calibre of what you provide.'
    },
    {
      title: 'Your Financial Success',
      text: 'We work relentlessly with you to identify ways to save money and ensure financial success.'
    },
    {
      title: 'Combined Efforts to Achieve Excellence',
      text: 'We strive for excellence and work with you to ensure business growth and success.'
    },
    {
      title: 'Cost-effective Solutions',
      text: 'We can guarantee tasks are completed while saving significant amounts of money.'
    },
    {
      title: 'Expert Financial Solutions',
      text: 'We always charge reasonable fees for the expert work we perform.'
    },
    {
      title: 'Promoting Mutual Development',
      text: 'By assisting clients in growing, we ensure mutual success and financial growth.'
    }
  ];
}
