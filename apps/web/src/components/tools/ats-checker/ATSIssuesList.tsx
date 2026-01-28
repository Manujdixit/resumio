import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ATSIssue } from "@/lib/ats/types";

interface ATSIssuesListProps {
  title: string;
  issues: ATSIssue[];
  score: number;
}

export const ATSIssuesList: React.FC<ATSIssuesListProps> = ({
  title,
  issues,
  score,
}) => {
  if (issues.length === 0) {
    return (
      <Card className="border-green-100 bg-green-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600 text-sm">
            Perfect! No issues found in this category.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort issues by severity
  const sortedIssues = [...issues].sort((a, b) => {
    const priority = { critical: 0, warning: 1, info: 2 };
    return priority[a.severity] - priority[b.severity];
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900">{title}</CardTitle>
          <Badge variant={score > 80 ? "default" : "secondary"}>
            Score: {score}/100
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {sortedIssues.map((issue, idx) => (
          <div
            key={`${issue.rule}-${idx}`}
            className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
          >
            <div className="shrink-0 pt-0.5">
              {issue.severity === "critical" && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              {issue.severity === "warning" && (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              )}
              {issue.severity === "info" && (
                <Info className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <div>
              <h4 className="mb-1 font-medium text-gray-900 text-sm">
                {issue.rule}
              </h4>
              <p className="mb-2 text-gray-600 text-sm">{issue.message}</p>
              {issue.fix && (
                <div className="text-blue-600 text-xs">
                  <span className="font-semibold">Tip: </span> {issue.fix}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
