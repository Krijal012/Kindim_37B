export function DataTable({ columns, data, emptyMessage = "No data available" }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            {columns.map((column, index) => (
                                <th key={index} className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td key={cellIndex} className="py-3 px-4 text-sm text-gray-700">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}