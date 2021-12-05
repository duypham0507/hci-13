import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSubscribeComponent } from './subject-subscribe.component';

describe('SubjectSubscribeComponent', () => {
  let component: SubjectSubscribeComponent;
  let fixture: ComponentFixture<SubjectSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
