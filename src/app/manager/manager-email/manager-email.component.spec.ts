import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEmailComponent } from './manager-email.component';

describe('ManagerEmailComponent', () => {
  let component: ManagerEmailComponent;
  let fixture: ComponentFixture<ManagerEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
