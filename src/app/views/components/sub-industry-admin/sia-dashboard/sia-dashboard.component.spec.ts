import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiaDashboardComponent } from './sia-dashboard.component';

describe('SiaDashboardComponent', () => {
  let component: SiaDashboardComponent;
  let fixture: ComponentFixture<SiaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
