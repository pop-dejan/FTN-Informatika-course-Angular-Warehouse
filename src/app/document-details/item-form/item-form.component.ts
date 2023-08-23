import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/model/article.model';
import { DocumentItem } from 'src/app/model/document-item.model';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  
  @Input() 
  articles: Article[] = [];

  @Output()
  itemAdded = new EventEmitter<DocumentItem>();

  itemForm = new FormGroup({
    article: new FormControl("", Validators.required),
    price: new FormControl(0, Validators.min(0)),
    quantity: new FormControl(0, Validators.min(0))
  })

  constructor() { }

  ngOnInit(): void {
  }

  
  saveItem() {
    let newItem = new DocumentItem(this.itemForm.value)
    this.itemAdded.emit(newItem);
    this.itemForm.reset;
  }


}
