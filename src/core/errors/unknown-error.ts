export class UnknownError extends Error {
	constructor(public status: number) {
		super("http.UnknownError");
		this.name = "http.UnknownError";
		this.message = "An unknown error has occurred. We're not sure what happened, but we're looking into it. Please try again later.";
	}
}
