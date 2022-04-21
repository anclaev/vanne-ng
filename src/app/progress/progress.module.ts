import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProgressComponent } from './progress.component'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule, SharedModule],
})
export class ProgressModule {}
