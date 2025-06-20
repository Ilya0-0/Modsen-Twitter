import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { getDays, getMonths, getYears } from '~/shared/ui/Select/dateOptions';
import { SelectOption } from '~/shared/ui/Select/SelectOption';

export const useDatePicker = (name: string) => {
  const { setValue } = useFormContext();
  const [selectedMonth, setSelectedMonth] =
    useState<SelectOption<number> | null>(
      getMonths().find((m) => m.value === 1) || null
    );
  const [selectedYear, setSelectedYear] = useState<SelectOption<number> | null>(
    getYears()[0] || null
  );
  const [selectedDay, setSelectedDay] = useState<SelectOption<number> | null>(
    null
  );
  const [availableDays, setAvailableDays] = useState<SelectOption<number>[]>(
    []
  );

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const days = getDays(selectedMonth.value, selectedYear.value);
      setAvailableDays(days);
      if (!selectedDay || selectedDay.value > days.length) {
        setSelectedDay(days.find((d) => d.value === 1) || null);
      }
    } else {
      setAvailableDays([]);
      setSelectedDay(null);
    }
  }, [selectedMonth, selectedYear, selectedDay]);

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const year = selectedYear.value;
      const month = String(selectedMonth.value).padStart(2, '0');
      const day = String(selectedDay.value).padStart(2, '0');
      const birthDateString = `${year}-${month}-${day}`;
      setValue(name, birthDateString, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue(name, '', { shouldValidate: true });
    }
  }, [selectedYear, selectedMonth, selectedDay, setValue, name]);

  return {
    selectedMonth,
    setSelectedMonth,
    selectedDay,
    setSelectedDay,
    selectedYear,
    setSelectedYear,
    availableDays,
  };
};
