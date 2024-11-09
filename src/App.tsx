import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./apis";
import Cookies from "js-cookie";
import { USER_ACCESS_KEY } from "./utils/enums";

const Login = lazy(() => import("./pages/authentication/login"));
function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> add check here  */}
            <Route
              path="/"
              element={
                Cookies.get(USER_ACCESS_KEY.TOKEN) ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
