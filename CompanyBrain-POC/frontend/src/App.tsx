import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  AuthBindings,
  ErrorComponent,
  ThemedLayoutV2,
  RefineThemes,
} from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";
import { ConfigProvider, App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import "@refinedev/antd/dist/reset.css";
import "./App.css";

import { Dashboard } from "./pages/Dashboard";
import { Chat } from "./pages/Chat";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";

// Auth provider that connects to backend
const authProvider: AuthBindings = {
  login: async (params) => {
    try {
      console.log('Frontend received params:', params);
      // Handle both email/password and username/password
      const email = params.email || params.username;
      const password = params.password;
      
      console.log('Frontend sending login data:', { email, password });
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_user", JSON.stringify(data.user));
        return { success: true, redirectTo: "/" };
      } else {
        return { 
          success: false, 
          error: { 
            message: data.error || "Login failed" 
          } 
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: { 
          message: "Network error - make sure backend is running" 
        } 
      };
    }
  },
  logout: async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    const token = localStorage.getItem("auth_token");
    return token ? { authenticated: true } : { authenticated: false, redirectTo: "/login" };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const userStr = localStorage.getItem("auth_user");
    return userStr ? JSON.parse(userStr) : null;
  },
};

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ConfigProvider theme={RefineThemes.Blue}>
          <AntdApp>
            <Refine
              dataProvider={dataProvider("http://localhost:8000/api")}
              authProvider={authProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Dashboard",
                    icon: "🏠",
                  },
                },
                {
                  name: "chat",
                  list: "/chat",
                  meta: {
                    label: "AI Assistant",
                    icon: "🤖",
                  },
                },
                {
                  name: "profile",
                  list: "/profile",
                  meta: {
                    label: "Profile",
                    icon: "👤",
                  },
                },
                {
                  name: "settings",
                  list: "/settings",
                  meta: {
                    label: "Settings",
                    icon: "⚙️",
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "companybrain-poc",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route
                  element={
                    <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;