import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelaralquilerComponent } from './cancelaralquiler.component';

describe('CancelaralquilerComponent', () => {
  let component: CancelaralquilerComponent;
  let fixture: ComponentFixture<CancelaralquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelaralquilerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelaralquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
