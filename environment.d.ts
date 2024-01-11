import hljs from 'highlight.js';
declare global {
  interface Window {
    hljs?: typeof hljs;
  }
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
    }
  }
}
export {};
