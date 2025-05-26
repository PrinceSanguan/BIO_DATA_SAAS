import { Head } from '@inertiajs/react';
import { Calendar, Eye, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface User {
    id: number;
    name: string;
    email: string;
    user_role: string;
    created_at: string;
    last_login_at: string | null;
}

interface VisitorStat {
    date: string;
    unique_visitors: number;
}

interface DashboardProps {
    user: {
        name: string;
        email: string;
    };
    users: User[];
    visitorStats: VisitorStat[];
    totalUsers: number;
    totalVisitors: number;
}

export default function Dashboard({ user, users, visitorStats, totalUsers, totalVisitors }: DashboardProps) {
    const [selectedTimeRange, setSelectedTimeRange] = useState('30');

    const handleLogout = () => {
        window.location.href = '/logout';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatChartDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const recentUsers = users.slice(0, 10);
    const totalVisitorsLast30Days = visitorStats.reduce((sum, stat) => sum + stat.unique_visitors, 0);

    return (
        <>
            <Head title="Admin Dashboard - BIODATA" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
                <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
                    {/* Header */}
                    <div className="mb-6 md:mb-8">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">Admin Dashboard</h1>
                                <p className="text-sm text-blue-300 sm:text-base">Welcome back, {user.name}!</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700 sm:w-auto sm:text-base"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-6 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4">
                        <div className="rounded-xl border border-blue-500/20 bg-gray-800/50 p-4 backdrop-blur-sm sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-blue-300 sm:text-sm">Total Users</p>
                                    <p className="text-2xl font-bold text-white sm:text-3xl">{totalUsers}</p>
                                </div>
                                <Users className="h-8 w-8 text-blue-400 sm:h-12 sm:w-12" />
                            </div>
                        </div>

                        <div className="rounded-xl border border-green-500/20 bg-gray-800/50 p-4 backdrop-blur-sm sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-green-300 sm:text-sm">Unique Visitors</p>
                                    <p className="text-2xl font-bold text-white sm:text-3xl">{totalVisitors}</p>
                                </div>
                                <Eye className="h-8 w-8 text-green-400 sm:h-12 sm:w-12" />
                            </div>
                        </div>

                        <div className="rounded-xl border border-purple-500/20 bg-gray-800/50 p-4 backdrop-blur-sm sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-purple-300 sm:text-sm">Visitors (30 days)</p>
                                    <p className="text-2xl font-bold text-white sm:text-3xl">{totalVisitorsLast30Days}</p>
                                </div>
                                <Calendar className="h-8 w-8 text-purple-400 sm:h-12 sm:w-12" />
                            </div>
                        </div>

                        <div className="rounded-xl border border-yellow-500/20 bg-gray-800/50 p-4 backdrop-blur-sm sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-yellow-300 sm:text-sm">New Users Today</p>
                                    <p className="text-2xl font-bold text-white sm:text-3xl">
                                        {users.filter((u) => new Date(u.created_at).toDateString() === new Date().toDateString()).length}
                                    </p>
                                </div>
                                <UserPlus className="h-8 w-8 text-yellow-400 sm:h-12 sm:w-12" />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                        {/* Visitor Analytics Chart */}
                        <div className="rounded-xl border border-blue-500/20 bg-gray-800/50 p-4 backdrop-blur-sm sm:p-6">
                            <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="text-lg font-bold text-white sm:text-xl">Visitor Analytics</h2>
                                <div className="text-xs text-blue-300 sm:text-sm">Last 30 days</div>
                            </div>

                            <div className="h-64 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={visitorStats}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#9CA3AF"
                                            fontSize={10}
                                            tickFormatter={formatChartDate}
                                            interval="preserveStartEnd"
                                        />
                                        <YAxis stroke="#9CA3AF" fontSize={10} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1F2937',
                                                border: '1px solid #374151',
                                                borderRadius: '8px',
                                                color: '#F3F4F6',
                                                fontSize: '12px',
                                            }}
                                            labelFormatter={(value) => `Date: ${formatDate(value)}`}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="unique_visitors"
                                            stroke="#3B82F6"
                                            strokeWidth={2}
                                            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                                            activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 2 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Users */}
                        <div className="rounded-xl border border-green-500/20 bg-gray-800/50 p-4 backdrop-blur-sm sm:p-6">
                            <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="text-lg font-bold text-white sm:text-xl">Recent Users</h2>
                                <div className="text-xs text-green-300 sm:text-sm">Latest {recentUsers.length} users</div>
                            </div>

                            <div className="max-h-64 space-y-3 overflow-y-auto sm:max-h-80">
                                {recentUsers.map((userData) => (
                                    <div key={userData.id} className="rounded-lg border border-gray-600/50 bg-gray-700/30 p-3 sm:p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 sm:h-10 sm:w-10">
                                                        <span className="text-xs font-bold text-blue-400 sm:text-sm">
                                                            {userData.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-white sm:text-base">{userData.name}</p>
                                                        <p className="truncate text-xs text-gray-400 sm:text-sm">{userData.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-2 flex-shrink-0 text-right">
                                                <div
                                                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                                        userData.user_role === 'admin'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : 'bg-green-500/20 text-green-400'
                                                    }`}
                                                >
                                                    {userData.user_role}
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">{formatDate(userData.created_at)}</p>
                                                {userData.last_login_at && (
                                                    <p className="hidden text-xs text-gray-500 sm:block">
                                                        Last: {formatDate(userData.last_login_at)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {users.length > 10 && (
                                <div className="mt-4 text-center">
                                    <p className="text-xs text-gray-400 sm:text-sm">Showing 10 of {users.length} total users</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* All Users Table */}
                    <div className="mt-6 rounded-xl border border-gray-500/20 bg-gray-800/50 p-4 backdrop-blur-sm sm:p-6 lg:mt-8">
                        <h2 className="mb-4 text-lg font-bold text-white sm:mb-6 sm:text-xl">All Users</h2>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-600">
                                        <th className="pb-3 text-sm font-medium text-gray-300">Name</th>
                                        <th className="pb-3 text-sm font-medium text-gray-300">Email</th>
                                        <th className="pb-3 text-sm font-medium text-gray-300">Role</th>
                                        <th className="pb-3 text-sm font-medium text-gray-300">Joined</th>
                                        <th className="pb-3 text-sm font-medium text-gray-300">Last Login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((userData) => (
                                        <tr key={userData.id} className="border-b border-gray-700/50">
                                            <td className="py-3 text-white">{userData.name}</td>
                                            <td className="py-3 text-gray-300">{userData.email}</td>
                                            <td className="py-3">
                                                <span
                                                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                                        userData.user_role === 'admin'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : 'bg-green-500/20 text-green-400'
                                                    }`}
                                                >
                                                    {userData.user_role}
                                                </span>
                                            </td>
                                            <td className="py-3 text-gray-300">{formatDate(userData.created_at)}</td>
                                            <td className="py-3 text-gray-300">
                                                {userData.last_login_at ? formatDate(userData.last_login_at) : 'Never'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="block space-y-3 md:hidden">
                            {users.map((userData) => (
                                <div key={userData.id} className="rounded-lg border border-gray-600/50 bg-gray-700/30 p-4">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-sm font-medium text-white">{userData.name}</h3>
                                            <p className="truncate text-xs text-gray-400">{userData.email}</p>
                                        </div>
                                        <div
                                            className={`ml-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                                userData.user_role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                            }`}
                                        >
                                            {userData.user_role}
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Joined: {formatDate(userData.created_at)}</span>
                                        <span>Last login: {userData.last_login_at ? formatDate(userData.last_login_at) : 'Never'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
