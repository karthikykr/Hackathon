import { Card, CardContent } from "./ui/card";


const StatsCard = ({ title, value }) => (
    <Card>
        <CardContent>
            <p className="text-gray-600">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
        </CardContent>
    </Card>
);

export default StatsCard;