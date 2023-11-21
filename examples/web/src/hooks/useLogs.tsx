import { useState } from 'react';

export function useLogs() {
  const [logs, setLogs] = useState<string[]>([]);

  const clear = () => setLogs([]);

  const log = (message: string) => {
    setLogs((previous) => [...previous, message]);
  };

  return {
    logs,
    clear,
    log,
  };
}
