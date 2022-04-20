import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations'

export const changeRouteAnimation = trigger('routeAnimations', [
  transition('SignInPage <=> DashboardPage', [
    style({ position: 'relative', transition: '0.2s' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ opacity: '0' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('500ms ease-out', style({ opacity: '0' }))]),
      query(':enter', [animate('500ms ease-out', style({ opacity: '1' }))]),
    ]),
  ]),
])
