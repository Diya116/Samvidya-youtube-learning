import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
const Home = lazy(() => import("./pages/landingpage/Home/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Learning = lazy(() => import("./pages/learning/Learning"));
const Signup = lazy(() => import("./pages/auth/signup/Signup"));
const Login = lazy(() => import("./pages/auth/login/Login"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
import Note from "./pages/note/Note";
import NotFound from "./pages/notFound/NotFound";
import { ProtectedRoute } from "./protectingRoute";
import Loader from "./components/Loader";
import { Toaster } from "sonner";
import MainLayout from "./components/layout/MainLayout";
import Courses from "./pages/course/Courses";
import Notes from "./pages/note/Notes";
import Setting from "./pages/Setting/Setting";
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note/:id" element={<Note />} />
          <Route
            path="/workspace"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="courses" element={<Courses />} />
            <Route path="notes" element={<Notes />} />
            <Route path="setting" element={<Setting />} />
          </Route>
          <Route
            path="/learn/:id"
            element={
              <ProtectedRoute>
                <Learning />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
