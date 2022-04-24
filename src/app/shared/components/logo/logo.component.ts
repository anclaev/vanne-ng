import { Component, Input } from '@angular/core'

/**
 * Компонент логотипа приложения
 */
@Component({
  selector: 'vanne-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.sass'],
})
export class LogoComponent {
  /**
   * Длина логотипа
   */
  @Input() width: string = '153'

  /**
   * Ширина логотипа
   */
  @Input() height: string = '36'

  /**
   * Тип логотипа (полный/иконка)
   */
  @Input() type: 'default' | 'small' = 'default'
}
