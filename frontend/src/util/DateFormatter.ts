export default function formatDate(date:string){
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day:"numeric",
        hour:"numeric",
        minute: "numeric"
    })
}