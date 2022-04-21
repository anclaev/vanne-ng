import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MeComponent } from './me.component'

import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [MeComponent],
  imports: [CommonModule, SharedModule],
})
export class MeModule {}
