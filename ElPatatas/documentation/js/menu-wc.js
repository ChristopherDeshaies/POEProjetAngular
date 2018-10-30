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
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">el-patatas documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
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
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-817a49430c93ba09069ec775c8f3fa32"' : 'data-target="#xs-components-links-module-AppModule-817a49430c93ba09069ec775c8f3fa32"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-817a49430c93ba09069ec775c8f3fa32"' : 'id="xs-components-links-module-AppModule-817a49430c93ba09069ec775c8f3fa32"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ComptabiliteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComptabiliteComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/GestionstocksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionstocksComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PlanningComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlanningComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CommandesModule.html" data-type="entity-link">CommandesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CommandesModule-dab4ab36da467f1ff2d5f0d781166734"' : 'data-target="#xs-components-links-module-CommandesModule-dab4ab36da467f1ff2d5f0d781166734"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CommandesModule-dab4ab36da467f1ff2d5f0d781166734"' : 'id="xs-components-links-module-CommandesModule-dab4ab36da467f1ff2d5f0d781166734"' }>
                                        <li class="link">
                                            <a href="components/CommandesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommandesComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CommandesRoutingModule.html" data-type="entity-link">CommandesRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ComptabiliteModule.html" data-type="entity-link">ComptabiliteModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ComptabiliteModule-5fe5eecf0c78d44e31cbcdca3c1601be"' : 'data-target="#xs-components-links-module-ComptabiliteModule-5fe5eecf0c78d44e31cbcdca3c1601be"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ComptabiliteModule-5fe5eecf0c78d44e31cbcdca3c1601be"' : 'id="xs-components-links-module-ComptabiliteModule-5fe5eecf0c78d44e31cbcdca3c1601be"' }>
                                        <li class="link">
                                            <a href="components/ComptabiliteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComptabiliteComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CoreModule-dbbb3e15e37f9a8dc5f3045948894aa5"' : 'data-target="#xs-components-links-module-CoreModule-dbbb3e15e37f9a8dc5f3045948894aa5"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CoreModule-dbbb3e15e37f9a8dc5f3045948894aa5"' : 'id="xs-components-links-module-CoreModule-dbbb3e15e37f9a8dc5f3045948894aa5"' }>
                                        <li class="link">
                                            <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/EmployesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmployesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-CoreModule-dbbb3e15e37f9a8dc5f3045948894aa5"' : 'data-target="#xs-injectables-links-module-CoreModule-dbbb3e15e37f9a8dc5f3045948894aa5"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-CoreModule-dbbb3e15e37f9a8dc5f3045948894aa5"' : 'id="xs-injectables-links-module-CoreModule-dbbb3e15e37f9a8dc5f3045948894aa5"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthenticationService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CoreRootingModule.html" data-type="entity-link">CoreRootingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/GestionstocksModule.html" data-type="entity-link">GestionstocksModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GestionstocksModule-15035f0bc1541b05688555d7ac919375"' : 'data-target="#xs-components-links-module-GestionstocksModule-15035f0bc1541b05688555d7ac919375"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GestionstocksModule-15035f0bc1541b05688555d7ac919375"' : 'id="xs-components-links-module-GestionstocksModule-15035f0bc1541b05688555d7ac919375"' }>
                                        <li class="link">
                                            <a href="components/GestionstocksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionstocksComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PlanningModule.html" data-type="entity-link">PlanningModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ProduitsModule.html" data-type="entity-link">ProduitsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProduitsModule-8e560ef91a9fe98fcd1290c3712b5c9f"' : 'data-target="#xs-components-links-module-ProduitsModule-8e560ef91a9fe98fcd1290c3712b5c9f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProduitsModule-8e560ef91a9fe98fcd1290c3712b5c9f"' : 'id="xs-components-links-module-ProduitsModule-8e560ef91a9fe98fcd1290c3712b5c9f"' }>
                                        <li class="link">
                                            <a href="components/ProduitsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProduitsComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/Commandes.html" data-type="entity-link">Commandes</a>
                    </li>
                    <li class="link">
                        <a href="classes/ItemMenu.html" data-type="entity-link">ItemMenu</a>
                    </li>
                    <li class="link">
                        <a href="classes/Planning.html" data-type="entity-link">Planning</a>
                    </li>
                    <li class="link">
                        <a href="classes/Produits.html" data-type="entity-link">Produits</a>
                    </li>
                    <li class="link">
                        <a href="classes/Stocks.html" data-type="entity-link">Stocks</a>
                    </li>
                    <li class="link">
                        <a href="classes/User.html" data-type="entity-link">User</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/ApiService.html" data-type="entity-link">ApiService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/CommandesService.html" data-type="entity-link">CommandesService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ComptabiliteService.html" data-type="entity-link">ComptabiliteService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/GestionstocksService.html" data-type="entity-link">GestionstocksService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PlanningService.html" data-type="entity-link">PlanningService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ProduitsService.html" data-type="entity-link">ProduitsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/StocksService.html" data-type="entity-link">StocksService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                </li>
                <li class="link">
                    <a href="guards/RoleGuardService.html" data-type="entity-link">RoleGuardService</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
