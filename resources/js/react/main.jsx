import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Ideas from "./pages/Ideas";
import Tasks from "./pages/Tasks";
import AppThemeProvider from "./theme/AppThemeProvider";
import { UserProvider } from "./context/UserContext";
import { api } from "./lib/api";

const rootElement = document.getElementById("root");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: true,
        },
    },
});

async function bootstrap() {
    let users = [];

    try {
        users = await api.getUsers();
    } catch (error) {
        console.error("Failed to load users.", error);
    }

    if (rootElement) {
        createRoot(rootElement).render(
            <QueryClientProvider client={queryClient}>
                <AppThemeProvider>
                    <UserProvider users={users}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<App />}>
                                    <Route index element={<Ideas />} />
                                    <Route path="tasks" element={<Tasks />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </UserProvider>
                </AppThemeProvider>
            </QueryClientProvider>,
        );
    }
}

bootstrap();
