import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaIndustryManagementComponent } from './ia-industry-management.component';

describe('IaIndustryManagementComponent', () => {
  let component: IaIndustryManagementComponent;
  let fixture: ComponentFixture<IaIndustryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaIndustryManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaIndustryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
