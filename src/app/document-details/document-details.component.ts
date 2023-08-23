import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/article.model';
import { DocumentItem } from '../model/document-item.model';
import { WHDocument } from '../model/wh-document.model';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

  documentId: number = 0;
  document: WHDocument = new WHDocument();


  articles: Article[] = [];
  items: DocumentItem[] = [];


  constructor(private route: ActivatedRoute,
    private service: DocumentService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.documentId = params['documentId'];
      this.getArticles();
      this.getDocument();
      this.getItems();
    })
  }

  getDocument() {
    this.service.getOne(this.documentId).subscribe({
      next: (document: WHDocument) => {
        this.document = document
      },
      error: (err) => console.log(err)
    })
  }

  getArticles() {
    this.service.getArticles().subscribe({
      next: (articles: Article[]) => {
        this.articles = articles
      },
      error: (err) => console.log(err)
    })
  }

  getItems() {
    this.service.getItems(this.documentId).subscribe({
      next: (items: DocumentItem[]) => {
        this.items = items;
      },
      error: (err) => console.log(err)
    })
  }

  addItem(newItem: DocumentItem): void {
    newItem.documents = this.documentId;

    this.service.postItem(this.documentId, newItem).subscribe({
      next: (addedItem: DocumentItem) => {
        this.items.push(addedItem);
      },
      error: (err) => console.log(err)
    })
  }

  recordDocument(document: WHDocument) {
    this.service.recordDocument(document).subscribe({
      next: (doc: WHDocument) => this.document = doc,
      error: (err) => console.log(err)
    })

  }

}
