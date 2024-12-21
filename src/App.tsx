import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./apis";
import { UserContextProvider } from "./context";
import AppRoutes from "./routes";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Router>
            <AppRoutes />
          </Router>
        </UserContextProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
