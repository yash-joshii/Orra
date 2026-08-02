import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";

const RentalDatePicker = ({
  startDate, endDate, setStartDate, setEndDate,
  startOpen, setStartOpen, endOpen, setEndOpen, rentalDays,
}) => {
  return(
  <div className="space-y-4">
    <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
      <CalendarDays className="w-5 h-5 text-indigo-600" /> Rental Dates
    </h3>

    <div className="date flex flex-row gap-4">
      <div className="w-1/2 space-y-1.5">
        <Field className="w-full">
          <FieldLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Start Date</FieldLabel>
          <Popover open={startOpen} onOpenChange={setStartOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-11 justify-between rounded-xl border-slate-200 bg-white font-semibold text-slate-800">
                {startDate ? startDate.toLocaleDateString("en-GB") : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate} onSelect={(date) => { setStartDate(date); setStartOpen(false); }} />
            </PopoverContent>
          </Popover>
        </Field>
      </div>

      <div className="w-1/2 space-y-1.5">
        <Field className="w-full">
          <FieldLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">End Date</FieldLabel>
          <Popover open={endOpen} onOpenChange={setEndOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-11 justify-between rounded-xl border-slate-200 bg-white font-semibold text-slate-800">
                {endDate ? endDate.toLocaleDateString("en-GB") : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate} onSelect={(date) => { setEndDate(date); setEndOpen(false); }} />
            </PopoverContent>
          </Popover>
        </Field>
      </div>
    </div>

    <div className="rental-days-left bg-indigo-50/60 rounded-xl p-3.5 border border-indigo-50">
      <span className="text-sm font-semibold text-indigo-700">Total rental duration: {rentalDays} days</span>
    </div>
  </div>)
};

export default RentalDatePicker;