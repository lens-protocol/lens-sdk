import {
  AnyPublication,
  PublicationReportReason,
  useExplorePublications,
  useReportPublication,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { never } from '../utils';

type ReportPublicationFormProps = {
  publication: AnyPublication;
};

function ReportPublicationForm({ publication }: ReportPublicationFormProps) {
  const { execute: report, loading } = useReportPublication();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const reason = (formData.get('reason') as PublicationReportReason | null) ?? never();
    const additionalComments = (formData.get('additionalComments') as string | null) ?? never();

    const result = await report({ publicationId: publication.id, reason, additionalComments });

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

        <select name="reason" disabled={loading}>
          <option value="">Select one</option>
          <optgroup label="Illegal">
            <option value={PublicationReportReason.HARASSMENT}>Bullying or harassment</option>
            <option value={PublicationReportReason.VIOLENCE}>Violence</option>
            <option value={PublicationReportReason.SELF_HARM}>Self-harm or suicide</option>
            <option value={PublicationReportReason.HATE_SPEECH}>Hate speech or symbols</option>
            <option value={PublicationReportReason.DIRECT_THREAT}>Direct threat</option>
            <option value={PublicationReportReason.ANIMAL_ABUSE}>Animal abuse</option>
          </optgroup>
          <optgroup label="Fraud">
            <option value={PublicationReportReason.SCAM}>Scam</option>
            <option value={PublicationReportReason.UNAUTHORIZED_SALE}>
              Sale of unauthorized or illegal goods
            </option>
            <option value={PublicationReportReason.IMPERSONATION}>Impersonation</option>
          </optgroup>
          <optgroup label="Sensitive content">
            <option value={PublicationReportReason.NUDITY}>Nudity or sexual activity</option>
            <option value={PublicationReportReason.OFFENSIVE}>Offensive</option>
          </optgroup>
          <optgroup label="Spam">
            <option value={PublicationReportReason.MISLEADING}>Misleading</option>
            <option value={PublicationReportReason.MISUSE_HASHTAGS}>Misuse of hashtags</option>
            <option value={PublicationReportReason.UNRELATED}>Unrelated</option>
            <option value={PublicationReportReason.REPETITIVE}>Repetitive</option>
            <option value={PublicationReportReason.FAKE_ENGAGEMENT}>Fake engagement</option>
            <option value={PublicationReportReason.MANIPULATION_ALGO}>
              Algorithm manipulation
            </option>
            <option value={PublicationReportReason.SOMETHING_ELSE}>Something else</option>
          </optgroup>
        </select>
      </div>

      <div>
        <textarea
          name="additionalComments"
          rows={3}
          placeholder="Optional comment"
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading}>
        Report
      </button>
    </form>
  );
}

export function UseReportPublication() {
  const { data: publications, error, loading } = useExplorePublications();

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useReportPublication</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        <div>
          <PublicationCard publication={publications[0]} />
          <ReportPublicationForm publication={publications[0]} />
        </div>
      </RequireProfileSession>
    </div>
  );
}
