import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ATSKeywordMatch } from "@/lib/ats/types";

interface ATSKeywordMatchProps {
  data: ATSKeywordMatch;
}

export const ATSKeywordMatchList: React.FC<ATSKeywordMatchProps> = ({
  data,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900">Keyword Analysis</CardTitle>
          <Badge variant={data.score > 70 ? "default" : "secondary"}>
            Match Score: {data.score}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="mb-3 font-medium text-gray-700 text-sm">
            Matched Keywords
          </h4>
          {data.matched.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.matched.map((word) => (
                <Badge
                  key={word}
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                >
                  <Check className="mr-1 h-3 w-3" /> {word}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">
              No significant keywords matched.
            </p>
          )}
        </div>

        <div>
          <h4 className="mb-3 font-medium text-gray-700 text-sm">
            Missing Keywords
          </h4>
          {data.missing.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.missing.map((word) => (
                <Badge
                  key={word}
                  variant="outline"
                  className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                >
                  <X className="mr-1 h-3 w-3" /> {word}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-green-600 text-sm">
              Great job! You've included all top keywords.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
