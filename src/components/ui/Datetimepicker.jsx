import React, { useEffect, useRef, useState } from "react";

const DateRangePicker = React.forwardRef(({ className, onApply, ...props }, ref) => {
  const inputRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeDateRangePicker = () => {
      if (inputRef.current && window.$ && window.moment) {
        $(inputRef.current).daterangepicker(
          {
            timePicker: true,
            startDate: moment().startOf("hour"),
            endDate: moment().startOf("hour").add(32, "hour"),
            locale: {
              format: "M/DD hh:mm A",
            },
          },
          function (start, end) {
            // Update the input field when date is selected
            $(inputRef.current).val(`${start.format("M/DD hh:mm A")} - ${end.format("M/DD hh:mm A")}`);
          }
        );

        // Attach the apply event listener
        $(inputRef.current).on("apply.daterangepicker", (event, picker) => {
          // Update input field UI when applied
          $(inputRef.current).val(`${picker.startDate.format("M/DD hh:mm A")} - ${picker.endDate.format("M/DD hh:mm A")}`);

          if (onApply) {
            onApply({
              startDate: picker.startDate,
              endDate: picker.endDate,
            });
          }
        });

        setIsLoaded(true);
      } else {
        setTimeout(initializeDateRangePicker, 100);
      }
    };

    initializeDateRangePicker();

    return () => {
      if (inputRef.current && window.$) {
        $(inputRef.current).daterangepicker("destroy");
      }
    };
  }, [onApply]);

  return (
    <div>
      <input
        type="text"
        name="datetimes"
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        readOnly
        placeholder="Select date and time range"
        className={`border border-gray-300 rounded-md p-2 w-full ${className || ""}`}
        {...props}
      />
      {!isLoaded && <p className="mt-2 text-sm text-gray-500">Loading date picker...</p>}
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";

export default DateRangePicker;
