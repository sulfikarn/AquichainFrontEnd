import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaAddProductComponent } from './ia-add-product.component';

describe('IaAddProductComponent', () => {
  let component: IaAddProductComponent;
  let fixture: ComponentFixture<IaAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaAddProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
