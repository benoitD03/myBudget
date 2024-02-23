import { environment } from "../../environments/environment";

export class Config {

  static ROUTE_LOGIN = 'login';
  static ROUTE_DASHBOARD = 'dashboard';
  static ROUTE_LAST_MONTH = 'last-month';
  static ROUTE_FULL_YEAR = 'full-year';
  static ROUTE_MY_CATEGORIES = 'my-categories';
  static ROUTE_HELP = 'help';

  static URL_API = environment.apiURL;
  static URL_LOGIN = Config.URL_API + '/auth/login';
  static URL_CATEGORIES = Config.URL_API + '/categories/all';
  static URL_CREATE_CATEGORIES  = Config.URL_API + '/categories';
  static URL_DELETE_CATEGORIES= Config.URL_API + '/categories';
  static URL_UPDATE_CATEGORIES= Config.URL_API + '/categories';
  static URL_SOUS_CATEGORIES = Config.URL_API + '/sous-categories/all';
  static URL_SOUS_CATEGORIES_BY_MONTH = Config.URL_API + '/sous-categories/by-month';
  static URL_SOUS_CATEGORIES_ALL_BY_MONTH = Config.URL_API + '/sous-categories/all-by-month';
  static URL_SOUS_CATEGORIES_BY_YEAR = Config.URL_API + '/sous-categories/by-year';
  static URL_CREATE_SOUS_CATEGORIES = Config.URL_API + '/sous-categories';
  static URL_DELETE_SOUS_CATEGORIES = Config.URL_API + '/sous-categories';
  static URL_UPDATE_SOUS_CATEGORIES = Config.URL_API + '/sous-categories';
  static URL_FAVORIS = Config.URL_API + '/favoris/all';
  static URL_CREATE_FAVORIS  = Config.URL_API + '/favoris';
  static URL_DELETE_FAVORIS= Config.URL_API + '/favoris';
  static URL_UPDATE_FAVORIS= Config.URL_API + '/favoris';
}
