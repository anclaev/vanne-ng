import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { Component } from '@angular/core'
import { filter, map } from 'rxjs'

/**
 * Базовый компонент приложения
 */
@Component({
  selector: 'vanne-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => {
          let child = this.activatedRoute.firstChild

          while (child) {
            if (child.firstChild) child = child.firstChild
            else if ('title' in child.snapshot.data)
              return {
                event,
                title: child.snapshot.data['title'],
              }
            else return { event, title: null }
          }

          return { event, title: null }
        }),
      )
      .subscribe((data) => {
        if (data.title) this.titleService.setTitle(data.title)
      })
  }
}
