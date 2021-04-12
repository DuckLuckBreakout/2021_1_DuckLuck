import {ProfileView} from './views/ProfileView/ProfileView.js';
import {LoginView} from './views/LoginView/LoginView.js';
import {SignupView} from './views/SignupView/SignupView.js';
import {HomeView} from './views/HomeView/HomeView.js';
import {ProductView} from './views/ProductView/ProductView.js';
import {ProductsView} from './views/ProductsView/ProductsView';
import {HeaderView} from './views/HeaderView/HeaderView';
import ProfilePresenter from './presenters/ProfilePresenter';
import Router from './utils/router/Router.js';
import SignupModel from './models/SignupModel';
import SignupPresenter from './presenters/SignupPresenter';
import ProfileModel from './models/ProfileModel';
import LoginModel from './models/LoginModel';
import LoginPresenter from './presenters/LoginPresenter';
import ProductsModel from './models/ProductsModel';
import ProductsPresenter from './presenters/ProductsPresenter';
import ProductModel from './models/ProductModel';
import ProductPresenter from './presenters/ProductPresenter';
import HeaderModel from './models/HeaderModel';
import HeaderPresenter from './presenters/HeaderPresenter';

const header = document.getElementsByTagName('header')[0];
const headerPresenter = new HeaderPresenter(header, HeaderView, HeaderModel);
headerPresenter.view.show();

const application = document.getElementById('app');

Router.root = application;

const homeView = new HomeView(application, null, null);

const signupPresenter = new SignupPresenter(application, SignupView, SignupModel);
const loginPresenter = new LoginPresenter(application, LoginView, LoginModel);
const profilePresenter = new ProfilePresenter(application, ProfileView, ProfileModel);
const productsPresenter = new ProductsPresenter(application, ProductsView, ProductsModel);
const productPresenter = new ProductPresenter(application, ProductView, ProductModel);


Router
    .register('/', homeView)
    .register('/signup', signupPresenter.view)
    .register('/login', loginPresenter.view)
    .register('/profile', profilePresenter.view)
    .register('/items', productsPresenter.view)
    .register('/item', productPresenter.view);

Router.start();
