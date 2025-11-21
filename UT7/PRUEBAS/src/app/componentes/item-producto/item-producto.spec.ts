import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProducto } from './item-producto';

describe('ItemProducto', () => {
  let component: ItemProducto;
  let fixture: ComponentFixture<ItemProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
