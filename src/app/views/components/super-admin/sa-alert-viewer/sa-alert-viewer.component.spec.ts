import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaAlertViewerComponent } from './sa-alert-viewer.component';

describe('SaAlertViewerComponent', () => {
  let component: SaAlertViewerComponent;
  let fixture: ComponentFixture<SaAlertViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaAlertViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaAlertViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
