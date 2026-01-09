import { prisma } from "@/lib/prisma"
import { updateReturnStatus } from "./actions"
import { Badge } from "@/components/ui/badge"

export default async function AdminReturnsPage() {
    const returns = await prisma.returnRequest.findMany({
        include: { order: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">Returns</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Manage return requests and RMAs</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                            {returns.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 font-medium">No return requests found.</td>
                                </tr>
                            ) : (
                                returns.map((req) => (
                                    <tr key={req.id} className="group hover:bg-primary/5 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">#{req.order.id.slice(0, 8)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.createdAt.toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{req.reason}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant={req.status === "PENDING" ? "outline" : req.status === "APPROVED" ? "default" : "destructive"}>
                                                {req.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {req.status === "PENDING" && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <form action={updateReturnStatus.bind(null, req.id, "APPROVED")}>
                                                        <button className="text-green-600 hover:text-green-800 font-bold hover:underline">Approve</button>
                                                    </form>
                                                    <form action={updateReturnStatus.bind(null, req.id, "REJECTED")}>
                                                        <button className="text-red-600 hover:text-red-800 font-bold hover:underline">Reject</button>
                                                    </form>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
