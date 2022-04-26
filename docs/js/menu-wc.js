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
                                            'data-target="#components-links-module-AlarmsModule-8e6caa783bbcfef1b45a314b66ea5a7e06ede3748d780b70e4df5835b170e0c005c57f2b062f67471d9c5aafe7a45e3f6801f37adbbae366d8a2cc59c141206f"' : 'data-target="#xs-components-links-module-AlarmsModule-8e6caa783bbcfef1b45a314b66ea5a7e06ede3748d780b70e4df5835b170e0c005c57f2b062f67471d9c5aafe7a45e3f6801f37adbbae366d8a2cc59c141206f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlarmsModule-8e6caa783bbcfef1b45a314b66ea5a7e06ede3748d780b70e4df5835b170e0c005c57f2b062f67471d9c5aafe7a45e3f6801f37adbbae366d8a2cc59c141206f"' :
                                            'id="xs-components-links-module-AlarmsModule-8e6caa783bbcfef1b45a314b66ea5a7e06ede3748d780b70e4df5835b170e0c005c57f2b062f67471d9c5aafe7a45e3f6801f37adbbae366d8a2cc59c141206f"' }>
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
                                            'data-target="#components-links-module-AppModule-e5246d129312d2114b35a70e60d89d35095fe36a43c73c17c2006a8585e82e35ef2bf60b5f0dde8e811d7c7d215118bd5eb48dbf0b7d08590a3403984972cefc"' : 'data-target="#xs-components-links-module-AppModule-e5246d129312d2114b35a70e60d89d35095fe36a43c73c17c2006a8585e82e35ef2bf60b5f0dde8e811d7c7d215118bd5eb48dbf0b7d08590a3403984972cefc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e5246d129312d2114b35a70e60d89d35095fe36a43c73c17c2006a8585e82e35ef2bf60b5f0dde8e811d7c7d215118bd5eb48dbf0b7d08590a3403984972cefc"' :
                                            'id="xs-components-links-module-AppModule-e5246d129312d2114b35a70e60d89d35095fe36a43c73c17c2006a8585e82e35ef2bf60b5f0dde8e811d7c7d215118bd5eb48dbf0b7d08590a3403984972cefc"' }>
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
                                            'data-target="#components-links-module-ChatsModule-bce870f2de8cf7fb389ccaa389178e753eba64be4ab673abb47e75545f77905191b901522d23d8fabe7125d1895af8a7b22472ce0752c248595d3b0ffad0f506"' : 'data-target="#xs-components-links-module-ChatsModule-bce870f2de8cf7fb389ccaa389178e753eba64be4ab673abb47e75545f77905191b901522d23d8fabe7125d1895af8a7b22472ce0752c248595d3b0ffad0f506"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatsModule-bce870f2de8cf7fb389ccaa389178e753eba64be4ab673abb47e75545f77905191b901522d23d8fabe7125d1895af8a7b22472ce0752c248595d3b0ffad0f506"' :
                                            'id="xs-components-links-module-ChatsModule-bce870f2de8cf7fb389ccaa389178e753eba64be4ab673abb47e75545f77905191b901522d23d8fabe7125d1895af8a7b22472ce0752c248595d3b0ffad0f506"' }>
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
                                            'data-target="#components-links-module-DebtsModule-87ad4b0575cff8f98213c810137403ad01ae6c434e2cb9430c15a25fbd2692e84f57bc3f3bbf11e799669ae1d0ca0a504f7f2814549d2b91dbc299de0820e2ec"' : 'data-target="#xs-components-links-module-DebtsModule-87ad4b0575cff8f98213c810137403ad01ae6c434e2cb9430c15a25fbd2692e84f57bc3f3bbf11e799669ae1d0ca0a504f7f2814549d2b91dbc299de0820e2ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DebtsModule-87ad4b0575cff8f98213c810137403ad01ae6c434e2cb9430c15a25fbd2692e84f57bc3f3bbf11e799669ae1d0ca0a504f7f2814549d2b91dbc299de0820e2ec"' :
                                            'id="xs-components-links-module-DebtsModule-87ad4b0575cff8f98213c810137403ad01ae6c434e2cb9430c15a25fbd2692e84f57bc3f3bbf11e799669ae1d0ca0a504f7f2814549d2b91dbc299de0820e2ec"' }>
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
                                <a href="modules/MeModule.html" data-type="entity-link" >MeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MeModule-e8f241b86244ff2bac0711bdcd87f68a37de8a34ef7ddb36087ecfa5a1601d48bc24cc37a3f49c1ef9eae2a8dc4e28e5bfe5d101ebf35336667ac3914c8695d1"' : 'data-target="#xs-components-links-module-MeModule-e8f241b86244ff2bac0711bdcd87f68a37de8a34ef7ddb36087ecfa5a1601d48bc24cc37a3f49c1ef9eae2a8dc4e28e5bfe5d101ebf35336667ac3914c8695d1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MeModule-e8f241b86244ff2bac0711bdcd87f68a37de8a34ef7ddb36087ecfa5a1601d48bc24cc37a3f49c1ef9eae2a8dc4e28e5bfe5d101ebf35336667ac3914c8695d1"' :
                                            'id="xs-components-links-module-MeModule-e8f241b86244ff2bac0711bdcd87f68a37de8a34ef7ddb36087ecfa5a1601d48bc24cc37a3f49c1ef9eae2a8dc4e28e5bfe5d101ebf35336667ac3914c8695d1"' }>
                                            <li class="link">
                                                <a href="components/MeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MeRoutingModule.html" data-type="entity-link" >MeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProgressModule.html" data-type="entity-link" >ProgressModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProgressModule-c90ff17cfb22c937bda4a24134f45272570df61c25980b0890f4ee5cc57130a3536a0376900abfb8ca030fd797e5d844970efa0abfe4c8131e400f1fdc20eba7"' : 'data-target="#xs-components-links-module-ProgressModule-c90ff17cfb22c937bda4a24134f45272570df61c25980b0890f4ee5cc57130a3536a0376900abfb8ca030fd797e5d844970efa0abfe4c8131e400f1fdc20eba7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProgressModule-c90ff17cfb22c937bda4a24134f45272570df61c25980b0890f4ee5cc57130a3536a0376900abfb8ca030fd797e5d844970efa0abfe4c8131e400f1fdc20eba7"' :
                                            'id="xs-components-links-module-ProgressModule-c90ff17cfb22c937bda4a24134f45272570df61c25980b0890f4ee5cc57130a3536a0376900abfb8ca030fd797e5d844970efa0abfe4c8131e400f1fdc20eba7"' }>
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
                                            'data-target="#components-links-module-SettingsModule-2b1efc501dbf54d07828183e218fccee7ecdddc401fc1b7a58ad4ee649d7ea82a0e955421e8da8174903ca754fc3b0466a8b1e1f106551da5e1cd31717d0bc60"' : 'data-target="#xs-components-links-module-SettingsModule-2b1efc501dbf54d07828183e218fccee7ecdddc401fc1b7a58ad4ee649d7ea82a0e955421e8da8174903ca754fc3b0466a8b1e1f106551da5e1cd31717d0bc60"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-2b1efc501dbf54d07828183e218fccee7ecdddc401fc1b7a58ad4ee649d7ea82a0e955421e8da8174903ca754fc3b0466a8b1e1f106551da5e1cd31717d0bc60"' :
                                            'id="xs-components-links-module-SettingsModule-2b1efc501dbf54d07828183e218fccee7ecdddc401fc1b7a58ad4ee649d7ea82a0e955421e8da8174903ca754fc3b0466a8b1e1f106551da5e1cd31717d0bc60"' }>
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
                                            'data-target="#components-links-module-UsersModule-da676de169e6e8016ff2eb8d9a291b66c0769f0b363cd80fe9e185de7ff46fdf89abd8261f808cbe465ee9cb6edccda9c06d52a655cd0cc849d3a774b3b396b2"' : 'data-target="#xs-components-links-module-UsersModule-da676de169e6e8016ff2eb8d9a291b66c0769f0b363cd80fe9e185de7ff46fdf89abd8261f808cbe465ee9cb6edccda9c06d52a655cd0cc849d3a774b3b396b2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-da676de169e6e8016ff2eb8d9a291b66c0769f0b363cd80fe9e185de7ff46fdf89abd8261f808cbe465ee9cb6edccda9c06d52a655cd0cc849d3a774b3b396b2"' :
                                            'id="xs-components-links-module-UsersModule-da676de169e6e8016ff2eb8d9a291b66c0769f0b363cd80fe9e185de7ff46fdf89abd8261f808cbe465ee9cb6edccda9c06d52a655cd0cc849d3a774b3b396b2"' }>
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