export default function parseDate(date:string){
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day} - ${month} - ${year}`;
}