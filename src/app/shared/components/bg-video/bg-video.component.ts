import { Component, Input } from '@angular/core'

/**
 * Компонент видеофона
 */
@Component({
  selector: 'vanne-bg-video',
  templateUrl: './bg-video.component.html',
  styleUrls: ['./bg-video.component.sass'],
})
export class BgVideoComponent {
  @Input('media') name!: string

  public isMobile = window.innerWidth <= 576 || window.innerHeight <= 415
}
