import BasePresenter from './BasePresenter.js';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Header View and Model
 */
class HeaderPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        Bus.globalBus.on(Events.HeaderChangeCatalogID, this.changeCatalogID);
        Bus.globalBus.on(Events.LoginEmitResult, this.updateAuthorizeState);
        Bus.globalBus.on(Events.SignupEmitResult, this.updateAuthorizeState);
        Bus.globalBus.on(Events.ProfileLogoutEmitResult, this.updateAuthorizeState);
        Bus.globalBus.on(Events.HeaderChangeCartItems, this.changeCartItems);
        Bus.globalBus.on(Events.OrderSent, this.setOrDropCartItems);
        Bus.globalBus.on(Events.HeaderSetCartItems, this.setOrDropCartItems);
        Bus.globalBus.on(Events.HeaderChangeFavoriteItems, this.changeFavoriteItems);
        Bus.globalBus.on(Events.HeaderSetFavoriteItems, this.setOrDropFavoriteItems);


        this.bus.on(Events.HeaderLoad, this.loadHeader);
        this.bus.on(Events.HeaderLoaded, this.headerLoadedReaction);
    }

    /**
     *
     * @return {Object}
     */
    get categories() {
        return this.model.categories;
    }

    /**
     *
     * @return {Number}
     */
    get currentCategoryIndex() {
        return this.model.currentCategoryIndex;
    }

    /**
     *
     * @param {Number} index
     */
    set currentCategoryIndex(index) {
        this.model.currentCategoryIndex = index;
    }

    /**
     *
     * @param {Number} id ID of a category
     */
    changeCatalogID = (id) => {
        this.view.ID = id;
    }

    /**
     *
     */
    loadHeader = () => {
        this.model.loadHeader();
    }

    /**
     *
     * @param {string}result
     */
    headerLoadedReaction = (result) => {
        if (result === Responses.Success) {
            this.model.checkAuthorizeState();
            this.view.reRender();
            this.view.cache.hidden = false;
        } else {
            console.error('Cant load header');
        }
    }

    /**
     *
     * @param {string}result
     */
    updateAuthorizeState = (result) => {
        if (result === Responses.Success) {
            this.model.swapAuthorizeState();
            this.view.changeLoginIcon(this.model.currentAuthorizeState);
        } else {
            console.error('Cant load header');
        }
    }

    /**
     * @param {number} value
     */
    changeCartItems = (value) => {
        this.view.changeCartItems(value);
    }

    /**
     * @param {number} value
     */
    changeFavoriteItems = (value) => {
        this.view.changeFavoriteItems(value);
    }

    /**
     * @param {number} value
     * @description sets items amount in cart to new value. By default set items amount to 0
     */
    setOrDropCartItems = (value = 0) => {
        this.view.setCartItems(value);
    }

    /**
     * @param {number} value
     * @description sets items amount in favorites to new value. By default set items amount to 0
     */
    setOrDropFavoriteItems = (value = 0) => {
        this.view.setFavoriteItems(value);
    }
}

export default HeaderPresenter;
