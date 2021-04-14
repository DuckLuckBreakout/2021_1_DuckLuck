import BasePresenter from './BasePresenter.js';
import Router from '../utils/router/Router';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Login View and Model
 */
class LoginPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.LoginSendData, this.sendFormToModel);
        this.bus.on(Events.LoginEmitResult, this.processLoginResult);
    }

    /**
     * @description Gets data from View, than validates it and sends to Model.
     */
    sendFormToModel = () => {
        // if (!this.isFormValid(['text'])) {
        //     this.bus.emit(Events.LoginIncorrectForm);
        //     return;
        // }
        if (!navigator.onLine) {
            Router.open('/offline');
            return;
        }
        const email = document.getElementsByName('email')[0].value.trim();
        const password = document.getElementsByName('password')[0].value.trim();
        this.model.loginUser({email, password});
    }

    /**
     *
     * @param {string} result
     * @description Processes result for login attempt
     */
    processLoginResult = (result) => {
        if (result === Responses.Success) {
            this.view.remove();
            Bus.globalBus.emit(Events.ProfileNewUserLoggedIn);
            Router.open('/profile', {replaceState: true});
        } else {
            console.error(result);
        }
    }
}

export default LoginPresenter;
