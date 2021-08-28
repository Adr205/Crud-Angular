import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrTagComponent } from './usr-tag.component';

describe('UsrTagComponent', () => {
  let component: UsrTagComponent;
  let fixture: ComponentFixture<UsrTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsrTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
