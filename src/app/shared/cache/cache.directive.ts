import { AfterViewInit, Component, Directive, ElementRef, Input, OnDestroy, Renderer2, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { PreloaderService } from "./preloader.service";

@Directive({
  selector: '[appCache]',
})
export class CacheDirective implements AfterViewInit, OnDestroy {
  @Input() appCache: string = '';
  private alive$ = new Subject<void>();
  constructor(private service: PreloaderService,
    private host: ElementRef<HTMLImageElement | HTMLVideoElement>, private renderer: Renderer2) {
      const cacheSrc = this.host.nativeElement.getAttribute('appCache');
      if (!cacheSrc) return;
      const res = this.service.getResource(cacheSrc);
      this.renderer.setProperty(this.host.nativeElement, 'src', res);
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.alive$.next();
    this.alive$.complete();
  }
}
