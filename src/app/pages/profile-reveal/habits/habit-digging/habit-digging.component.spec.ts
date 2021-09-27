import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitDiggingComponent } from './habit-digging.component';

describe('HabitDiggingComponent', () => {
  let component: HabitDiggingComponent;
  let fixture: ComponentFixture<HabitDiggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitDiggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitDiggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
