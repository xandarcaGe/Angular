import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatCardModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterResults = new EventEmitter<any[]>();

  filterForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    employeeName: new FormControl(''),
    sort: new FormControl('asc') // Default to ascending order
  });

  constructor(private requestService: RequestService) {}

  applyFilters() {
    const startDate = this.filterForm.controls.startDate.value || undefined;
    const endDate = this.filterForm.controls.endDate.value || undefined;
    const employeeName = this.filterForm.controls.employeeName.value || undefined;
    const sort = this.filterForm.controls.sort.value || 'asc'; // Default to 'asc'

this.requestService.filterRequests(startDate, endDate, employeeName, sort).subscribe({
  next: (data) => {
    console.log("response",data)
    this.filterResults.emit(data)},
  error: (error) => console.error('Filtering failed!', error)
});

  }
}
