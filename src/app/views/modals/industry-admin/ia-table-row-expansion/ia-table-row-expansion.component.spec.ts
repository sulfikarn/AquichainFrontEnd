import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaTableRowExpansionComponent } from './ia-table-row-expansion.component';

describe('IaTableRowExpansionComponent', () => {
  let component: IaTableRowExpansionComponent;
  let fixture: ComponentFixture<IaTableRowExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaTableRowExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaTableRowExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
