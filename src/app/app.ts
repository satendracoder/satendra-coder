import { Component, HostListener, inject, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScAngularToastify, ToastService } from 'sc-angular-toastify';
import { ScAngularLoader } from 'sc-angular-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScAngularToastify, ScAngularLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'satendra-coder';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
