interface Environment {
    FRONT_END_URL: string;
}

export const environment: Environment = {
    FRONT_END_URL: process.env.FRONT_END_URL!
};

console.log("FRONT_END_URL:", environment.FRONT_END_URL);
