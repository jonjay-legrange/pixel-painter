import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Pixel } from '../shared/pixel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PixelPainter';
  pixelGrid: Pixel[][] = [];

  @Output() paintPixelEvent: EventEmitter<any> = new EventEmitter();
  @Output() colorPicked: EventEmitter<any> = new EventEmitter();
  color: string = '#000000';

  readyToPaint = false;

  ngOnInit(): void {

    for (let y = 0; y < 50; y++) {
      this.pixelGrid[y] = [];
      for (let x = 0; x < 50; x++) {
        this.pixelGrid[y][x] = new Pixel(y, x, '');
      }
    }

    this.colorPicked.subscribe( color =>
      this.paintPixelEvent.subscribe( pixel =>
        this.pixelGrid[pixel.y][pixel.x].color = color
      )
    )
  }

  setColor(event: any): void {
    this.color = event.target.value;
  }

  setPickedColor(event: any): void {
    this.color = event.target.value;
    this.colorPicked.emit(this.color);
    this.readyToPaint = true;
  }

  paintPixel(event: any, row: number, id: number): void {
    event.preventDefault();

    if (this.readyToPaint) {
      this.paintPixelEvent.emit(this.pixelGrid[row][id]);
      this.readyToPaint = false;
    }
  }
}
