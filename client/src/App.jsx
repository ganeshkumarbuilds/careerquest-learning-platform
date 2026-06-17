import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Badges from "./pages/Badges";
import Lectures from "./pages/Lectures";
import Resume from "./pages/Resume";
import Jobs from "./pages/Jobs";

import CareerAdvisor from "./pages/CareerAdvisor";
import AIQuiz from "./pages/AIQuiz";
import MockInterview from "./pages/MockInterview";
import Internships from "./pages/Internships";
import DailyMissions from "./pages/DailyMissions";
import Certificate from "./pages/Certificate";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Auth */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/certificate"
  element={<Certificate />}
/>

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/missions" element={<DailyMissions />} />

        {/* Learning */}
        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lectures"
          element={
            <ProtectedRoute>
              <Lectures />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        {/* Progress */}
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route path="/internships" element={<Internships />} />

        <Route
          path="/badges"
          element={
            <ProtectedRoute>
              <Badges />
            </ProtectedRoute>
          }
        />

        {/* Resume */}
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />

        {/* AI Features */}

        <Route
          path="/career-advisor"
          element={
            <ProtectedRoute>
              <CareerAdvisor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-quiz"
          element={
            <ProtectedRoute>
              <AIQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mock-interview"
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />
        <Route path="/jobs" element={<Jobs />} />


        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" />}
        />

      </Routes>
    </BrowserRouter>
  );
}
