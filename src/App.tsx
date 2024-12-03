import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./apis";
import Cookies from "js-cookie";
import { USER_ACCESS_KEY } from "./utils/enums";

const Login = lazy(() => import("./pages/authentication/login"));
const Signup = lazy(() => import("./pages/authentication/signup"));
const ForgetPassword = lazy(
  () => import("./pages/authentication/forgetPassword")
);

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                Cookies.get(USER_ACCESS_KEY.TOKEN) ? (
                  <Navigate to="/home" replace /> //fix route name
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            {/* <Route path="/home" element={<Home />} /> fix route name  */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
