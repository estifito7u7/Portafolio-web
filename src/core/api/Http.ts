// src/core/api/HttpClient.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import Config from "../../main/app/Configuration/config";
import { HttpStatusCode } from "./http-status-code";
import { AccessDeniedError, BadRequestError, ConflictError, NotFoundError, UnauthorizedError, UnavailableError, UnexpectedError, UnknownError } from "../errors";
import Config from "../../main/app/configuration/config";


class HttpClient {
	private instance: AxiosInstance;
	private readonly timeout = 50000;
	private readonly apiUrl = Config.api_url;
	// private readonly notificationMapping: { [key: string]: NotificationMappingItem } = {
	// 	"Object successfully created": { message: "Se agregó correctamente", type: "success", bgColor: "#E2FBE8", textColor: "#3C7E44" },
	// 	// Agrega los demás mensajes aquí...
	// };

	constructor() {
		this.instance = axios.create({
			baseURL: this.apiUrl,
			timeout: this.timeout,
			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFTOKEN',
		});

		this.initializeRequestInterceptor();
		this.initializeResponseInterceptor();
	}
	private initializeRequestInterceptor() {
		this.instance.interceptors.request.use(
			(config) => {
			
				config.xsrfCookieName = "csrftoken";
				config.xsrfHeaderName = "X-CSRFTOKEN";
				return config;
			},
			(error) => Promise.reject(error),
		);
	}

	private initializeResponseInterceptor() {
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				// const messageData = this.notificationMapping[response.data.message];
				// if (messageData) {
				// 	notifyToastUtilitie.customToast("¡Listo!", messageData.message, messageData.type, {
				// 		backgroundColor: messageData.bgColor,
				// 		color: messageData.textColor,
				// 		padding: "4px",
				// 	});
				// }
				return response;
			},
			(error) => {
				console.log(error);
				/* const errorMessage = getValidationError(error.code) || error.response?.data?.detail ||
				 this.getErrorNotification(error.response?.data?.message) || "Error indefinido";
				notifyToastUtilitie.customToast("Ups!", errorMessage, "error", {
					backgroundColor: "#DA3B3A",
					color: "white",
					padding: "4px",
				}); */
				//return Promise.reject(error);

				return this.handleError(error);
			},
		);
	}

	// private getErrorNotification(key: string): string {
	// 	return this.notificationMapping[key]?.message || key;
	// }

	public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.get(url, config);
	}

	public post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.post(url, data, config);
	}

	public put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.put(url, data, config);
	}
	public patch<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.patch(url, data, config);
	}

	public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.delete(url, config);
	}

	public postFormData<T>(url: string, data: FormData): Promise<AxiosResponse<T>> {
		return this.instance.post(url, data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	}

	public request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.request(config);
	}

	private handleError(error: AxiosError) {
		console.log("Detalles del error:", error);
		const httpErrors: Record<number, Error> = {
			[HttpStatusCode.NotFound]: new NotFoundError(),
			[HttpStatusCode.Unauthorized]: new UnauthorizedError(),
			[HttpStatusCode.InternalServerError]: new UnexpectedError(),
			[HttpStatusCode.ServiceUnavailable]: new UnavailableError(),
			[HttpStatusCode.BadRequest]: new BadRequestError(),
			[HttpStatusCode.Forbidden]: new AccessDeniedError(),
			[HttpStatusCode.Conflict]: new ConflictError(),
		};
		return Promise.reject(httpErrors[error.response?.status ?? 0] ?? new UnknownError(error.response?.status ?? -1));
	}
}

export default new HttpClient();
