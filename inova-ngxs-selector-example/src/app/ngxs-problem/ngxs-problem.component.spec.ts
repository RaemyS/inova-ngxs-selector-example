import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsProblemComponent } from './ngxs-problem.component';

describe('NgxsProblemComponent', () => {
  let component: NgxsProblemComponent;
  let fixture: ComponentFixture<NgxsProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxsProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
