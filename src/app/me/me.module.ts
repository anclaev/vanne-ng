import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'

import { MeRoutingModule } from './me-routing.module'
import { MeComponent } from './me.component'

@NgModule({
  declarations: [MeComponent],
  imports: [CommonModule, SharedModule, MeRoutingModule],
})
export class MeModule {}
