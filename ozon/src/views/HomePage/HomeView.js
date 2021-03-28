import {BaseView} from '../BaseView.js';
import HomeViewTemplate from './HomeView.hbs';
import {Link} from "../Common/Link/Link.js";

/**
 * @class HomeView
 * @extends BaseView
 * @classdesc Class for initial, starting page
 */
export class HomeView extends BaseView {
    /**
     *
     * @param el
     */
    constructor(el) {
        if (HomeView.__instance) {
            return HomeView.__instance;
        }

        super(el);
        HomeView.__instance = this;
    }

    /**
     *
     * @param {Object} config configuration which will use to render this page
     */
    render = (config) => {
        this.el.innerHTML = '';
        if (this.cache) {
            this.el.appendChild(this.cache);
            return;
        }

        const htmlTemplate = HomeViewTemplate({
            links: [new Link({href: '/home', name: 'Home', type: 'href', dataSection: 'home'}),
                    new Link({href: '/signup', name: 'Зарегестрироваться', type: 'href', dataSection: 'signup'}),
                    new Link({href: '/login', name: 'Войти', type: 'href', dataSection: 'login'}),
                    new Link({href: '/me', name: 'Профиль', type: 'href', dataSection: 'profile'}),],
        });
        this._cache = new DOMParser().parseFromString(htmlTemplate, 'text/html').getElementById('home-view-block');
        this.el.appendChild(this.cache);
    }
}
