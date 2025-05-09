import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerHomeComponent } from './manager-home.component';

describe('ManagerHomeComponent', () => {
  let component: ManagerHomeComponent;
  let fixture: ComponentFixture<ManagerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
