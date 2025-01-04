export const getLocalStorage = () =>
	JSON.parse(localStorage.getItem("vue-ui") || "{}") as Record<string, any>;

export const setLocalStorage = (key: string, value: any) => {
	const storage = getLocalStorage();
	storage[key] = value;

	return localStorage.setItem("vue-ui", JSON.stringify(storage));
};

export const formatTime = (time: number) => {
	const minutes = Math.round(time / 60);
	const seconds = Math.round(time % 60);
	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const checkDisable = (b: boolean) => {
	return b ? "disabled" : "";
};
