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
  /**
   * Путь к видео
   */
  @Input('media') name!: string

  /**
   * Флаг типа устройства
   */
  public isMobile = window.innerWidth <= 576 || window.innerHeight <= 415
}
