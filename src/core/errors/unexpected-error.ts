export class UnexpectedError extends Error {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(readonly details: any = null) {
		super("http.UnexpectedError");
		this.name = "http.UnexpectedError";
		this.message = "An unexpected error has occurred. We're working to fix it. Please try again later.";
	}
}
