import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AlertsComponent } from './alerts.component'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [AlertsComponent],
  imports: [CommonModule, SharedModule],
})
export class AlertsModule {}
