import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalBlogs } from './portal-blogs';

describe('PortalBlogs', () => {
  let component: PortalBlogs;
  let fixture: ComponentFixture<PortalBlogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalBlogs],
    }).compileComponents();

    fixture = TestBed.createComponent(PortalBlogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
