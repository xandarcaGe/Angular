import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule,FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchControl = new FormControl('');
  @Output() searchResults = new EventEmitter<any>();

  constructor(private requestService:RequestService){
    this.searchControl.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe(value =>this.onSearch(value));
  }
  
  onSearch(requestId: string | null) {
    if (!requestId || !requestId.trim()) {  // Ensure requestId is a non-empty string
      this.searchResults.emit([]);
      return;
    }
  const id=Number(requestId);
  if(isNaN(id)) return;

  this.requestService.searchRequestById(id).subscribe({
    next:(data) =>this.searchResults.emit(data),
    error:(error) =>console.error("Search failed !",error)
  });
}



}
