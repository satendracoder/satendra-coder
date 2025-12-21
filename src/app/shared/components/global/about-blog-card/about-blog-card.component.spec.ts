import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBlogCardComponent } from './about-blog-card.component';

describe('AboutBlogCardComponent', () => {
  let component: AboutBlogCardComponent;
  let fixture: ComponentFixture<AboutBlogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutBlogCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
