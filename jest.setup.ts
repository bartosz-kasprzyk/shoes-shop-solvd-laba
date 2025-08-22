import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { loadEnvConfig } from '@next/env';
import { TextEncoder, TextDecoder } from 'util';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;
