export interface BookWidgetType {
    nonAuthUrl: string;
    short_code: string;
    teacher_id: string;
    title: string;
    url: string;
}
export declare const doReadBookWidgets: () => Promise<BookWidgetType[]>;
export default function bookWidgetDB(): {
    doReadBookWidgets(): Promise<BookWidgetType[]>;
    doReadOneBookWidget(id: string): Promise<BookWidgetType>;
    doDeleteBookWidget(id: string): any;
};
