import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaSourceManagementComponent } from './sa-source-management.component';

describe('SaSourceManagementComponent', () => {
  let component: SaSourceManagementComponent;
  let fixture: ComponentFixture<SaSourceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaSourceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaSourceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
