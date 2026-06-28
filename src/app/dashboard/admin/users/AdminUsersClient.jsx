
'use client';

import { useMemo, useState } from 'react';
import { Card, Button, AlertDialog } from "@heroui/react";
import toast from 'react-hot-toast';
import { CircleDashed } from '@gravity-ui/icons';
import { deleteUser } from '@/lib/actions/admin/deleteUser';
import { toggleUserStatus } from '@/lib/actions/admin/toggleUserStatus';
import { updateUserRole } from '@/lib/actions/admin/updateUserRole';

export default function AdminUsersClient({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers || []);
    const [search, setSearch] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.name?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    const handleDelete = async () => {
        if (!deleteId) {
            return toast.error("Invalid User ID");
        }

        try {
            const result = await deleteUser(deleteId);

            if (result.success) {
                setUsers((prev) =>
                    prev.filter(
                        (user) =>
                            user.id !== deleteId &&
                            user._id !== deleteId
                    )
                );

                toast.success(result.message || "User deleted successfully");
            } else {
                toast.error(result.message || "Failed to delete user");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setDeleteId(null);
        }
    };

    const handleToggleBlock = async (id, isBlocked) => {
        if (!id) {
            return toast.error("User ID is missing!");
        }

        try {
            setActionLoading(id);

            const result = await toggleUserStatus(id, !isBlocked);

            if (result.success) {
                setUsers((prev) =>
                    prev.map((user) =>
                        (user.id === id || user._id === id)
                            ? { ...user, banned: !isBlocked }
                            : user
                    )
                );

                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setActionLoading(null);
        }
    };

    const handleRoleChange = async (id, currentRole) => {
        if (!id) {
            return toast.error("User ID is missing!");
        }

        const actionType =
            currentRole === "admin"
                ? "remove_admin"
                : "make_admin";

        try {
            setActionLoading(id);

            const result = await updateUserRole(id, actionType);

            if (result.success) {
                setUsers((prev) =>
                    prev.map((user) =>
                        (user.id === id || user._id === id)
                            ? {
                                ...user,
                                userRole:
                                    actionType === "make_admin"
                                        ? "admin"
                                        : (user.previousRole || "buyer"),
                            }
                            : user
                    )
                );

                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update user role");
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

            <Card className="p-6 shadow-sm border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#121212] transition-colors duration-300">
                <Card.Header className="flex flex-col items-start gap-4 p-0 pb-6 border-b border-gray-100 dark:border-neutral-800/60">
                    <div>
                        <Card.Title className="text-3xl font-black text-neutral-900 dark:text-white tracking-wide">
                            Manage Users
                        </Card.Title>
                        <Card.Description className="text-gray-500 dark:text-neutral-400 mt-1 text-sm">
                            Admin can monitor and control platform users
                        </Card.Description>
                    </div>

                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-96 px-4 py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-amber-500 text-sm bg-white dark:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-200 transition-all placeholder-gray-400 dark:placeholder-neutral-600"
                        />
                    </div>
                </Card.Header>

                <Card.Content className="p-0 pt-6">
                    <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] shadow-sm dark:shadow-2xl">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-gray-50 dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-neutral-800">
                                <tr>
                                    <th className="p-4 font-semibold dark:font-bold text-sm dark:text-xs dark:uppercase dark:tracking-wider text-gray-600 dark:text-neutral-400">User</th>
                                    <th className="p-4 font-semibold dark:font-bold text-sm dark:text-xs dark:uppercase dark:tracking-wider text-gray-600 dark:text-neutral-400">Email</th>
                                    <th className="p-4 font-semibold dark:font-bold text-sm dark:text-xs dark:uppercase dark:tracking-wider text-gray-600 dark:text-neutral-400">Role</th>
                                    <th className="p-4 font-semibold dark:font-bold text-sm dark:text-xs dark:uppercase dark:tracking-wider text-gray-600 dark:text-neutral-400">Status</th>
                                    <th className="p-4 font-semibold dark:font-bold text-sm dark:text-xs dark:uppercase dark:tracking-wider text-gray-600 dark:text-neutral-400">Joined</th>
                                    <th className="p-4 font-semibold dark:font-bold text-sm dark:text-xs dark:uppercase dark:tracking-wider text-right text-gray-600 dark:text-neutral-400">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                                {filteredUsers.map((user, index) => {
                                    const userId = user._id || user.id;

                                    return (
                                        <tr key={userId || `user-${index}`} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.image || 'https://i.ibb.co/3S1mC6t/user-placeholder.png'}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full object-cover border dark:border-neutral-700"
                                                    />
                                                    <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{user.name}</span>
                                                </div>
                                            </td>

                                            <td className="p-4 text-sm text-gray-600 dark:text-neutral-400">{user.email}</td>

                                            <td className="p-4 text-sm">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-900/50'
                                                    : 'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900/50'
                                                    }`}>
                                                    {user.userRole}
                                                </span>
                                            </td>

                                            <td className="p-4 text-sm">
                                                {user.banned ? (
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/30">
                                                        Blocked
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30">
                                                        Active
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-4 text-sm text-gray-500 dark:text-neutral-500">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>

                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        disabled={actionLoading === userId}
                                                        onClick={() => handleRoleChange(userId, user.userRole)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${user.userRole === 'admin'
                                                            ? 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                                                            : 'bg-purple-600 text-white hover:bg-purple-700 dark:shadow-md dark:shadow-purple-900/20'
                                                            }`}
                                                    >
                                                        {user.userRole === 'admin' ? 'Demote Admin' : 'Make Admin'}
                                                    </button>

                                                    <button
                                                        disabled={actionLoading === userId}
                                                        onClick={() => handleToggleBlock(userId, user.banned)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${user.banned
                                                            ? 'bg-green-600 text-white hover:bg-green-700 dark:bg-emerald-600'
                                                            : 'bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600'
                                                            }`}
                                                    >
                                                        {user.banned ? 'Unblock' : 'Block'}
                                                    </button>

                                                    <button
                                                        onClick={() => setDeleteId(userId)}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition dark:shadow-md dark:shadow-red-900/20"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12 text-gray-500 dark:text-neutral-500 font-medium dark:bg-[#161616]">
                                No users found
                            </div>
                        )}
                    </div>
                </Card.Content>
                <Card.Footer className="p-0" />
            </Card>

            <AlertDialog
                isOpen={Boolean(deleteId)}
                onOpenChange={(isOpen) => !isOpen && setDeleteId(null)}
            >
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog>
                            <AlertDialog.Header>
                                <AlertDialog.Heading>
                                    Delete User Account
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                Are you sure you want to permanently delete this user? This action cannot be undone.
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    variant="bordered"
                                    onPress={() => setDeleteId(null)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium"
                                    onPress={handleDelete}
                                >
                                    Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
}

