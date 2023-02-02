import { useReportPublication, ReportReason } from '@lens-protocol/react';
import { useState } from 'react';

import { invariant } from '../utils';

export function UseReportPublication() {
  const [inputPublicationId, setInputPublicationId] = useState('0x15-0x0271');
  const [inputReason, setInputReason] = useState<ReportReason | ''>('');
  const [additionalComments, setAdditionalComments] = useState<string>();

  const { report, isPending } = useReportPublication();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    invariant(inputReason, 'Report reason not defined');

    await report({
      publicationId: inputPublicationId,
      reason: inputReason,
      additionalComments: additionalComments || null,
    });

    setInputReason('');
    setAdditionalComments('');
  };

  return (
    <div>
      <h1>
        <code>useReportPublication</code>
      </h1>
      <div>
        <label htmlFor="publicationId">Publication ID</label>
        <input
          id="publicationId"
          value={inputPublicationId}
          onChange={(event) => setInputPublicationId(event.target.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Report publication</h3>

        <div>
          <p>Why are you reporting this publication?</p>

          <select
            value={inputReason}
            onChange={(event) => setInputReason(event.target.value as ReportReason)}
            disabled={isPending}
          >
            <option value="">Select one</option>
            <optgroup label="Illegal">
              <option value={ReportReason.HARASSMENT}>Bullying or harassment</option>
              <option value={ReportReason.VIOLENCE}>Violence</option>
              <option value={ReportReason.SELF_HARM}>Self-harm or suicide</option>
              <option value={ReportReason.HATE_SPEECH}>Hate speech or symbols</option>
              <option value={ReportReason.DIRECT_THREAT}>Direct threat</option>
              <option value={ReportReason.ANIMAL_ABUSE}>Animal abuse</option>
            </optgroup>
            <optgroup label="Fraud">
              <option value={ReportReason.SCAM}>Scam</option>
              <option value={ReportReason.UNAUTHORIZED_SALE}>
                Sale of unauthorized or illegal goods
              </option>
              <option value={ReportReason.IMPERSONATION}>Impersonation</option>
            </optgroup>
            <optgroup label="Sensitive content">
              <option value={ReportReason.NUDITY}>Nudity or sexual activity</option>
              <option value={ReportReason.OFFENSIVE}>Offensive</option>
            </optgroup>
            <optgroup label="Spam">
              <option value={ReportReason.MISLEADING}>Misleading</option>
              <option value={ReportReason.MISUSE_HASHTAGS}>Misuse of hashtags</option>
              <option value={ReportReason.UNRELATED}>Unrelated</option>
              <option value={ReportReason.REPETITIVE}>Repetitive</option>
              <option value={ReportReason.FAKE_ENGAGEMENT}>Fake engagement</option>
              <option value={ReportReason.MANIPULATION_ALGO}>Algorithm manipulation</option>
              <option value={ReportReason.SOMETHING_ELSE}>Something else</option>
            </optgroup>
          </select>
        </div>

        <div>
          <textarea
            rows={3}
            placeholder="Optional comment"
            disabled={inputReason === '' || isPending}
            onChange={(event) => setAdditionalComments(event.target.value)}
            value={additionalComments}
          />
        </div>

        <button disabled={inputReason === '' || isPending}>Report</button>
      </form>
    </div>
  );
}
