const ID_TOKEN_KEY = "access_token" as string;

export const getToken = (): string | null => {
    if (process.client) {
        return window.localStorage.getItem(ID_TOKEN_KEY);
    }
    return null; // Return a fallback value when running on the server
};

export const saveToken = (token: string): void => {
    if (process.client) {
        window.localStorage.setItem(ID_TOKEN_KEY, token);
    }
};

export const destroyToken = (): void => {
    if (process.client) {
        window.localStorage.removeItem(ID_TOKEN_KEY);
    }
};

export default { getToken, saveToken, destroyToken };
