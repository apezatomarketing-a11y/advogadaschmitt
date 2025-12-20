import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Areas from "./pages/Areas";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Publications from "./pages/Publications";
import PublicationDetail from "./pages/PublicationDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPublicationForm from "./pages/AdminPublicationForm";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/areas"} component={Areas} />
      <Route path={"/sobre"} component={About} />
      <Route path={"/contato"} component={Contact} />
      <Route path={"/publicacoes"} component={Publications} />
      <Route path={"/publicacoes/:slug"} component={PublicationDetail} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/publicacoes/nova"} component={AdminPublicationForm} />
      <Route path={"/admin/publicacoes/:id/editar"} component={AdminPublicationForm} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
