import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaIndustryManagementComponent } from './sa-industry-management.component';

describe('SaIndustryManagementComponent', () => {
  let component: SaIndustryManagementComponent;
  let fixture: ComponentFixture<SaIndustryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaIndustryManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaIndustryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
