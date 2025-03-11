import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({ data }) => (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-2">Questions Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="questions" fill="#4F46E5" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default Chart;

