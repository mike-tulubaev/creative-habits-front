import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitDownloadComponent } from './habit-download.component';

describe('HabitDownloadComponent', () => {
  let component: HabitDownloadComponent;
  let fixture: ComponentFixture<HabitDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
