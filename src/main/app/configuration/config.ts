

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const envSettings = Object.keys((window as any)._env_).length ? (window as any)._env_ : import.meta.env;

export default class Config {
	static api_url = envSettings.VITE_API_URL;
	static app_title = envSettings.VITE_APP_TITLE;	
}
