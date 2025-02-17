import i18n from "../../main/I18n/i18n";
export class UnauthorizedError extends Error {
	constructor() {
		super("http.UnauthorizedError");
		this.name = "http.UnauthorizedError";
		this.message = i18n.t("http.UnauthorizedError", { ns: "common" });
	}
}
