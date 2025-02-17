import i18n from "../../main/I18n/i18n";

export class AccessDeniedError extends Error {
	constructor() {
		super("http.AccessDeniedError");
		this.name = "http.AccessDeniedError";
		this.message = i18n.t("http.AccessDeniedError", { ns: "common" });
	}
}
