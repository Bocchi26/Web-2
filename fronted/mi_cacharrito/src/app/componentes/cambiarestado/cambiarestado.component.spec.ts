import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarestadoComponent } from './cambiarestado.component';

describe('CambiarestadoComponent', () => {
  let component: CambiarestadoComponent;
  let fixture: ComponentFixture<CambiarestadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarestadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambiarestadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
