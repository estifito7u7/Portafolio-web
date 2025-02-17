export class BadRequestError extends Error {
	constructor() {
		super("http.BadRequestError");
		this.name = "http.BadRequestError";
		this.message = "We're sorry, we couldn't process your request. Please check the data you've entered and try again.";
	}
}
