import { AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAxiosResponse = <T>(result: any): result is AxiosResponse<T> => {
	return result && result.data !== undefined && result.status !== undefined;
};
