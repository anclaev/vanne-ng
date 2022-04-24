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
                                <a href="modules/AlarmsModule.html" data-type="entity-link" >AlarmsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AlarmsModule-bd473b79d6a2bd97955d7d748d944a00aa6f9ee3e369c16017a82822d708a31fff5e38f8fa24592445a410216ef7212cfa5cc9a59d8cc6208f4ff43f3b170d00"' : 'data-target="#xs-components-links-module-AlarmsModule-bd473b79d6a2bd97955d7d748d944a00aa6f9ee3e369c16017a82822d708a31fff5e38f8fa24592445a410216ef7212cfa5cc9a59d8cc6208f4ff43f3b170d00"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlarmsModule-bd473b79d6a2bd97955d7d748d944a00aa6f9ee3e369c16017a82822d708a31fff5e38f8fa24592445a410216ef7212cfa5cc9a59d8cc6208f4ff43f3b170d00"' :
                                            'id="xs-components-links-module-AlarmsModule-bd473b79d6a2bd97955d7d748d944a00aa6f9ee3e369c16017a82822d708a31fff5e38f8fa24592445a410216ef7212cfa5cc9a59d8cc6208f4ff43f3b170d00"' }>
                                            <li class="link">
                                                <a href="components/AlarmsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlarmsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-54e21cb7781342c4cab9058ff6fd2c122a3fb77314a90d35b8fc2c99b3226ff7436bca821084c8bcd85068ac4e38b61850e2f2f177df8ce50513a418106d2fcb"' : 'data-target="#xs-components-links-module-AppModule-54e21cb7781342c4cab9058ff6fd2c122a3fb77314a90d35b8fc2c99b3226ff7436bca821084c8bcd85068ac4e38b61850e2f2f177df8ce50513a418106d2fcb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-54e21cb7781342c4cab9058ff6fd2c122a3fb77314a90d35b8fc2c99b3226ff7436bca821084c8bcd85068ac4e38b61850e2f2f177df8ce50513a418106d2fcb"' :
                                            'id="xs-components-links-module-AppModule-54e21cb7781342c4cab9058ff6fd2c122a3fb77314a90d35b8fc2c99b3226ff7436bca821084c8bcd85068ac4e38b61850e2f2f177df8ce50513a418106d2fcb"' }>
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
                                            'data-target="#components-links-module-AuthModule-65d6f8e54cd79a1ca58af98c03d8c27b2518452dfa6671ece0355d5bbe100fd19e80df991b5b2ad6608dde9edaec54c08cfe6a92cde06f5a1209a6ff6f0d79e8"' : 'data-target="#xs-components-links-module-AuthModule-65d6f8e54cd79a1ca58af98c03d8c27b2518452dfa6671ece0355d5bbe100fd19e80df991b5b2ad6608dde9edaec54c08cfe6a92cde06f5a1209a6ff6f0d79e8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-65d6f8e54cd79a1ca58af98c03d8c27b2518452dfa6671ece0355d5bbe100fd19e80df991b5b2ad6608dde9edaec54c08cfe6a92cde06f5a1209a6ff6f0d79e8"' :
                                            'id="xs-components-links-module-AuthModule-65d6f8e54cd79a1ca58af98c03d8c27b2518452dfa6671ece0355d5bbe100fd19e80df991b5b2ad6608dde9edaec54c08cfe6a92cde06f5a1209a6ff6f0d79e8"' }>
                                            <li class="link">
                                                <a href="components/SignInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatsModule.html" data-type="entity-link" >ChatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChatsModule-838fa580df88389498674b4c1cb84d7a41f0550930ac3a64c9ddde0045e54ed3a039852b90ee9de605cbc3c7052697befcfd3e0d1a92aa689f843c248e1cb506"' : 'data-target="#xs-components-links-module-ChatsModule-838fa580df88389498674b4c1cb84d7a41f0550930ac3a64c9ddde0045e54ed3a039852b90ee9de605cbc3c7052697befcfd3e0d1a92aa689f843c248e1cb506"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatsModule-838fa580df88389498674b4c1cb84d7a41f0550930ac3a64c9ddde0045e54ed3a039852b90ee9de605cbc3c7052697befcfd3e0d1a92aa689f843c248e1cb506"' :
                                            'id="xs-components-links-module-ChatsModule-838fa580df88389498674b4c1cb84d7a41f0550930ac3a64c9ddde0045e54ed3a039852b90ee9de605cbc3c7052697befcfd3e0d1a92aa689f843c248e1cb506"' }>
                                            <li class="link">
                                                <a href="components/ChatsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatsComponent</a>
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
                                <a href="modules/DebtsModule.html" data-type="entity-link" >DebtsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DebtsModule-30aa0cb1910ec8c4aa193a0364765c30b3aa6f2132ada9c6cdbfeb817b8dd341962252329dcb7623f11bb7d52f141cdb19c70fce798a7d604a859b9e19b7d2dd"' : 'data-target="#xs-components-links-module-DebtsModule-30aa0cb1910ec8c4aa193a0364765c30b3aa6f2132ada9c6cdbfeb817b8dd341962252329dcb7623f11bb7d52f141cdb19c70fce798a7d604a859b9e19b7d2dd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DebtsModule-30aa0cb1910ec8c4aa193a0364765c30b3aa6f2132ada9c6cdbfeb817b8dd341962252329dcb7623f11bb7d52f141cdb19c70fce798a7d604a859b9e19b7d2dd"' :
                                            'id="xs-components-links-module-DebtsModule-30aa0cb1910ec8c4aa193a0364765c30b3aa6f2132ada9c6cdbfeb817b8dd341962252329dcb7623f11bb7d52f141cdb19c70fce798a7d604a859b9e19b7d2dd"' }>
                                            <li class="link">
                                                <a href="components/DebtsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DebtsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GqlModule.html" data-type="entity-link" >GqlModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeModule.html" data-type="entity-link" >MeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MeModule-ceb20efbd4906da2d43a0af5f655c87870babcaa1553c65f4cbeefe0bbabd881b97d69a3f279431204525305d1e2e12e426f38145a1198cf8aeee3f73fea5f35"' : 'data-target="#xs-components-links-module-MeModule-ceb20efbd4906da2d43a0af5f655c87870babcaa1553c65f4cbeefe0bbabd881b97d69a3f279431204525305d1e2e12e426f38145a1198cf8aeee3f73fea5f35"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MeModule-ceb20efbd4906da2d43a0af5f655c87870babcaa1553c65f4cbeefe0bbabd881b97d69a3f279431204525305d1e2e12e426f38145a1198cf8aeee3f73fea5f35"' :
                                            'id="xs-components-links-module-MeModule-ceb20efbd4906da2d43a0af5f655c87870babcaa1553c65f4cbeefe0bbabd881b97d69a3f279431204525305d1e2e12e426f38145a1198cf8aeee3f73fea5f35"' }>
                                            <li class="link">
                                                <a href="components/MeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProgressModule.html" data-type="entity-link" >ProgressModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProgressModule-f6f5b864acb0911b68ca2c762b96219c6d007804eea2be0692ad3bca007939537e6131d8c8cb453afa2e24b7d464af2a0b5aad5b129862502cae63a7e471dc05"' : 'data-target="#xs-components-links-module-ProgressModule-f6f5b864acb0911b68ca2c762b96219c6d007804eea2be0692ad3bca007939537e6131d8c8cb453afa2e24b7d464af2a0b5aad5b129862502cae63a7e471dc05"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProgressModule-f6f5b864acb0911b68ca2c762b96219c6d007804eea2be0692ad3bca007939537e6131d8c8cb453afa2e24b7d464af2a0b5aad5b129862502cae63a7e471dc05"' :
                                            'id="xs-components-links-module-ProgressModule-f6f5b864acb0911b68ca2c762b96219c6d007804eea2be0692ad3bca007939537e6131d8c8cb453afa2e24b7d464af2a0b5aad5b129862502cae63a7e471dc05"' }>
                                            <li class="link">
                                                <a href="components/ProgressComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link" >SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsModule-36d8b465a8886b32dbf80a8b4755e0f38f1bdf3cf9e2c2934edcfb304d495d04d81ad863c694722b8a5f8ecee8fa1d6e1c6dbf72b877853759e3222a01ea6dd9"' : 'data-target="#xs-components-links-module-SettingsModule-36d8b465a8886b32dbf80a8b4755e0f38f1bdf3cf9e2c2934edcfb304d495d04d81ad863c694722b8a5f8ecee8fa1d6e1c6dbf72b877853759e3222a01ea6dd9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-36d8b465a8886b32dbf80a8b4755e0f38f1bdf3cf9e2c2934edcfb304d495d04d81ad863c694722b8a5f8ecee8fa1d6e1c6dbf72b877853759e3222a01ea6dd9"' :
                                            'id="xs-components-links-module-SettingsModule-36d8b465a8886b32dbf80a8b4755e0f38f1bdf3cf9e2c2934edcfb304d495d04d81ad863c694722b8a5f8ecee8fa1d6e1c6dbf72b877853759e3222a01ea6dd9"' }>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-8e2015ed0cb8ab8e8f03d73ff52714849350aeaa446077843bcab15dc8d25834b583f9e826ced937a647a5345d12601abecf042945c6038a28d3c796f89b7489"' : 'data-target="#xs-components-links-module-SharedModule-8e2015ed0cb8ab8e8f03d73ff52714849350aeaa446077843bcab15dc8d25834b583f9e826ced937a647a5345d12601abecf042945c6038a28d3c796f89b7489"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-8e2015ed0cb8ab8e8f03d73ff52714849350aeaa446077843bcab15dc8d25834b583f9e826ced937a647a5345d12601abecf042945c6038a28d3c796f89b7489"' :
                                            'id="xs-components-links-module-SharedModule-8e2015ed0cb8ab8e8f03d73ff52714849350aeaa446077843bcab15dc8d25834b583f9e826ced937a647a5345d12601abecf042945c6038a28d3c796f89b7489"' }>
                                            <li class="link">
                                                <a href="components/BgVideoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BgVideoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-8e2015ed0cb8ab8e8f03d73ff52714849350aeaa446077843bcab15dc8d25834b583f9e826ced937a647a5345d12601abecf042945c6038a28d3c796f89b7489"' : 'data-target="#xs-injectables-links-module-SharedModule-8e2015ed0cb8ab8e8f03d73ff52714849350aeaa446077843bcab15dc8d25834b583f9e826ced937a647a5345d12601abecf042945c6038a28d3c796f89b7489"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-8e2015ed0cb8ab8e8f03d73ff52714849350aeaa446077843bcab15dc8d25834b583f9e826ced937a647a5345d12601abecf042945c6038a28d3c796f89b7489"' :
                                        'id="xs-injectables-links-module-SharedModule-8e2015ed0cb8ab8e8f03d73ff52714849350aeaa446077843bcab15dc8d25834b583f9e826ced937a647a5345d12601abecf042945c6038a28d3c796f89b7489"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToastService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToastService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-dba2c66135961e93537d72a944b75adac30c549ca805950181eb259d5551aa5a44edd94fba7c0bb89c5b0ab6a6c3b7cfa1941c7a5c99a52661bfd711869f81ed"' : 'data-target="#xs-components-links-module-UsersModule-dba2c66135961e93537d72a944b75adac30c549ca805950181eb259d5551aa5a44edd94fba7c0bb89c5b0ab6a6c3b7cfa1941c7a5c99a52661bfd711869f81ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-dba2c66135961e93537d72a944b75adac30c549ca805950181eb259d5551aa5a44edd94fba7c0bb89c5b0ab6a6c3b7cfa1941c7a5c99a52661bfd711869f81ed"' :
                                            'id="xs-components-links-module-UsersModule-dba2c66135961e93537d72a944b75adac30c549ca805950181eb259d5551aa5a44edd94fba7c0bb89c5b0ab6a6c3b7cfa1941c7a5c99a52661bfd711869f81ed"' }>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
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