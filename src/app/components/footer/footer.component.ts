import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  @ViewChild('modalPrivacy') modalPrivacy: any;

  openModal(): void {
    this.modalPrivacy.nativeElement.click();
  }
}
