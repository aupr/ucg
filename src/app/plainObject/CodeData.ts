import {SeparatorData} from './SeparatorData';

export class CodeData {
  codeType: string;
  caseType: string;
  includeChars: string;
  excludeChars: string;
  codeLength: number;
  codePrefix: string;
  codeSuffix: string;
  separator: SeparatorData[];
  headerText: string;
  footerText: string;
}
