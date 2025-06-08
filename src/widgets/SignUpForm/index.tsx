'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import PrimaryInput from '~/shared/ui/Input/variants/PrimaryInput';
import Select from '~/shared/ui/Select';
import { getDays, getMonths, getYears } from '~/shared/ui/Select/dateOptions';
import { SelectOption } from '~/shared/ui/Select/SelectOption';

import TwitterLogo from '/public/svg/twitter-logo.svg?react';

import styles from './styles.module.scss';

const SignUpForm = () => {
  const monthOptions = getMonths();
  const yearOptions = getYears();

  const [selectedMonth, setSelectedMonth] =
    useState<SelectOption<number> | null>(
      monthOptions.find((m) => m.value === 1) || null
    );
  const [selectedYear, setSelectedYear] = useState<SelectOption<number> | null>(
    yearOptions[0] || null
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

  return (
    <section className={styles.loginContainer}>
      <TwitterLogo className={styles.logo} />
      <h1>Create an account</h1>
      <div className={styles.inputContainer}>
        <PrimaryInput
          placeholder="Name"
          type="text"
          name="name"
          autoComplete="name"
          error="Name reuired"
          required
        />
        <PrimaryInput
          placeholder="Phone number"
          type="tel"
          name="phoneNumber"
          autoComplete="tel"
          required
        />
        <PrimaryInput
          placeholder="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
        <PrimaryInput
          placeholder="Password"
          type="password"
          name="password"
          required
          minLength={8}
        />
        <PrimaryInput
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          required
          minLength={8}
        />
      </div>
      <Link className={styles.highlight} href="/signup-main">
        Use Google
      </Link>
      <h3>Date of birth</h3>
      <p className={styles.rules}>
        Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit.
        Quis bibendum ante phasellus metus, magna lacinia sed augue. Odio enim
        nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra
        dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
      </p>
      <div className={styles.dobContainer}>
        <Select
          selected={selectedMonth}
          options={monthOptions}
          onChange={setSelectedMonth}
        />
        <Select
          selected={selectedDay}
          options={availableDays}
          onChange={setSelectedDay}
        />
        <Select
          selected={selectedYear}
          options={yearOptions}
          onChange={setSelectedYear}
        />
      </div>
      <PrimaryButton>Next</PrimaryButton>
    </section>
  );
};

export default SignUpForm;
