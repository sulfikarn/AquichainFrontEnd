import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaAlertViewerComponent } from './ia-alert-viewer.component';

describe('IaAlertViewerComponent', () => {
  let component: IaAlertViewerComponent;
  let fixture: ComponentFixture<IaAlertViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaAlertViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaAlertViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
