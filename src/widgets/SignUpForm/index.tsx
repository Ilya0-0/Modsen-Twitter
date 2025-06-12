'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { signup } from '~/features/auth/model/actions';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import TwitterLogo from '~/public/svg/twitter-logo.svg?react';
import { signUpSchema } from '~/schemas/signUpSchema';
import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import PrimaryInput from '~/shared/ui/Input/variants/PrimaryInput';
import { NotificationVariant } from '~/shared/ui/Notification/NotificationsProps.t';
import Select from '~/shared/ui/Select';
import { getDays, getMonths, getYears } from '~/shared/ui/Select/dateOptions';
import { SelectOption } from '~/shared/ui/Select/SelectOption';
import { addNotification } from '~/store/notificationsSlice';

import { yupResolver } from '@hookform/resolvers/yup';

import { formatPhoneNumber } from '../lib/formatPhone';
import styles from './styles.module.scss';

interface SignUpFormData {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

const PHONE_MASK_PREFIX = '+375(';

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      phoneNumber: PHONE_MASK_PREFIX,
    },
  });

  const phoneNumberValue = watch('phoneNumber');

  const {
    name,
    onBlur: rhfOnBlur,
    onChange: rhfOnChange,
  } = register('phoneNumber');

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

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const year = selectedYear.value;
      const month = String(selectedMonth.value).padStart(2, '0');
      const day = String(selectedDay.value).padStart(2, '0');
      const birthDateString = `${year}-${month}-${day}`;
      setValue('birthDate', birthDateString, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue('birthDate', '', { shouldValidate: true });
    }
  }, [selectedYear, selectedMonth, selectedDay, setValue]);

  const handlePhoneNumberChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const prevValue = phoneNumberValue;
      const newValue = input.value;

      let cursorPosition = input.selectionStart;

      if (!cursorPosition) return;

      if (
        !newValue.startsWith(PHONE_MASK_PREFIX) &&
        prevValue.startsWith(PHONE_MASK_PREFIX)
      ) {
        setValue('phoneNumber', PHONE_MASK_PREFIX);
        input.setSelectionRange(
          PHONE_MASK_PREFIX.length,
          PHONE_MASK_PREFIX.length
        );
        return;
      }

      const formattedValue = formatPhoneNumber(newValue, true);

      const diff = formattedValue.length - prevValue.length;
      if (diff > 0) {
        cursorPosition += diff;
      } else if (diff < 0) {
        if (prevValue.includes(')') && !formattedValue.includes(')')) {
          cursorPosition -= 1;
        }
      }

      if (cursorPosition < PHONE_MASK_PREFIX.length) {
        cursorPosition = PHONE_MASK_PREFIX.length;
      }

      setValue('phoneNumber', formattedValue, { shouldValidate: true });

      setTimeout(() => {
        if (input) {
          input.setSelectionRange(cursorPosition, cursorPosition);
        }
      }, 0);

      rhfOnChange(event);
    },
    [setValue, formatPhoneNumber, phoneNumberValue, rhfOnChange]
  );

  const handlePhoneNumberBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      rhfOnBlur(event);
    },
    [rhfOnBlur]
  );

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('birthDate', data.birthDate);

      const result = await signup(formData);

      if (result?.error) {
        dispatch(
          addNotification({
            type: NotificationVariant.Error,
            title: result.error.title,
            message: result.error.message,
          })
        );
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        return;
      }

      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error.message as string)
          : 'Unknown error';

      dispatch(
        addNotification({
          type: NotificationVariant.Error,
          title: 'Unexpected Error',
          message: errorMessage,
        })
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginContainer}>
        <TwitterLogo className={styles.logo} />
        <h1>Create an account</h1>
        <div className={styles.inputContainer}>
          <PrimaryInput
            placeholder="Name"
            type="text"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <PrimaryInput
            placeholder="Phone number"
            type="tel"
            autoComplete="tel"
            value={phoneNumberValue}
            name={name}
            onChange={handlePhoneNumberChange}
            onBlur={handlePhoneNumberBlur}
            error={errors.phoneNumber?.message}
          />
          <PrimaryInput
            placeholder="Email"
            type="email"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <PrimaryInput
            placeholder="Password"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PrimaryInput
            placeholder="Confirm password"
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </div>
        <Link className={styles.highlight} href="/auth/signup-main">
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
      </form>
    </>
  );
};

export default SignUpForm;
