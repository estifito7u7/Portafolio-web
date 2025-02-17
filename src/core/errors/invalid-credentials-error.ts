export class InvalidCredentialsError extends Error {
	constructor() {
		super("http.InvalidCredentialsError");
		this.name = "http.InvalidCredentialsError";
		this.message = "The username or password you entered is incorrect. Please try again.";
	}
}
