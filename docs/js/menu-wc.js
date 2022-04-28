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
                        <img alt="" class="img-responsive" data-type="custom-logo" data-src="images/logo-min.svg">
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
                                            'data-target="#components-links-module-AlarmsModule-4c33e3bd387b4fe1078427b0e1c42c257a731a3c6ef02bfce60f4ec44bf59468dec4fb35cebbf5b40e579d581787acca5a77c2acb1b83bb09eaf66a849a71712"' : 'data-target="#xs-components-links-module-AlarmsModule-4c33e3bd387b4fe1078427b0e1c42c257a731a3c6ef02bfce60f4ec44bf59468dec4fb35cebbf5b40e579d581787acca5a77c2acb1b83bb09eaf66a849a71712"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlarmsModule-4c33e3bd387b4fe1078427b0e1c42c257a731a3c6ef02bfce60f4ec44bf59468dec4fb35cebbf5b40e579d581787acca5a77c2acb1b83bb09eaf66a849a71712"' :
                                            'id="xs-components-links-module-AlarmsModule-4c33e3bd387b4fe1078427b0e1c42c257a731a3c6ef02bfce60f4ec44bf59468dec4fb35cebbf5b40e579d581787acca5a77c2acb1b83bb09eaf66a849a71712"' }>
                                            <li class="link">
                                                <a href="components/AlarmsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlarmsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlarmsRoutingModule.html" data-type="entity-link" >AlarmsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2f6d51b14e9c06ade945095a9b2d889b93f58b4a4868ae2df05076750f7dda886fa7977ccbbee33016fedb3e138bb5341da41b26303daa9c1048845578a3a428"' : 'data-target="#xs-components-links-module-AppModule-2f6d51b14e9c06ade945095a9b2d889b93f58b4a4868ae2df05076750f7dda886fa7977ccbbee33016fedb3e138bb5341da41b26303daa9c1048845578a3a428"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2f6d51b14e9c06ade945095a9b2d889b93f58b4a4868ae2df05076750f7dda886fa7977ccbbee33016fedb3e138bb5341da41b26303daa9c1048845578a3a428"' :
                                            'id="xs-components-links-module-AppModule-2f6d51b14e9c06ade945095a9b2d889b93f58b4a4868ae2df05076750f7dda886fa7977ccbbee33016fedb3e138bb5341da41b26303daa9c1048845578a3a428"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-2f6d51b14e9c06ade945095a9b2d889b93f58b4a4868ae2df05076750f7dda886fa7977ccbbee33016fedb3e138bb5341da41b26303daa9c1048845578a3a428"' : 'data-target="#xs-injectables-links-module-AppModule-2f6d51b14e9c06ade945095a9b2d889b93f58b4a4868ae2df05076750f7dda886fa7977ccbbee33016fedb3e138bb5341da41b26303daa9c1048845578a3a428"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2f6d51b14e9c06ade945095a9b2d889b93f58b4a4868ae2df05076750f7dda886fa7977ccbbee33016fedb3e138bb5341da41b26303daa9c1048845578a3a428"' :
                                        'id="xs-injectables-links-module-AppModule-2f6d51b14e9c06ade945095a9b2d889b93f58b4a4868ae2df05076750f7dda886fa7977ccbbee33016fedb3e138bb5341da41b26303daa9c1048845578a3a428"' }>
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
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-f501581b3ca4d06a15c313219d1a81ae50c4e3fb9dcac50439d30dda0051da4f18dd758f2b9687d6a7c7b59a77fe8ae034d546834280c27873b6f4b79c1bda74"' : 'data-target="#xs-components-links-module-AuthModule-f501581b3ca4d06a15c313219d1a81ae50c4e3fb9dcac50439d30dda0051da4f18dd758f2b9687d6a7c7b59a77fe8ae034d546834280c27873b6f4b79c1bda74"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-f501581b3ca4d06a15c313219d1a81ae50c4e3fb9dcac50439d30dda0051da4f18dd758f2b9687d6a7c7b59a77fe8ae034d546834280c27873b6f4b79c1bda74"' :
                                            'id="xs-components-links-module-AuthModule-f501581b3ca4d06a15c313219d1a81ae50c4e3fb9dcac50439d30dda0051da4f18dd758f2b9687d6a7c7b59a77fe8ae034d546834280c27873b6f4b79c1bda74"' }>
                                            <li class="link">
                                                <a href="components/SignInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChatsModule.html" data-type="entity-link" >ChatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChatsModule-2106e3ca9126d227593669c6ca2eaeb80f3bd7693c2a50a33ef6a0f1da22e2361682bc435236e2c51b0eb44058ad4dc0b6da1fb8c816a7fe1e30858906e60cb7"' : 'data-target="#xs-components-links-module-ChatsModule-2106e3ca9126d227593669c6ca2eaeb80f3bd7693c2a50a33ef6a0f1da22e2361682bc435236e2c51b0eb44058ad4dc0b6da1fb8c816a7fe1e30858906e60cb7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatsModule-2106e3ca9126d227593669c6ca2eaeb80f3bd7693c2a50a33ef6a0f1da22e2361682bc435236e2c51b0eb44058ad4dc0b6da1fb8c816a7fe1e30858906e60cb7"' :
                                            'id="xs-components-links-module-ChatsModule-2106e3ca9126d227593669c6ca2eaeb80f3bd7693c2a50a33ef6a0f1da22e2361682bc435236e2c51b0eb44058ad4dc0b6da1fb8c816a7fe1e30858906e60cb7"' }>
                                            <li class="link">
                                                <a href="components/ChatsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatsRoutingModule.html" data-type="entity-link" >ChatsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-2421e8866abad5d34dcde7a6b35feaba936b7e1b6247555f65f1cc016fe083e2ac83eed4c58f310b541f36b609c5d3b280751e18389b79112d4aa244aab2e262"' : 'data-target="#xs-components-links-module-DashboardModule-2421e8866abad5d34dcde7a6b35feaba936b7e1b6247555f65f1cc016fe083e2ac83eed4c58f310b541f36b609c5d3b280751e18389b79112d4aa244aab2e262"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-2421e8866abad5d34dcde7a6b35feaba936b7e1b6247555f65f1cc016fe083e2ac83eed4c58f310b541f36b609c5d3b280751e18389b79112d4aa244aab2e262"' :
                                            'id="xs-components-links-module-DashboardModule-2421e8866abad5d34dcde7a6b35feaba936b7e1b6247555f65f1cc016fe083e2ac83eed4c58f310b541f36b609c5d3b280751e18389b79112d4aa244aab2e262"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link" >DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DebtsModule.html" data-type="entity-link" >DebtsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DebtsModule-3bcb7983719749996d96a9c8155855d17895c14da461f64cf96ebf7a91b0ee05c57abc93a37943f1f18c25fa6e1c45f1b280f37b5671a36dd999cdbe09b37561"' : 'data-target="#xs-components-links-module-DebtsModule-3bcb7983719749996d96a9c8155855d17895c14da461f64cf96ebf7a91b0ee05c57abc93a37943f1f18c25fa6e1c45f1b280f37b5671a36dd999cdbe09b37561"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DebtsModule-3bcb7983719749996d96a9c8155855d17895c14da461f64cf96ebf7a91b0ee05c57abc93a37943f1f18c25fa6e1c45f1b280f37b5671a36dd999cdbe09b37561"' :
                                            'id="xs-components-links-module-DebtsModule-3bcb7983719749996d96a9c8155855d17895c14da461f64cf96ebf7a91b0ee05c57abc93a37943f1f18c25fa6e1c45f1b280f37b5671a36dd999cdbe09b37561"' }>
                                            <li class="link">
                                                <a href="components/DebtsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DebtsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DebtsRoutingModule.html" data-type="entity-link" >DebtsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GqlModule.html" data-type="entity-link" >GqlModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProgressModule.html" data-type="entity-link" >ProgressModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProgressModule-1df9d253ff19defabb2ec7cb3ecc98c716ff475d61e22c7a540b5d14667c499754aa6d9a3b15784512f8b6d27a95f18f3dd78350af061de889d09f3edeaac4c3"' : 'data-target="#xs-components-links-module-ProgressModule-1df9d253ff19defabb2ec7cb3ecc98c716ff475d61e22c7a540b5d14667c499754aa6d9a3b15784512f8b6d27a95f18f3dd78350af061de889d09f3edeaac4c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProgressModule-1df9d253ff19defabb2ec7cb3ecc98c716ff475d61e22c7a540b5d14667c499754aa6d9a3b15784512f8b6d27a95f18f3dd78350af061de889d09f3edeaac4c3"' :
                                            'id="xs-components-links-module-ProgressModule-1df9d253ff19defabb2ec7cb3ecc98c716ff475d61e22c7a540b5d14667c499754aa6d9a3b15784512f8b6d27a95f18f3dd78350af061de889d09f3edeaac4c3"' }>
                                            <li class="link">
                                                <a href="components/ProgressComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProgressRoutingModule.html" data-type="entity-link" >ProgressRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link" >SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsModule-0c14d17b210530cd9ad75bc1b4d2e304ff3bd3b2beb52d4c9f413d4ef87c9b53a8de66d92a817814950cb2811d05c7b825083056c18eabc73a9535c5032594b6"' : 'data-target="#xs-components-links-module-SettingsModule-0c14d17b210530cd9ad75bc1b4d2e304ff3bd3b2beb52d4c9f413d4ef87c9b53a8de66d92a817814950cb2811d05c7b825083056c18eabc73a9535c5032594b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-0c14d17b210530cd9ad75bc1b4d2e304ff3bd3b2beb52d4c9f413d4ef87c9b53a8de66d92a817814950cb2811d05c7b825083056c18eabc73a9535c5032594b6"' :
                                            'id="xs-components-links-module-SettingsModule-0c14d17b210530cd9ad75bc1b4d2e304ff3bd3b2beb52d4c9f413d4ef87c9b53a8de66d92a817814950cb2811d05c7b825083056c18eabc73a9535c5032594b6"' }>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsRoutingModule.html" data-type="entity-link" >SettingsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-4f5d0279e52e0f8e1e656a30854c109a442245e547f5817a70eb3eff9c851f47c0b055849af6ea3c20f586249f0442e8e38f8a42ff9bc269b012f127adaaf301"' : 'data-target="#xs-components-links-module-SharedModule-4f5d0279e52e0f8e1e656a30854c109a442245e547f5817a70eb3eff9c851f47c0b055849af6ea3c20f586249f0442e8e38f8a42ff9bc269b012f127adaaf301"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-4f5d0279e52e0f8e1e656a30854c109a442245e547f5817a70eb3eff9c851f47c0b055849af6ea3c20f586249f0442e8e38f8a42ff9bc269b012f127adaaf301"' :
                                            'id="xs-components-links-module-SharedModule-4f5d0279e52e0f8e1e656a30854c109a442245e547f5817a70eb3eff9c851f47c0b055849af6ea3c20f586249f0442e8e38f8a42ff9bc269b012f127adaaf301"' }>
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
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-d4831fa16c25248225e73a4470b4f42bac1a05f19ae90bfdd1120c080ec0533fe511d7054e972e7e5fe928b084fc4135b2995e295b2626c768ef0131942791b5"' : 'data-target="#xs-components-links-module-UsersModule-d4831fa16c25248225e73a4470b4f42bac1a05f19ae90bfdd1120c080ec0533fe511d7054e972e7e5fe928b084fc4135b2995e295b2626c768ef0131942791b5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-d4831fa16c25248225e73a4470b4f42bac1a05f19ae90bfdd1120c080ec0533fe511d7054e972e7e5fe928b084fc4135b2995e295b2626c768ef0131942791b5"' :
                                            'id="xs-components-links-module-UsersModule-d4831fa16c25248225e73a4470b4f42bac1a05f19ae90bfdd1120c080ec0533fe511d7054e972e7e5fe928b084fc4135b2995e295b2626c768ef0131942791b5"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link" >UsersRoutingModule</a>
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
                                <a href="interfaces/IAccount.html" data-type="entity-link" >IAccount</a>
                            </li>
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