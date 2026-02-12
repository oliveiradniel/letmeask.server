import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function envValidate<T extends object>(
  config: Record<string, unknown>,
  dtoClass: new (...args: any[]) => T,
): T {
  const validatedConfig = plainToInstance(dtoClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const messages = errors
      .map((error) => Object.values(error.constraints ?? {}).join(', '))
      .join('; ');

    throw new Error(`Environment validation failed: ${messages}`);
  }

  return validatedConfig;
}
