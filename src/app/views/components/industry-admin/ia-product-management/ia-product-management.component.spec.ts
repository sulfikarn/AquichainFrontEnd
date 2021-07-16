import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaProductManagementComponent } from './ia-product-management.component';

describe('IaProductManagementComponent', () => {
  let component: IaProductManagementComponent;
  let fixture: ComponentFixture<IaProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaProductManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
