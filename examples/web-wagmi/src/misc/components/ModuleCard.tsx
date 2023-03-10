import { EnabledModuleFragment } from '@lens-protocol/react-web';

type ModuleCardProps = {
  module: EnabledModuleFragment;
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <article>
      <h3>{module.moduleName}</h3>
      <p>{`Address: ${module.contractAddress}`}</p>
    </article>
  );
}
