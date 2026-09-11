import { server } from "./app.js";

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
