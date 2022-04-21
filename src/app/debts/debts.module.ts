import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DebtsComponent } from './debts.component'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [DebtsComponent],
  imports: [CommonModule, SharedModule],
})
export class DebtsModule {}
