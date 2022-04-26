import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'

import { DebtsRoutingModule } from './debts-routing.module'
import { DebtsComponent } from './debts.component'

@NgModule({
  declarations: [DebtsComponent],
  imports: [CommonModule, SharedModule, DebtsRoutingModule],
})
export class DebtsModule {}
