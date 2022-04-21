import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AlarmsComponent } from './alarms.component'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [AlarmsComponent],
  imports: [CommonModule, SharedModule],
})
export class AlarmsModule {}
