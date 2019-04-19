// class containing comparison functions
export class Compare {

    /** Simple sort comparator for example ID/Name columns (for client-side sorting). */

    public compareString(a: string, b: string, isAsc: boolean): any {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    public compareNumber(a: number, b: number, isAsc: boolean): any {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    /** Date Comparison Function */
    public compareDate(a: string, b: string, isAsc: boolean) {
        const dateA = new Date(a);
        const dateB = new Date(b);

        return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
    }

}
