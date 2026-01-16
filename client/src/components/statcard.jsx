export function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    );
}