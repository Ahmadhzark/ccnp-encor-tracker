import { Route, Routes } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { Topics } from "./pages/Topics";
import { Labs } from "./pages/Labs";
import { Log } from "./pages/Log";
import { Analytics } from "./pages/Analytics";
import { Goals } from "./pages/Goals";
import { Notes } from "./pages/Notes";
import { Settings } from "./pages/Settings";
import { About } from "./pages/About";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="topics" element={<Topics />} />
        <Route path="labs" element={<Labs />} />
        <Route path="log" element={<Log />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="goals" element={<Goals />} />
        <Route path="notes" element={<Notes />} />
        <Route path="settings" element={<Settings />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
