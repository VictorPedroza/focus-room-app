import { AppRoutes } from "@/core/routes";
import { MainContext } from "@/core/context";

function App() {
  return (
    <MainContext>
      <AppRoutes />
    </MainContext>
  );
}

export default App;