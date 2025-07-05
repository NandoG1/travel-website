"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { useQuery } from "@tanstack/react-query"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Function to fetch reservation data for the chart
const fetchReservationData = async () => {
  const response = await fetch('/api/admin/reservations')
  if (!response.ok) throw new Error('Failed to fetch reservations')
  return response.json()
}

// Function to process reservation data for the chart
const processReservationData = (reservations: any[]) => {
  const last7Days = []
  const today = new Date()
  
  // Generate last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    last7Days.push({
      date: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { weekday: 'short' })
    })
  }
  
  // Calculate daily revenue based on reservation start dates
  const dailyRevenue = last7Days.map(day => {
    const dayReservations = reservations.filter(reservation => {
      const reservationDate = new Date(reservation.startDate).toISOString().split('T')[0]
      return reservationDate === day.date
    })
    
    const totalRevenue = dayReservations.reduce((sum, reservation) => {
      return sum + (reservation.daysDifference * reservation.listing.pricePerNight)
    }, 0)
    
    return {
      label: day.label,
      revenue: totalRevenue,
      bookings: dayReservations.length
    }
  })
  
  return dailyRevenue
}

const Chart = () => {
  const [chartData, setChartData] = useState<{
    labels?: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    datasets: []
  })
  const [chartOptions, setChartOptions] = useState({})

  // Fetch real reservation data
  const { data: reservations, isLoading, error } = useQuery({
    queryKey: ['admin-reservations-chart'],
    queryFn: fetchReservationData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  useEffect(() => {
    if (reservations) {
      const processedData = processReservationData(reservations)
      
      setChartData({
        labels: processedData.map(day => day.label),
        datasets: [
          {
            label: "Daily Revenue ($)",
            data: processedData.map(day => day.revenue),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.6)"
          },
          {
            label: "Bookings Count",
            data: processedData.map(day => day.bookings * 1000), // Scale up for visibility
            borderColor: "rgb(16, 185, 129)",
            backgroundColor: "rgba(16, 185, 129, 0.6)"
          }
        ]
      })
    } else {
      // Fallback data while loading or if no data
      setChartData({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Revenue ($)",
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.6)"
          }
        ]
      })
    }

    setChartOptions({
      plugins: {
        legend: {
          position: "top" as const
        },
        title: {
          display: true,
          text: "Last 7 Days - Revenue & Bookings"
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              if (context.datasetIndex === 0) {
                return `Revenue: $${context.parsed.y.toLocaleString()}`
              } else {
                return `Bookings: ${Math.round(context.parsed.y / 1000)}`
              }
            }
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              if (typeof value === 'number') {
                return '$' + value.toLocaleString()
              }
              return value
            }
          }
        }
      }
    })
  }, [reservations])

  return (
    <div className="h-[525px] col-span-5">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-red-500 mb-2">Failed to load chart data</p>
            <p className="text-gray-500 text-sm">Please try refreshing the page</p>
          </div>
        </div>
      ) : (
        <Bar
          data={chartData}
          options={chartOptions}
        />
      )}
    </div>
  )
}

export default Chart