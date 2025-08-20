import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('lib', {
    description: 'Generate a new package',
    prompts: [
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template:',
        choices: [
          { name: 'Library', value: { name: 'lib', dest: 'packages' } },
          {
            name: 'React Example',
            value: { name: 'example-react', dest: 'examples' },
          },
        ],
      },
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
        destination: '{{template.dest}}/{{name}}',
        base: 'templates/{{template.name}}/',
        templateFiles: 'templates/{{template.name}}/**',
      },
    ],
  });
}
