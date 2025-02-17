import i18n from "../../main/I18n/i18n";
export class ConflictError extends Error {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(readonly details: any = null) {
		super("http.ConflictError");
		this.name = "http.ConflictError";
		this.message = i18n.t("http.ConflictError", { ns: "common" });
	}
}
