import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component'; // ✅ Import Navbar
import { FooterComponent } from './footer/footer.component'; // ✅ Import Footer
import { TableComponent } from './table/table.component'; // ✅ Import Table
import { RouterModule } from '@angular/router';

@NgModule({
  
  imports: [
    CommonModule,
    HttpClientModule
    
  ],
  exports: [
    HttpClientModule,
    
    
  ]
})
export class SharedModule { }
