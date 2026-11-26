import { AppWindow, BrainCircuit, CodeXml, Layers, Server, Workflow, type LucideIcon } from "lucide-react";
import type { ServiceIconName } from "@/types";

const icons: Record<ServiceIconName, LucideIcon> = {
  layers: Layers,
  "app-window": AppWindow,
  "brain-circuit": BrainCircuit,
  workflow: Workflow,
  server: Server,
  "code-xml": CodeXml,
};

export function ServiceIcon({ name, className = "size-6" }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden className={className} />;
}
