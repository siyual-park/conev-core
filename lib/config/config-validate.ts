import ValidateError from '../error/validate-error';

export default function configValidate(config: object, parentKey = ''): void {
  Object.entries(config).forEach(([key, value]) => {
    if (value === undefined) throw new ValidateError(`Value ${parentKey}${key} is undefined.`);
    if (typeof value === 'object' && value !== null) configValidate(value, `${parentKey}${key}.`);
  });
}
