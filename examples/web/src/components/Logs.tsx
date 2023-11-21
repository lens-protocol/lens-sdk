import React from 'react';

export function Logs({ logs }: { logs: string[] }) {
  if (logs.length === 0) {
    return null;
  }
  return (
    <pre>
      {logs.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </pre>
  );
}
