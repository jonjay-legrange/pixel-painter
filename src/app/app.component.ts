import { Component, OnInit, ViewChild } from '@angular/core';
import { Pixel } from '../shared/pixel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PixelPainter';

  @ViewChild('drawingCanvas') drawingCanvas: any;
  pixelGrid: Pixel[][] = [];
  color: string = '#000000';

  ngOnInit(): void {

    for (let y = 0; y < 50; y++) {
      this.pixelGrid[y] = [];
      for (let x = 0; x < 50; x++) {
        this.pixelGrid[y][x] = new Pixel(x, '');
      }
    }
  }

  setColor(event: any): void {
    this.color = event.target.value;
  }

  ceck(event: any): void {
    console.log(event);
    // this.color = event.target.value;
  }

  paintPixel(event: any, row: number, id: number): void {
    event.preventDefault();

    if (event.buttons === 1) {
      this.pixelGrid[row][id].colorClass = 'background-color: ' + this.color;
    }
  }
}
