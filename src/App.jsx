import { useEffect, useContext } from "react";

import { AppRoutes } from "./routes/AppRoutes";
import UserContext from "./context/UserContext";

function App() {
  const { login } = useContext(UserContext);

  // useEffect(() => {
  //   login("Yasai", "1234");
  // }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
