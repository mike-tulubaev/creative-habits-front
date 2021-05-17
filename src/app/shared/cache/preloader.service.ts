import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, from, iif, interval, of, race, Subject } from "rxjs";
import { filter, map, switchMap, takeUntil, tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PreloaderService {
  public complete: Subject<boolean> = new Subject<boolean>();
  private _requestedResources: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _loadedResources: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  resources: any = {};

  constructor(private http: HttpClient) {
    race(combineLatest([this._loadedResources, this._requestedResources])
      .pipe(
        map(([l, r]) => r === 0 ? false : l === r),
        filter(x => x === true)),
        interval(10000))
      .subscribe(() => {
        this.complete.next();
        this.complete.complete();
      });
  }


  preload(path: string) {
    this._requestedResources.next(this._requestedResources.value + 1);
    return this.http.get(path, { responseType: 'blob' })
      .pipe(switchMap((data => from(this.blobToBase64(data)))))
      .subscribe(data => {
        this.resources[path] = data;
        this._loadedResources.next(this._loadedResources.value + 1);
      });
  }

  getResource(path: string) {
    return this.resources[path] || path;
  }

  blobToBase64(blob: any) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
}