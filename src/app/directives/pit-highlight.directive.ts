import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPitHighlight]',
  standalone: true
})
export class PitHighlightDirective implements OnInit {
  @Input('appPitHighlight') priority: string = 'Medium';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const card = this.el.nativeElement;
    
    // Set left border accent based on priority
    let borderColor = '#388bff'; // Default Blue for Low
    let dotColor = '#388bff';

    if (this.priority === 'High') {
      borderColor = '#dc3545'; // Red
      dotColor = '#dc3545';
    } else if (this.priority === 'Medium') {
      borderColor = '#d29922'; // Yellow
      dotColor = '#d29922';
    }

    this.renderer.setStyle(card, 'border-left', `5px solid ${borderColor}`);

    // Style the highlight dot element if present inside the card
    const dot = card.querySelector('.priority-dot');
    if (dot) {
      this.renderer.setStyle(dot, 'background-color', dotColor);
      this.renderer.setStyle(dot, 'box-shadow', `0 0 8px ${dotColor}`);
    }
  }
}