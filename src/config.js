// ==============================|| THEME CONSTANT ||============================== //

export const APP_DEFAULT_PATH = '/dashboard/default';
export const DRAWER_WIDTH = 260;
export const MINI_DRAWER_WIDTH = 60;
export const MOBILE_VITE_APP_LOGO = import.meta.env.VITE_APP_MOBILE_LOGO;
export const WEB_VITE_APP_LOGO = import.meta.env.VITE_APP_WEB_LOGO ;

// ==============================|| CONFIG ||============================== //


const config = {
 get tokenKey() {
    return localStorage.getItem(adminToken) || import.meta.env.VITE_APP_API_TOKEN;
  },
  get token() {
    return localStorage.getItem(this.adminToken) || import.meta.env.VITE_APP_API_TOKEN;
  },
  env: import.meta.env.VITE_APP_ENV,
  configApi: import.meta.env.VITE_APP_API,
  token: import.meta.env.VITE_APP_API_TOKEN,
  mobilelogo: import.meta.env.VITE_APP_MOBILE_LOGO,
  weblogo: import.meta.env.VITE_APP_WEB_LOGO,
};

export default config;

console.log('API:', config.configApi);
console.log('ENV:', config.env);
console.log('TOKEN:', config.token);