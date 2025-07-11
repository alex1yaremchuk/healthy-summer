import { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { API_BASES } from './config';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function login() {
    const res = await fetch(`${API_BASES.user}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } else {
      alert(data.error);
    }
  }

  async function register() {
    const res = await fetch(`${API_BASES.user}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      alert('registered');
    } else {
      alert(data.error);
    }
  }

  return (
    <VStack spacing={4} mt={10} width="300px" mx="auto">
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={login}>Login</Button>
      <Button onClick={register}>Register</Button>
      {token && <Box wordBreak="break-all">Token: {token}</Box>}
    </VStack>
  );
}
