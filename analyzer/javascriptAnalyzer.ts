import { parse } from "@babel/parser";

export interface AnalysisIssue {
    type: "syntax";
    message: string;
    line: number;
    column: number;
}

export function analyzeJavaScript(code: string): AnalysisIssue[] {
    const issues: AnalysisIssue [] = [];

    try {
        parse(code, {
            sourceType: 'unambiguos',
        });
    } catch (error) {
        if (error instanceof SyntaxError) {
            const parseError = error as SyntaxError & {
                loc?: {
                    line: number;
                    column: number;
                };
            };

            issues.push({
                type: 'syntax',
                message: parseError.message,
                line: parseError.loc?.line ?? 1,
                column: parseError.loc?.column ?? 0,
            });
        }
    }

    return issues;
}