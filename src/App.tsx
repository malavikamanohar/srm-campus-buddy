import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Buildings from "./pages/Buildings";
import BuildingDetail from "./pages/BuildingDetail";
import Faculties from "./pages/Faculties";
import DepartmentDetail from "./pages/DepartmentDetail";
import FacultyMemberDetail from "./pages/FacultyMemberDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/buildings/:id" element={<BuildingDetail />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/faculties/department/:id" element={<DepartmentDetail />} />
          <Route path="/faculties/member/:id" element={<FacultyMemberDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
