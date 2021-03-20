import { Component, OnInit } from '@angular/core';
import {FlickrService} from "../services/flickr.service";
import {PhotoMainInfo} from "../interfaces/photoMainInfo";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks: PhotoMainInfo[] = [];
  constructor(private flickrService: FlickrService ) {
  }

  ngOnInit(): void {
    this.getBookmarks()
  }

  getBookmarks(): void {
    this.flickrService.getBookmarks()
      .subscribe(bookmarks => this.bookmarks = bookmarks);
  }
  deleteBookmark(bookmark: PhotoMainInfo) {
    this.bookmarks = this.bookmarks.filter(i => i !== bookmark);
    this.flickrService.deleteBookmark(bookmark).subscribe();
  }
}
