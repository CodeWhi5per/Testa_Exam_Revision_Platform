import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ExamList } from "./pages/ExamList";
import { StudentDashboard } from "./pages/StudentDashboard";
import { InstructorDashboard } from "./pages/InstructorDashboard";
import { ExamDetails } from "./pages/ExamDetails";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ExamUploadForm } from "./components/ExamUploadForm";
import { AuthProvider } from "./contexts/AuthContext";
import { DepartmentProvider } from "./contexts/DepartmentContext";
import { CourseProvider } from "./contexts/CourseContext";
import { ExamProvider} from "./contexts/ExamContext.tsx";
import { Settings } from "./components/Settings";
import { Earnings } from "./components/Earnings";
import { ManageUserPage } from "./pages/ManageUser";
import { AdminDashboardPage } from "./pages/AdminDashboard";
import {AdminApprovalsPage} from "./pages/AdminApprovals";

export function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <DepartmentProvider>
                    <CourseProvider>
                        <ExamProvider>
                            <div className="min-h-screen bg-gray-50 flex flex-col">
                                <Header />
                                <div className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/login" element={<LoginPage />} />
                                        <Route path="/signup" element={<SignupPage />} />
                                        <Route path="/exams" element={<ExamList />} />
                                        <Route path="/exam/:id" element={<ExamDetails />} />
                                        <Route path="/dashboard/student/*" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
                                        <Route path="/dashboard/instructor/*" element={<ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute>} />
                                        <Route path="/dashboard/instructor/upload" element={<ProtectedRoute role="instructor"><ExamUploadForm /></ProtectedRoute>} />
                                        <Route path="/dashboard/instructor/settings" element={<ProtectedRoute role="instructor"><Settings /></ProtectedRoute>} />
                                        <Route path="/dashboard/instructor/earnings" element={<ProtectedRoute role="instructor"><Earnings /></ProtectedRoute>} />
                                        <Route path="/dashboard/student/settings" element={<ProtectedRoute role="student"><Settings /></ProtectedRoute>} />
                                        <Route path="/dashboard/admin/settings" element={<ProtectedRoute role="admin"><Settings /></ProtectedRoute>} />
                                        <Route path="/dashboard/admin/users" element={<ProtectedRoute role="admin"><ManageUserPage /></ProtectedRoute>} />
                                        <Route path="/dashboard/admin" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
                                        <Route path="/dashboard/admin/approvals" element={<ProtectedRoute role="admin"><AdminApprovalsPage /></ProtectedRoute>} />
                                    </Routes>
                                </div>
                                <Footer />
                            </div>
                        </ExamProvider>
                    </CourseProvider>
                </DepartmentProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}