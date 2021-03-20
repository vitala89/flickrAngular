import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FlickrOutput} from "../interfaces/flickrOutput";
import {FlickrPhoto} from "../interfaces/flickrPhoto";
import {catchError, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {PhotoMainInfo} from "../interfaces/photoMainInfo";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  constructor(private http: HttpClient) {
  }

  searchKeyword(keyword: string): Observable<PhotoMainInfo[]> {
    const url = ('https://www.flickr.com/services/rest/?method=flickr.photos.search&');
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=120`;
    return this.http.get<FlickrOutput>(url + params).pipe(map((res) => {
      const urlArr: any[] = [];
      res.photos.photo.forEach((photo: FlickrPhoto) => {
        const photoObj = {
          id: photo.id,
          url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          title: photo.title
        };
        urlArr.push(photoObj)
      });
      console.log(urlArr);
      return urlArr;
    }));
  }

  addBookmark(bookmark: PhotoMainInfo): void {
    let bookmarks = [];
    const bookmarksFromLocalStorage = localStorage.getItem('bookmarks');
    if (bookmarksFromLocalStorage !== null) {
      bookmarks = JSON.parse(bookmarksFromLocalStorage);
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  getBookmarks() {
    let bookmarks = [];
    const bookmarksFromLocalStorage = localStorage.getItem('bookmarks');
    if (bookmarksFromLocalStorage !== null) {
      bookmarks = JSON.parse(bookmarksFromLocalStorage);
    }
    return bookmarks;
  }

  deleteBookmark(bookmark: PhotoMainInfo) {
    let bookmarks = [];
    const bookmarksFromLocalStorage = localStorage.getItem('bookmarks');
    if (bookmarksFromLocalStorage !== null) {
      bookmarks = JSON.parse(bookmarksFromLocalStorage);
    }
    bookmarks = bookmarks.filter((item: any) => item.id !== bookmark.id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }

}

