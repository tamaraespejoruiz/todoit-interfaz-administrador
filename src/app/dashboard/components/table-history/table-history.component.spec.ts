import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistoryComponent } from './table-history.component';

describe('TableHistoryComponent', () => {
  let component: TableHistoryComponent;
  let fixture: ComponentFixture<TableHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
