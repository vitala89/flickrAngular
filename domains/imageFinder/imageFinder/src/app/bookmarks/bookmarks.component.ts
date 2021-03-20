import {Component, OnInit} from '@angular/core';
import {FlickrService} from "../services/flickr.service";
import {PhotoMainInfo} from "../interfaces/photoMainInfo";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  providers: [MessageService]
})
export class BookmarksComponent implements OnInit {
  bookmarks: PhotoMainInfo[] = [];

  constructor(private flickrService: FlickrService,
              private  messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getBookmarks();
  }

  getBookmarks(): void {
    this.bookmarks = this.flickrService.getBookmarks();
  }

  deleteBookmark(bookmark: PhotoMainInfo) {
    this.flickrService.deleteBookmark(bookmark);
    this.getBookmarks();
    this.showTopCenter();
  }

  showTopCenter() {
    this.messageService.add({key: 'tc', severity: 'success', summary: 'Image deleted!'});
  }
}
