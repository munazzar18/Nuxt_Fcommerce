const authUser = "user" as string;

export const getUser = (): Record<string, any> | null => {
    if (process.client) {
        const userString = window.localStorage.getItem(authUser);
        if (userString) {
            return JSON.parse(userString);
        }
    }
    return null;
};

export const saveUser = (user: Record<string, any>): void => {
    if (process.client) {
        const userString = JSON.stringify(user);
        window.localStorage.setItem(authUser, userString);
    }
};

export const removeUser = (): void => {
    if (process.client) {
        window.localStorage.removeItem(authUser);
    }
};

export default { getUser, saveUser, removeUser };
