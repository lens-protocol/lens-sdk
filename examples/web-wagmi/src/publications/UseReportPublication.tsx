import {
  useReportPublication,
  ReportReason,
  Comment,
  Mirror,
  Post,
  usePublication,
  publicationId,
} from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { never } from '../utils';
import { PublicationCard } from './components/PublicationCard';

type ReportPublicationFormProps = {
  publication: Comment | Mirror | Post;
};

function ReportPublicationForm({ publication }: ReportPublicationFormProps) {
  const { execute: report, isPending } = useReportPublication({ publication });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const reason = (formData.get('reason') as ReportReason | null) ?? never();
    const additionalComments = (formData.get('additionalComments') as string | null) ?? never();

    const result = await report({ reason, additionalComments });

    if (result.isSuccess()) {
      alert('Publication reported!');
    }

    form.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Report publication</h3>

      <div>
        <p>Why are you reporting this publication?</p>

        <select name="reason" disabled={isPending}>
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
          name="additionalComments"
          rows={3}
          placeholder="Optional comment"
          disabled={isPending}
        />
      </div>

      <button type="submit" disabled={isPending}>
        Report
      </button>
    </form>
  );
}

export function UseReportPublication() {
  const {
    data: publication,
    error,
    loading,
  } = usePublication({
    publicationId: publicationId('0x1b-0x0118'),
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useReportPublication</code>
      </h1>
      <div>
        <PublicationCard publication={publication} />

        <ReportPublicationForm publication={publication} />
      </div>
    </div>
  );
}
