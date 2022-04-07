import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'

import { ProgressComponent } from './progress.component'

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule, SharedModule],
})
export class ProgressModule {}
