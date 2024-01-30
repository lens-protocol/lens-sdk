import {
  Profile,
  ProfileReportReason,
  profileId,
  useProfile,
  useReportProfile,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { never } from '../utils';
import { ProfileCard } from './components/ProfileCard';

type ReportProfileFormProps = {
  profile: Profile;
};

function ReportProfileForm({ profile }: ReportProfileFormProps) {
  const { execute: report, loading } = useReportProfile();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const reason = (formData.get('reason') as ProfileReportReason | null) ?? never();
    const additionalComments = (formData.get('additionalComments') as string | null) ?? never();

    const result = await report({ profileId: profile.id, reason, additionalComments });

    if (result.isSuccess()) {
      alert('Profile reported!');
    }

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Report profile</h3>

      <div>
        <p>Why are you reporting this profile?</p>

        <select name="reason" disabled={loading}>
          <option value="">Select one</option>
          <optgroup label="Fraud">
            <option value={ProfileReportReason.IMPERSONATION}>Impersonation</option>
            <option value={ProfileReportReason.FRAUD_SOMETHING_ELSE}>Something else</option>
          </optgroup>
          <optgroup label="Spam">
            <option value={ProfileReportReason.REPETITIVE}>Repetitive</option>
            <option value={ProfileReportReason.SPAM_SOMETHING_ELSE}>Something else</option>
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

export function UseReportProfile() {
  const {
    data: profile,
    error,
    loading,
  } = useProfile({
    forProfileId: profileId('0x03'),
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useReportProfile</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        <div>
          <ProfileCard profile={profile} />
          <ReportProfileForm profile={profile} />
        </div>
      </RequireProfileSession>
    </div>
  );
}
