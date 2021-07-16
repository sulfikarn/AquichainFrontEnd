import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaAddSubIndustryComponent } from './ia-add-sub-industry.component';

describe('IaAddSubIndustryComponent', () => {
  let component: IaAddSubIndustryComponent;
  let fixture: ComponentFixture<IaAddSubIndustryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaAddSubIndustryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaAddSubIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
