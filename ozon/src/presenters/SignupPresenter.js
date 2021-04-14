import BasePresenter from './BasePresenter.js';
import Router from '../utils/router/Router';
import Events from '../utils/bus/events';
import Responses from '../utils/bus/responses';
import {Bus} from '../utils/bus/bus';

/**
 * @description Presenter for Signup View and Model
 */
class SignupPresenter extends BasePresenter {
    /**
     * @param {HTMLElement} application html of application
     * @param {Class} View Class of view object
     * @param {Class} Model Class of model object
     */
    constructor(application, View, Model) {
        super(application, View, Model);
        this.bus.on(Events.SignupSendData, this.sendFormToModel);
        this.bus.on(Events.SignupEmitResult, this.processSignupResult);
    }

    /**
     * @description get data from view and send to model
     */
    sendFormToModel = () => {
        if (!this.isFormValid(['text'])) {
            this.bus.emit(Events.SignupIncorrectForm);
            return;
        }
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        this.model.signupUser({email, password});
    }

    /**
     *
     * @param {string} result
     */
    processSignupResult = (result) => {
        switch (result) {
        case Responses.Success: {
            this.view.remove();
            Bus.globalBus.emit(Events.ProfileNewUserLoggedIn);
            Router.open('/profile', {replaceState: true});
            break;
        }
        case Responses.Offline: {
            Router.open('/offline', {replaceState: true});
            break;
        }
        default: {
            console.error(result);
            break;
        }
        }
    }
}

export default SignupPresenter;
