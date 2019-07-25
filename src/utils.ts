export const assert = (exp: boolean, message: string) => {
    if(!exp) {
        console.error(message);
    }
};
