import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  public page_title: String;

ngOnInit(): void {
  this.plrueba();
}

  constructor(){
    this.page_title= 'Binenvenido al foror de programacion';
  }

plrueba(){
console.log(this.page_title);
}
}
