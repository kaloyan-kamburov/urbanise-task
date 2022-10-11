import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

//react-query components
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "react-query";

//store
import store from "./state/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      retry: false,
      enabled: false,
      onError: (error) => {
        toast.error(
          error instanceof Error ? error?.message : "Something went wrong"
        );
      },
    },
    mutations: {
      onError: (error) => {
        toast.error(
          error instanceof Error ? error?.message : "Something went wrong"
        );
      },
    },
  },

  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong"
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong"
      );
    },
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
