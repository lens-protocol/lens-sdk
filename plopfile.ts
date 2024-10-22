import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('lib', {
    description: 'Generate a new library package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name (without scope):',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Package description:',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        base: 'templates/lib/',
        templateFiles: 'templates/lib/**',
      },
    ],
  });
}
