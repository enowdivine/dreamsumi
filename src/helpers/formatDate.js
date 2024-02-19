export const formatDate = (data) => {

    const originalDate = new Date(data);
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const day = originalDate.getDate();
    const monthIndex = originalDate.getMonth();
    const year = originalDate.getFullYear();
    const hours = originalDate.getHours();
    const minutes = originalDate.getMinutes();

    const formattedDate = `${day} ${monthNames[monthIndex]} ${year} at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedDate
}

