import type { ResumeType } from "@/lib/schemas/ResumeSchema";
import { MinimalTemplatePdf } from "./pdf/MinimalTemplatePdf";
import { ModernTemplatePdf } from "./pdf/ModernTemplatePdf";
import { SidebarTemplatePdf } from "./pdf/SidebarTemplatePdf";

export type TemplateId = "modern" | "sidebar" | "minimal";

export const getPdfTemplate = (templateId: TemplateId, data: ResumeType) => {
  switch (templateId) {
    case "modern":
      return <ModernTemplatePdf data={data} />;
    case "sidebar":
      return <SidebarTemplatePdf data={data} />;
    case "minimal":
      return <MinimalTemplatePdf data={data} />;
    default:
      return <ModernTemplatePdf data={data} />;
  }
};
