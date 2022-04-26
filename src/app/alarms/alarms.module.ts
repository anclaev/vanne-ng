import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'

import { AlarmsRoutingModule } from './alarms-routing.module'
import { AlarmsComponent } from './alarms.component'

@NgModule({
  declarations: [AlarmsComponent],
  imports: [CommonModule, SharedModule, AlarmsRoutingModule],
})
export class AlarmsModule {}
