import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaCreateSourceManagementComponent } from './sa-create-source-management.component';

describe('SaCreateSourceManagementComponent', () => {
  let component: SaCreateSourceManagementComponent;
  let fixture: ComponentFixture<SaCreateSourceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaCreateSourceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaCreateSourceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
