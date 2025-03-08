export class Logger {
  info(key: string, message: any) {
    console.log(`[${key}]:`, message);
  }

  error(key: string, message: any) {
    console.log(`[${key}]:`, message);
  }
}
