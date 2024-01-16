export const formatToDateTime = (isoDate: any) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString(undefined, options);
}