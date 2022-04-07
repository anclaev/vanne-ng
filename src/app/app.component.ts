import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { Component } from '@angular/core'
import { filter, map } from 'rxjs'

import { IRouteData } from '@/common/interfaces'
import { internalRoutes } from '@/common'

/**
 * Базовый компонент приложения
 */
@Component({
  selector: 'vanne-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public isInternalPage: boolean = false

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
      .subscribe((data: any) => {
        if (data.title) this.titleService.setTitle(data.title)

        let url = data.event.url

        internalRoutes.forEach((item) => {
          if ((item.includes(url) && url !== '/') || item === url)
            this.isInternalPage = true
        })
      })
  }
}
