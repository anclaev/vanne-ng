import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { BgVideoComponent } from './components/bg-video/bg-video.component'

@NgModule({
  imports: [CommonModule],
  declarations: [BgVideoComponent],
  exports: [BgVideoComponent],
})
export class SharedModule {}
