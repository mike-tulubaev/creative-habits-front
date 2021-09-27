import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitIntroComponent } from './habit-intro.component';

describe('HabitIntroComponent', () => {
  let component: HabitIntroComponent;
  let fixture: ComponentFixture<HabitIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
