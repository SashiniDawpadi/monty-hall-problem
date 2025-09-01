import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MontyHallComponent } from './monty-hall.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MontyHallComponent', () => {
  let component: MontyHallComponent;
  let fixture: ComponentFixture<MontyHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MontyHallComponent, ReactiveFormsModule, FormsModule ],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(MontyHallComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
