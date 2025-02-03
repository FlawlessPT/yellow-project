import { TypographySpecification, TypographyType, TypographyTypeEnum } from './types';

export function getTypographySpecification(type: TypographyType): TypographySpecification {
  const typographySpecs: { [key: string]: TypographySpecification } = {
    [TypographyTypeEnum.H1]: { size: 30, lineHeight: 38 },
    [TypographyTypeEnum.H2]: { size: 26, lineHeight: 34 },
    [TypographyTypeEnum.H3]: { size: 22, lineHeight: 28 },
    [TypographyTypeEnum.H4]: { size: 18, lineHeight: 26 },
    [TypographyTypeEnum.H5]: { size: 16, lineHeight: 22 },
    [TypographyTypeEnum.Body]: { size: 14, lineHeight: 20 },
    [TypographyTypeEnum.Footnote]: { size: 12, lineHeight: 16 },
    [TypographyTypeEnum.Size10]: { size: 10, lineHeight: 12 },
  };

  return typographySpecs[type];
}
