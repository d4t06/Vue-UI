export const getLocalStorage = () =>
	JSON.parse(localStorage.getItem("vue-ui") || "{}") as Record<string, any>;

export const setLocalStorage = (key: string, value: any) => {
	const storage = getLocalStorage();
	storage[key] = value;

	return localStorage.setItem("vue-ui", JSON.stringify(storage));
};
