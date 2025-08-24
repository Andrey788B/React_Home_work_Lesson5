import { TextInput } from '@mantine/core';
import type { ReactNode } from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  icon?: ReactNode;
  error?: string;
}

export const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  icon,
  error,
}: InputFieldProps) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      type={type}
      required={required}
      icon={icon}
      error={error}
    />
  );
};