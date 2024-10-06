import { Component, ViewChild, ElementRef } from '@angular/core';
import {ResizableModule} from 'angular-resizable-element';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ResizableModule,
    DragAndDropModule,
  ],
  standalone: true
})
export class AppComponent {
  @ViewChild('frameContainer', { static: false }) frameContainer!: ElementRef;
  imageSrc: string | ArrayBuffer | null = null;

  box = {
    x: 50,
    y: 50,
    width: 300,
    height: 300,
  };

  get frameStyle() {
    return {
      position: 'absolute',
      left: `${this.box.x}px`,
      top: `${this.box.y}px`,
      width: `${this.box.width}px`,
      height: `${this.box.height}px`,
      overflow: 'hidden',
      border: '2px solid black',
    };
  }

  get imageStyle() {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'contain' as const,
    };
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
    }
  }

  validateResize(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX = 50;
    return (
      event.rectangle.width! > MIN_DIMENSIONS_PX &&
      event.rectangle.height! > MIN_DIMENSIONS_PX
    );
  }

  onResizeEnd(event: ResizeEvent): void {
    this.box.width = event.rectangle.width!;
    this.box.height = event.rectangle.height!;
  }
}
