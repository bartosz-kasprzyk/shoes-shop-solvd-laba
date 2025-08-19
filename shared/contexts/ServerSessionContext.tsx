'use client';

import type { Session } from 'next-auth';
import { createContext } from 'react';

export const ServerSessionContext = createContext<Session | null>(null);
