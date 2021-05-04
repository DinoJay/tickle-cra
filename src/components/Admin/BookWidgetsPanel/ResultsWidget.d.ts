import React from "react";
interface ResultsWidgetProps {
    userId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    teacherId: string | undefined;
    baseURL: string;
    height: number;
}
declare const ResultsWidget: React.FC<ResultsWidgetProps>;
export default ResultsWidget;
