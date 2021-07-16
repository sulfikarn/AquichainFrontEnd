import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaUserManagementComponent } from './sa-user-management.component';

describe('SaUserManagementComponent', () => {
  let component: SaUserManagementComponent;
  let fixture: ComponentFixture<SaUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaUserManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
