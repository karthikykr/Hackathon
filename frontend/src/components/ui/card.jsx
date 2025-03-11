// src/components/ui/Card.jsx
const Card = ({ children }) => {
    return <div className="bg-red shadow-md p-4 rounded-lg">{children}</div>;
};

const CardContent = ({ children }) => {
    return <div className="p-2">{children}</div>;
};

export { Card, CardContent };
