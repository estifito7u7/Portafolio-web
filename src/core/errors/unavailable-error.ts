export class UnavailableError extends Error {
	constructor() {
		super("http.UnavailableError");
		this.name = "http.UnavailableError";
		this.message = "We're sorry, the service you're trying to access is currently unavailable. Please try again later.";
	}
}
