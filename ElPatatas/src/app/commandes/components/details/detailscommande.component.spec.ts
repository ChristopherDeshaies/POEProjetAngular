import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscommandeComponent } from './detailscommande.component';

describe('DetailscommandeComponent', () => {
  let component: DetailscommandeComponent;
  let fixture: ComponentFixture<DetailscommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailscommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailscommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
