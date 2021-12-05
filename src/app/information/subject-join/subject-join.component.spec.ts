import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectJoinComponent } from './subject-join.component';

describe('SubjectJoinComponent', () => {
  let component: SubjectJoinComponent;
  let fixture: ComponentFixture<SubjectJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
