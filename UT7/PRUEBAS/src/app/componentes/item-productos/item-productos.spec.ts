import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductos } from './item-productos';

describe('ItemProductos', () => {
  let component: ItemProductos;
  let fixture: ComponentFixture<ItemProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemProductos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
