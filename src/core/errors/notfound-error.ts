export class NotFoundError extends Error {
	constructor() {
		super("http.NotFoundError");
		this.name = "http.NotFoundError";
		this.message = "We're sorry, the resource you're looking for doesn't exist or has been removed.";
	}
}
