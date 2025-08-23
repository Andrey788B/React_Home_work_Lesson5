"use client";

import { useState } from 'react';
import { Button, Radio } from '@mantine/core';
import { InputField } from './InputField';
import { IconAt } from '@tabler/icons-react';

interface SignupProps {
  onSubmit: (data: {
    name: string;
    nickname: string;
    email: string;
    gender: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export const Signup = ({ onSubmit }: SignupProps) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, nickname, email, gender, password, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Имя" placeholder="Введите имя" value={name} onChange={setName} required />
      <InputField
        label="Ник"
        placeholder="Введите ник"
        value={nickname}
        onChange={setNickname}
        required
        icon={<IconAt size="1rem" />}
      />
      <InputField label="Email" placeholder="Введите email" value={email} onChange={setEmail} type="email" required />
      
      <Radio.Group
        value={gender}
        onChange={setGender}
        label="Пол"
        required
        mt="md"
      >
        <Radio value="male" label="Мужской" />
        <Radio value="female" label="Женский" />
      </Radio.Group>

      <InputField label="Пароль" placeholder="Введите пароль" value={password} onChange={setPassword} type="password" required />
      <InputField label="Повторите пароль" placeholder="Повторите пароль" value={confirmPassword} onChange={setConfirmPassword} type="password" required />

      <Button type="submit" mt="md">Зарегистрироваться</Button>
    </form>
  );
};