import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'

import { ProgressRoutingModule } from './progress-routing.module'
import { ProgressComponent } from './progress.component'

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule, SharedModule, ProgressRoutingModule],
})
export class ProgressModule {}
