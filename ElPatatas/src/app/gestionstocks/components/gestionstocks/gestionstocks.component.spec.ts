import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionstocksComponent } from './gestionstocks.component';

describe('GestionstocksComponent', () => {
  let component: GestionstocksComponent;
  let fixture: ComponentFixture<GestionstocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionstocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
