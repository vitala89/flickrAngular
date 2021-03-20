import {Component, OnInit} from '@angular/core';
import {FlickrService} from "../services/flickr.service";
import {debounceTime, filter, switchMap} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {PhotoMainInfo} from "../interfaces/photoMainInfo";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  providers: [MessageService]
})
export class ImageListComponent implements OnInit {
  bookImageChips = new FormControl('');
  totalRecords: number = 0;
  images: PhotoMainInfo[] = [];
  bookmark: PhotoMainInfo[] = [];
  searchControl = new FormControl('');

  constructor(private flickrService: FlickrService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.bookImageChips.valueChanges.subscribe();
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      filter((value) => value.length > 0),
      switchMap((searchValue) => {
        return this.flickrService.searchKeyword(searchValue)
      })).subscribe((data) => {
      this.images = data;
    });
    this.totalRecords = this.images.length;
  }

  addToBookmark(image: any) {
    this.flickrService.addBookmark(image);
    this.showTopCenter();
  }

  showTopCenter() {
    this.messageService.add({key: 'tc', severity: 'success', summary: 'Image saved to Bookmarks!'});
  }

}
