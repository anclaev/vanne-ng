import { animate, state, style, transition, trigger } from '@angular/animations'

export const inOutComponentAnimation = trigger('inOutComponent', [
  state('in', style({ opacity: '1', transition: '0.2s' })),
  transition(':enter', [style({ opacity: '0' }), animate(500)]),
  transition(':leave', [animate(500, style({ opacity: '0' }))]),
])
