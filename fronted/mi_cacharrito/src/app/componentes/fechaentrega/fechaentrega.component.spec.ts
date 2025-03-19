import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaentregaComponent } from './fechaentrega.component';

describe('FechaentregaComponent', () => {
  let component: FechaentregaComponent;
  let fixture: ComponentFixture<FechaentregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FechaentregaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FechaentregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
