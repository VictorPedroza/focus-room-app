interface Enviroment {
    FRONT_END_URL: string;
}

export const enviroment: Enviroment = {
    FRONT_END_URL: process.env.FRONT_END_URL || "http://localhost:5173"
}