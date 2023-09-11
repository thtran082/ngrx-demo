import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
  ]
})
export class AppComponent {
  readonly stor = inject(Store);

  ngOnInit() {
    console.log(this.stor);
  }
}
