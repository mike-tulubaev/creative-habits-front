import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitExploreComponent } from './habit-explore.component';

describe('HabitExploreComponent', () => {
  let component: HabitExploreComponent;
  let fixture: ComponentFixture<HabitExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitExploreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
