// util file for date formatting

export function formatDate(date){
    return new Date(date).toLocaleString("en-US",{
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })   
};