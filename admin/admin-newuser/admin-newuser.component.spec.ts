import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewuserComponent } from './admin-newuser.component';

describe('AdminNewuserComponent', () => {
  let component: AdminNewuserComponent;
  let fixture: ComponentFixture<AdminNewuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
