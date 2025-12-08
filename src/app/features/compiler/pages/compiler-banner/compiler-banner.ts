import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScButtonComponent } from '../../../../shared/components/button/sc-button/sc-button.component';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';

@Component({
  selector: 'app-compiler-banner',
  imports: [ScButtonComponent, MateriallistModule],
  templateUrl: './compiler-banner.html',
  styleUrl: './compiler-banner.scss',
})
export class CompilerBanner {
  texts: string[] = [
    'Online_Courses',
    'Skills_Contest',
    'Tutorials_Library',
    'Online_Interview',
  ];
  colors: string[] = [
    '#3357FF', // Color for 'Web Development'
    '#b562d9', // Color for 'Learn Programming'
    '#00000', // Color for 'App Development'
    '#ff45c4',
  ];
  currentText: string = '';
  currentColor: string = '';
  index: number = 0;
  textWidth: string = '0ch';
  stepsCount: string = 'steps(1)';

  private _router = inject(Router);

  ngOnInit(): void {
    this.changeText();

    // Change text every 5 seconds (match with animation timing)
    setInterval(() => {
      this.changeText();
    }, 5000);
  }

  changeText(): void {
    this.currentText = this.texts[this.index];
    this.currentColor = this.colors[this.index];
    this.index = (this.index + 1) % this.texts.length;

    // Calculate the width based on the currentText length
    this.textWidth = `${this.currentText.length}ch`;

    // Set the steps for the animation based on the text length
    this.stepsCount = `steps(${this.currentText.length})`;
  }

  goToRedirect(url: string): void {
    this._router.navigate([url]);
  }
}
