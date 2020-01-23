
interface Date {
  date: string;
  dateTime: string;
}

const dateToFin = (date: String) => (
  String(parseInt(date.substring(8, 10))) + "." + String(parseInt(date.substring(5, 7))) + "." + date.substring(0, 4)
)

const parseDate = (start: Date) => {
  if (start.date) {
    return dateToFin(start.date)
  }
  const splitted = start.dateTime.split('T')
  const date = dateToFin(splitted[0])
  const time = splitted[1].substring(0, 5)
  return `${date} ${time}`
}

const getBeerDates = () => {
  const date = new Date()
  const day = date.getDay()
  const days = [5, 6, 12, 13].map(d => d - day)
  return days.map((d) => {
    const today = new Date()
    const beerDate = new Date(today.setDate(today.getDate() + d))
    return `/milloin ${beerDate.toISOString().split('T')[0]}`
  })
}

export default {
  parseDate,
  getBeerDates
}