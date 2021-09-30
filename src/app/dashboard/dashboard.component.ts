import { Component } from '@angular/core';
import {
  faFacebook,
  faLinkedin,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  facebookIcon = faFacebook;
  linkedinnIcon = faLinkedin;
  githubIcon = faGithubSquare;
}
