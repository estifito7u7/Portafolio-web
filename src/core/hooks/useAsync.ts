/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { isAxiosResponse } from "../utils/isAxiosResponse";


// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const useAsync = <T = any>(asyncFn: () => Promise<T | AxiosResponse<T>>, successFunction: (data: T) => void, returnFunction?: () => void, dependencies: any[] = []) => {
	useEffect(() => {
		let isActive = true;
		asyncFn().then((result) => {
			if (isActive) {
				// Si el resultado es una instancia de AxiosResponse, devuelve result.data
				if (isAxiosResponse(result)) {
					successFunction(result.data);
				} else {
					// Si no, devuelve el resultado tal como está
					successFunction(result);
				}
			}
		});
		return () => {
			returnFunction && returnFunction();
			isActive = false;
		};
	}, dependencies);
};

// asyncFn:() => Promise < T > para aceptar cualquier función que devuelva una promesa del tipo T, ya sea un AxiosResponse o directamente el modelo.
// 	successFunction Sigue aceptando(data: T) => void, lo que asegura que T puede ser cualquier tipo de datos retornados.
//tambien se valida si es unaxios response para que no afecte el flujo de los otros elemento que devuelven axios response
