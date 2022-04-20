'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="custom-logo" data-src="images/logo.svg">
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-8516d6590dc1e8ed02d57345c4db8f6cddb6b51bc7f53d3abd79d6bdf454b645966e25b5ff554e9733bb947e84b9ffed483b4062fdde89075e028d00c0ab5e28"' : 'data-target="#xs-components-links-module-AppModule-8516d6590dc1e8ed02d57345c4db8f6cddb6b51bc7f53d3abd79d6bdf454b645966e25b5ff554e9733bb947e84b9ffed483b4062fdde89075e028d00c0ab5e28"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8516d6590dc1e8ed02d57345c4db8f6cddb6b51bc7f53d3abd79d6bdf454b645966e25b5ff554e9733bb947e84b9ffed483b4062fdde89075e028d00c0ab5e28"' :
                                            'id="xs-components-links-module-AppModule-8516d6590dc1e8ed02d57345c4db8f6cddb6b51bc7f53d3abd79d6bdf454b645966e25b5ff554e9733bb947e84b9ffed483b4062fdde89075e028d00c0ab5e28"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-1064a3bd993177fdde1730f66e09e7a74ac818c455826fb40283922d8bbd726cfb224822cd8ff69a969dde5c1d6fc2b448603293257f8219ef7c896cee05c418"' : 'data-target="#xs-components-links-module-AuthModule-1064a3bd993177fdde1730f66e09e7a74ac818c455826fb40283922d8bbd726cfb224822cd8ff69a969dde5c1d6fc2b448603293257f8219ef7c896cee05c418"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-1064a3bd993177fdde1730f66e09e7a74ac818c455826fb40283922d8bbd726cfb224822cd8ff69a969dde5c1d6fc2b448603293257f8219ef7c896cee05c418"' :
                                            'id="xs-components-links-module-AuthModule-1064a3bd993177fdde1730f66e09e7a74ac818c455826fb40283922d8bbd726cfb224822cd8ff69a969dde5c1d6fc2b448603293257f8219ef7c896cee05c418"' }>
                                            <li class="link">
                                                <a href="components/SignInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-fada23046813ee39d87b10a72245e35ea13d1542d804d06e430b7246f1d389016a7383bd156d071364806e2ad29ff2846c7a4be3b8c683b6149f77701aa1a266"' : 'data-target="#xs-components-links-module-DashboardModule-fada23046813ee39d87b10a72245e35ea13d1542d804d06e430b7246f1d389016a7383bd156d071364806e2ad29ff2846c7a4be3b8c683b6149f77701aa1a266"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-fada23046813ee39d87b10a72245e35ea13d1542d804d06e430b7246f1d389016a7383bd156d071364806e2ad29ff2846c7a4be3b8c683b6149f77701aa1a266"' :
                                            'id="xs-components-links-module-DashboardModule-fada23046813ee39d87b10a72245e35ea13d1542d804d06e430b7246f1d389016a7383bd156d071364806e2ad29ff2846c7a4be3b8c683b6149f77701aa1a266"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GqlModule.html" data-type="entity-link" >GqlModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-6edfddd647cba8fb4de73131d053d650c2438fe409176451b0f002e2dac3d8e863539ca4b983249d4a8a954af227de91304d53efb1d35d1db37d7aa850048708"' : 'data-target="#xs-components-links-module-SharedModule-6edfddd647cba8fb4de73131d053d650c2438fe409176451b0f002e2dac3d8e863539ca4b983249d4a8a954af227de91304d53efb1d35d1db37d7aa850048708"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-6edfddd647cba8fb4de73131d053d650c2438fe409176451b0f002e2dac3d8e863539ca4b983249d4a8a954af227de91304d53efb1d35d1db37d7aa850048708"' :
                                            'id="xs-components-links-module-SharedModule-6edfddd647cba8fb4de73131d053d650c2438fe409176451b0f002e2dac3d8e863539ca4b983249d4a8a954af227de91304d53efb1d35d1db37d7aa850048708"' }>
                                            <li class="link">
                                                <a href="components/BgVideoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BgVideoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-6edfddd647cba8fb4de73131d053d650c2438fe409176451b0f002e2dac3d8e863539ca4b983249d4a8a954af227de91304d53efb1d35d1db37d7aa850048708"' : 'data-target="#xs-injectables-links-module-SharedModule-6edfddd647cba8fb4de73131d053d650c2438fe409176451b0f002e2dac3d8e863539ca4b983249d4a8a954af227de91304d53efb1d35d1db37d7aa850048708"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-6edfddd647cba8fb4de73131d053d650c2438fe409176451b0f002e2dac3d8e863539ca4b983249d4a8a954af227de91304d53efb1d35d1db37d7aa850048708"' :
                                        'id="xs-injectables-links-module-SharedModule-6edfddd647cba8fb4de73131d053d650c2438fe409176451b0f002e2dac3d8e863539ca4b983249d4a8a954af227de91304d53efb1d35d1db37d7aa850048708"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TitleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TitleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToastService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToastService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TitleService.html" data-type="entity-link" >TitleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ICredentials.html" data-type="entity-link" >ICredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEnvironment.html" data-type="entity-link" >IEnvironment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRoute.html" data-type="entity-link" >IRoute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRouteData.html" data-type="entity-link" >IRouteData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITeam.html" data-type="entity-link" >ITeam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});