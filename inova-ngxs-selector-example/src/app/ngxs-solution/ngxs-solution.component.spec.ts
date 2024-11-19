import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsSolutionComponent } from './ngxs-solution.component';

describe('NgxsSolutionComponent', () => {
  let component: NgxsSolutionComponent;
  let fixture: ComponentFixture<NgxsSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsSolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxsSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
