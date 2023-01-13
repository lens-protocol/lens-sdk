import { useReportPublication, ReportReason, ReportState } from '@lens-protocol/react';
import { ChangeEvent, useState } from 'react';

import { invariant, never } from '../utils';

function reportStateToText(state: ReportState): string {
  switch (state) {
    case ReportState.PREPARING:
      return 'Preparing';
    case ReportState.REPORTING:
      return 'Reporting';
    case ReportState.REPORTED:
      return 'Reported';
    case ReportState.ALREADY_REPORTED:
      return 'Already Reported';
    case ReportState.FAILED:
      return 'Failed';
    default:
      never("Can't infer report state type");
  }
}

export function UseReportPublication() {
  const [inputPublicationId, setInputInputPublicationId] = useState('0x15-0x0271');
  const [inputReason, setInputReason] = useState<ReportReason | ''>('');

  const { report, state } = useReportPublication();

  const handlePublicationIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputInputPublicationId(e.target.value);
  };

  const handleReasonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputReason(e.target.value as ReportReason);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    invariant(inputReason, 'Report reason not defined');

    await report({
      publicationId: inputPublicationId,
      reason: inputReason,
      additionalComments: null,
    });
  };

  return (
    <div>
      <h1>
        <code>useReportPublication</code>
      </h1>
      <div>
        <label htmlFor="publicationId">Publication ID</label>
        <input id="publicationId" value={inputPublicationId} onChange={handlePublicationIdChange} />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Report publication</h3>

        <div>
          <p>Why are you reporting this publication?</p>

          <select value={inputReason} onChange={handleReasonChange}>
            <option value="" disabled={true}>
              Select one
            </option>
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

        <button disabled={inputReason === ''}>Report</button>
        <p>Report state: {reportStateToText(state)}</p>
      </form>
    </div>
  );
}
