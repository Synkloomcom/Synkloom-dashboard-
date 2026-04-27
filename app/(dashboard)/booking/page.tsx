"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, User, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  { id: "general", name: "General Inquiry", duration: "15 min", icon: "📋" },
  { id: "account", name: "Account Services", duration: "20 min", icon: "👤" },
  { id: "technical", name: "Technical Support", duration: "30 min", icon: "🔧" },
  { id: "consultation", name: "Consultation", duration: "45 min", icon: "💼" },
]

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
]

const locations = [
  { id: "main", name: "Main Branch", address: "123 Business Center, Floor 2" },
  { id: "downtown", name: "Downtown Office", address: "456 Central Avenue, Suite 100" },
  { id: "west", name: "West Side Center", address: "789 Western Blvd, Building A" },
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" })
  const [isBooked, setIsBooked] = useState(false)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const handleBook = () => {
    setIsBooked(true)
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedLocation(null)
    setFormData({ name: "", email: "", phone: "", notes: "" })
    setIsBooked(false)
  }

  if (isBooked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="glass rounded-2xl p-8 text-center max-w-md animate-count-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
          </p>
          <div className="bg-secondary/30 rounded-xl p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Service:</span> <span className="text-foreground font-medium">{services.find(s => s.id === selectedService)?.name}</span></p>
              <p><span className="text-muted-foreground">Date:</span> <span className="text-foreground font-medium">{selectedDate?.toLocaleDateString()}</span></p>
              <p><span className="text-muted-foreground">Time:</span> <span className="text-foreground font-medium">{selectedTime}</span></p>
              <p><span className="text-muted-foreground">Location:</span> <span className="text-foreground font-medium">{locations.find(l => l.id === selectedLocation)?.name}</span></p>
            </div>
          </div>
          <button
            onClick={resetBooking}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Book an Appointment</h1>
        <p className="text-muted-foreground">Schedule your visit in a few simple steps</p>
      </div>

      {/* Progress Steps */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          {["Select Service", "Choose Date & Time", "Select Location", "Your Details"].map((label, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                  step > index + 1 ? "bg-emerald-500 text-white" :
                  step === index + 1 ? "bg-gradient-to-r from-primary to-accent text-primary-foreground glow-primary" :
                  "bg-secondary/50 text-muted-foreground"
                )}>
                  {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className={cn(
                  "font-medium hidden md:block",
                  step >= index + 1 ? "text-foreground" : "text-muted-foreground"
                )}>{label}</span>
              </div>
              {index < 3 && (
                <div className={cn(
                  "flex-1 h-1 mx-4 rounded-full",
                  step > index + 1 ? "bg-emerald-500" : "bg-secondary/50"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="glass rounded-2xl p-6">
        {/* Step 1: Select Service */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Select a Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    "p-6 rounded-xl text-left transition-all",
                    selectedService === service.id
                      ? "bg-primary/20 border-2 border-primary glow-primary"
                      : "bg-secondary/30 border-2 border-transparent hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{service.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground">{service.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => selectedService && setStep(2)}
                disabled={!selectedService}
                className={cn(
                  "px-8 py-3 rounded-xl font-medium transition-all",
                  selectedService
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                    : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                )}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Choose Date & Time</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">
                    {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-foreground" />
                    </button>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="text-sm text-muted-foreground py-2">{day}</div>
                  ))}
                  {getDaysInMonth(currentMonth).map((date, i) => (
                    <button
                      key={i}
                      onClick={() => date && !isPast(date) && setSelectedDate(date)}
                      disabled={!date || isPast(date)}
                      className={cn(
                        "py-2 rounded-lg text-sm transition-all",
                        !date && "invisible",
                        date && isPast(date) && "text-muted-foreground/50 cursor-not-allowed",
                        date && !isPast(date) && selectedDate?.toDateString() === date.toDateString()
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                          : date && !isPast(date) && isToday(date)
                          ? "bg-primary/20 text-foreground"
                          : date && !isPast(date) && "hover:bg-secondary/50 text-foreground"
                      )}
                    >
                      {date?.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Available Time Slots</h3>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "p-3 rounded-xl text-sm font-medium transition-all",
                        selectedTime === time
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                          : "bg-secondary/30 text-foreground hover:bg-secondary/50"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-3 rounded-xl font-medium bg-secondary/50 text-foreground hover:bg-secondary/70 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => selectedDate && selectedTime && setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className={cn(
                  "px-8 py-3 rounded-xl font-medium transition-all",
                  selectedDate && selectedTime
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                    : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                )}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Select Location</h2>
            <div className="space-y-4">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={cn(
                    "w-full p-6 rounded-xl text-left transition-all",
                    selectedLocation === location.id
                      ? "bg-primary/20 border-2 border-primary glow-primary"
                      : "bg-secondary/30 border-2 border-transparent hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/20">
                      <MapPin className="w-6 h-6 text-primary dark:text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{location.name}</p>
                      <p className="text-sm text-muted-foreground">{location.address}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 rounded-xl font-medium bg-secondary/50 text-foreground hover:bg-secondary/70 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => selectedLocation && setStep(4)}
                disabled={!selectedLocation}
                className={cn(
                  "px-8 py-3 rounded-xl font-medium transition-all",
                  selectedLocation
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                    : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                )}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Details */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                  placeholder="Any special requirements..."
                />
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 p-6 rounded-xl bg-secondary/30">
              <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Service</p>
                  <p className="font-medium text-foreground">{services.find(s => s.id === selectedService)?.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{selectedDate?.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">{selectedTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{locations.find(l => l.id === selectedLocation)?.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-8 py-3 rounded-xl font-medium bg-secondary/50 text-foreground hover:bg-secondary/70 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleBook}
                disabled={!formData.name || !formData.email || !formData.phone}
                className={cn(
                  "px-8 py-3 rounded-xl font-medium transition-all",
                  formData.name && formData.email && formData.phone
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                    : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                )}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
