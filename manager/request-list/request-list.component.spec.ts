import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListComponent } from './request-list.component';

describe('RequestListComponent', () => {
  let component: RequestListComponent;
  let fixture: ComponentFixture<RequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
