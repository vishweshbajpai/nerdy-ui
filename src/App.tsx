import { RecoilRoot } from "recoil";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const FormPage = lazy(() => import("./pages/FormPage"));

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
