import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapDateComponent } from './bootstrap-date.component';

describe('BootstrapDateComponent', () => {
  let component: BootstrapDateComponent;
  let fixture: ComponentFixture<BootstrapDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
