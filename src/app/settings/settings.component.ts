import { Component } from '@angular/core'

import { inOutComponentAnimation } from '@/common/animations/in-out-component'

/**
 * Компонент страницы настройки профиля
 */
@Component({
  selector: 'vanne-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
  animations: [inOutComponentAnimation],
})
export class SettingsComponent {}
