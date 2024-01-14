import hljs from 'highlight.js';
declare global {
  interface Window {
    hljs?: typeof hljs;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_URL: string;
    }
  }
}

export {};
