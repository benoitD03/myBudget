export class Config {

  static ROUTE_LOGIN = 'login';
  static ROUTE_DASHBOARD = 'dashboard';
  static ROUTE_LAST_MONTH = 'last-month';
  static ROUTE_FULL_YEAR = 'full-year';
  static ROUTE_MY_CATEGORIES = 'my-categories';

  static URL_API = 'http://localhost:3000';
  static URL_LOGIN = Config.URL_API + '/auth/login';
  static URL_CATEGORIES = Config.URL_API + '/categories/all';
  static URL_CREATE_CATEGORIES  = Config.URL_API + '/categories';
  static URL_DELETE_CATEGORIES= Config.URL_API + '/categories';
  static URL_UPDATE_CATEGORIES= Config.URL_API + '/categories';
  static URL_SOUS_CATEGORIES = Config.URL_API + '/sous-categories/all';
  static URL_CREATE_SOUS_CATEGORIES = Config.URL_API + '/sous-categories';
  static URL_DELETE_SOUS_CATEGORIES = Config.URL_API + '/sous-categories';
  static URL_UPDATE_SOUS_CATEGORIES = Config.URL_API + '/sous-categories';
}
