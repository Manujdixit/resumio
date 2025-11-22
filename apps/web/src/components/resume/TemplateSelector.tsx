import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useResumeStore, type TemplateId } from "@/store/useResumeStore";
import { LayoutTemplate } from "lucide-react";

const templates: { id: TemplateId; name: string; description: string }[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional layout with good whitespace.",
  },
  {
    id: "sidebar",
    name: "Professional Sidebar",
    description: "Dark sidebar for contact info and skills.",
  },
  {
    id: "minimal",
    name: "Classic Minimal",
    description: "Simple, text-focused layout for traditional industries.",
  },
];

export function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Change Template
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Select Resume Template</DrawerTitle>
            <DrawerDescription>
              Choose a layout that best fits your style.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-8">
            <div className="grid gap-4">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant={
                    selectedTemplate === template.id ? "default" : "outline"
                  }
                  className="justify-start h-auto py-4 px-4"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="text-left">
                    <div className="font-semibold">{template.name}</div>
                    <div className="text-xs opacity-70">
                      {template.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
