import { Component } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roadmap-details',
  imports: [MateriallistModule],
  templateUrl: './roadmap-details.component.html',
  styleUrl: './roadmap-details.component.scss',
})
export class RoadmapDetailsComponent {
  roadmap = [
    {
      id: 1,
      title: 'HTML Basics',
      desc: 'Structure, semantics, forms, accessibility.',
    },
    {
      id: 2,
      title: 'CSS Mastery',
      desc: 'Flexbox, Grid, responsive, animations.',
    },
    { id: 3, title: 'JavaScript Core', desc: 'DOM, closures, async, ES6+' },
    {
      id: 4,
      title: 'Angular Framework',
      desc: 'Components, services, routing, RxJS',
    },
    {
      id: 5,
      title: 'Testing & Deploy',
      desc: 'Unit tests, e2e, CI/CD, hosting',
    },
  ];

  // modal state
  modalOpen = false;
  modalItem: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // safe: router is injected via NgModule imports of RouterModule
    console.log('current url', this.router.url);
  }

  openModal(item: any) {
    this.modalItem = item;
    this.modalOpen = true;
    // lock scroll
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalOpen = false;
    this.modalItem = null;
    document.body.style.overflow = '';
  }

  goToDetails(item: any) {
    // navigate to /roadmap/:id
    this.router.navigate(['/roadmap', item.id]);
  }
}
