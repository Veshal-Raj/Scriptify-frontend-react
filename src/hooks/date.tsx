const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct','Nov','Dec']
const days = ['Sunday','Monday','Tuesday', 'Wednesday', 'Thrusday','Friday','Saturday']

export const getDay = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
};