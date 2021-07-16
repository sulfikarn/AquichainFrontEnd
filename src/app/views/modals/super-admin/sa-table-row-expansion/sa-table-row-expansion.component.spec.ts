import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaTableRowExpansionComponent } from './sa-table-row-expansion.component';

describe('SaTableRowExpansionComponent', () => {
  let component: SaTableRowExpansionComponent;
  let fixture: ComponentFixture<SaTableRowExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaTableRowExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaTableRowExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
