import { Directive, ElementRef, Input, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

/**
 * PitHighlightDirective
 * Modifies element appearance dynamically based on task priority and completion status.
 */
@Directive({
  selector: '[appPitHighlight]',
  standalone: true
})
export class PitHighlightDirective implements OnChanges {
  @Input() appPitHighlight: string = '';
  @Input() isCompleted: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.applyStyles();
  }

  private applyStyles(): void {
    if (this.isCompleted) {
      // Completed task styling: strike-through and gray border
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'line-through');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.6');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #6c757d');
    } else {
      // Reset text decoration for active tasks
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');

      // Dynamic color highlights based on priority
      if (this.appPitHighlight === 'CRITICAL') {
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #dc3545');
        this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(220, 53, 69, 0.05)');
      } else if (this.appPitHighlight === 'High') {
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #ffc107');
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #198754');
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
      }
    }
  }
}