import { DashboardLayout } from "../components/DashboardLayout";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useInstructors, InstructorProvider } from "../contexts/InstructorContext";

export const ManageUser = () => {
    const { instructors, isLoading, error, updateUserStatus } = useInstructors();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleApprove = (userId: string) => {
        updateUserStatus(userId, "Approved");
    };

    const handleReject = (userId: string) => {
        updateUserStatus(userId, "Rejected");
    };

    const getStatusLabelColor = (status: string) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-800";
            case "Rejected":
                return "bg-orange-100 text-orange-800";
            case "Deleted":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Approved":
                return <CheckCircle className="h-5 w-5 text-green-500 mr-2" />;
            case "Rejected":
                return <XCircle className="h-5 w-5 text-red-500 mr-2" />;
            default:
                return <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />;
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
                <div className="mt-8">
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {instructors.map(instructor => (
                                <li key={instructor._id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center">
                                                    {getStatusIcon(instructor.status)}
                                                    <p className="text-sm font-medium text-blue-600 truncate">{instructor.name}</p>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">Email: {instructor.email}</p>
                                                    <p className="text-sm text-gray-500">Join Date: {instructor.createdDate}</p>
                                                    <p className="mt-1 text-sm text-gray-500">Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusLabelColor(instructor.status)}`}>{instructor.status}</span></p>
                                                </div>
                                            </div>
                                            {instructor.status !== "Deleted" && (
                                                <div className="flex space-x-3">
                                                    <button
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                                        onClick={() => handleApprove(instructor._id)}
                                                    >
                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                                        onClick={() => handleReject(instructor._id)}
                                                    >
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export const ManageUserPage = () => (
    <InstructorProvider>
        <ManageUser />
    </InstructorProvider>
);