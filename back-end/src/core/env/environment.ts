interface Environment {
  FRONT_END_URL: string;
}

export const environment: Environment = {
  FRONT_END_URL: process.env.FRONT_END_URL || "http://localhost:5173",
};
