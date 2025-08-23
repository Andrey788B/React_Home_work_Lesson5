import { useState } from 'react';
import { Button } from '@mantine/core';
import { InputField } from './InputField';

interface SigninProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const Signin = ({ onSubmit }: SigninProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email"
        placeholder="Введите email"
        value={email}
        onChange={setEmail}
        type="email"
        required
      />
      <InputField
        label="Пароль"
        placeholder="Введите пароль"
        value={password}
        onChange={setPassword}
        type="password"
        required
      />
      <Button type="submit" mt="md">Войти</Button>
    </form>
  );
};
