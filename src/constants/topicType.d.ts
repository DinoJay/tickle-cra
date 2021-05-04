import { Card } from "./cardFields";
import { Datum } from "./DatumType";
export default interface Topic extends Datum {
    constant?: boolean;
    count?: number;
    points: number;
    cards?: Card[];
}
