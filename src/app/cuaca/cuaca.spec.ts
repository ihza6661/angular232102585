import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Cuaca } from './cuaca';

describe('Cuaca', () => {
  let component: Cuaca;
  let fixture: ComponentFixture<Cuaca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuaca, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cuaca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
