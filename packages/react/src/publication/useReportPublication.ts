import { AnyPublication } from '@lens-protocol/api-bindings';
import { ReportReason } from '@lens-protocol/domain/entities';
import { ReportPublicationRequest } from '@lens-protocol/domain/use-cases/publications';

import { Operation, useOperation } from '../helpers/operations';
import { useReportPublicationController } from './adapters/useReportPublicationController';

export { ReportReason };

export type UseReportPublicationArgs = {
  publication: AnyPublication;
};

export type ReportPublicationArgs = Pick<ReportPublicationRequest, 'additionalComments' | 'reason'>;

export type ReportPublicationOperation = Operation<void, never, [ReportPublicationArgs]>;

/**
 * Report a publication for a given reason.
 *
 * You MUST be authenticated via {@link useLogin} to use this hook.
 *
 * @category Publications
 * @group Hooks
 * @param args - {@link UseReportPublicationArgs}
 *
 * @example
 * Form to provide a reason and comments to report a publication.
 * ```tsx
 * function ReportPublicationForm({ publication }: ReportPublicationFormProps) {
 *   const { execute: report, isPending } = useReportPublication({ publication });
 *   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
 *     event.preventDefault();
 *
 *     const form = event.currentTarget;
 *
 *     const formData = new FormData(form);
 *     const reason = (formData.get('reason') as ReportReason | null) ?? never();
 *     const additionalComments = (formData.get('additionalComments') as string | null) ?? never();
 *
 *     const result = await report({ reason, additionalComments });
 *
 *     if (result.isSuccess()) {
 *       alert('Publication reported!');
 *     }
 *
 *     form.reset();
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <h3>Report publication</h3>
 *
 *       <div>
 *         <p>Why are you reporting this publication?</p>
 *
 *         <select name="reason" disabled={isPending}>
 *           <option value="">Select one</option>
 *           <optgroup label="Illegal">
 *             <option value={ReportReason.HARASSMENT}>Bullying or harassment</option>
 *             <option value={ReportReason.VIOLENCE}>Violence</option>
 *             <option value={ReportReason.SELF_HARM}>Self-harm or suicide</option>
 *             <option value={ReportReason.HATE_SPEECH}>Hate speech or symbols</option>
 *             <option value={ReportReason.DIRECT_THREAT}>Direct threat</option>
 *             <option value={ReportReason.ANIMAL_ABUSE}>Animal abuse</option>
 *           </optgroup>
 *           <optgroup label="Fraud">
 *             <option value={ReportReason.SCAM}>Scam</option>
 *             <option value={ReportReason.UNAUTHORIZED_SALE}>Sale of unauthorized or illegal goods</option>
 *             <option value={ReportReason.IMPERSONATION}>Impersonation</option>
 *           </optgroup>
 *           <optgroup label="Sensitive content">
 *             <option value={ReportReason.NUDITY}>Nudity or sexual activity</option>
 *             <option value={ReportReason.OFFENSIVE}>Offensive</option>
 *           </optgroup>
 *           <optgroup label="Spam">
 *             <option value={ReportReason.MISLEADING}>Misleading</option>
 *             <option value={ReportReason.MISUSE_HASHTAGS}>Misuse of hashtags</option>
 *             <option value={ReportReason.UNRELATED}>Unrelated</option>
 *             <option value={ReportReason.REPETITIVE}>Repetitive</option>
 *             <option value={ReportReason.FAKE_ENGAGEMENT}>Fake engagement</option>
 *             <option value={ReportReason.MANIPULATION_ALGO}>Algorithm manipulation</option>
 *             <option value={ReportReason.SOMETHING_ELSE}>Something else</option>
 *           </optgroup>
 *         </select>
 *       </div>
 *
 *       <div>
 *         <textarea
 *           name="additionalComments"
 *           rows={3}
 *           placeholder="Optional comment"
 *           disabled={isPending}
 *         />
 *       </div>
 *
 *       <button type="submit" disabled={isPending}>
 *         Report
 *       </button>
 *     </form>
 *   );
 * }
 * ```
 */

export function useReportPublication({
  publication,
}: UseReportPublicationArgs): ReportPublicationOperation {
  const reportPublication = useReportPublicationController();

  return useOperation(async ({ additionalComments, reason }: ReportPublicationArgs) =>
    reportPublication({
      additionalComments,
      reason,
      publicationId: publication.id,
    }),
  );
}
