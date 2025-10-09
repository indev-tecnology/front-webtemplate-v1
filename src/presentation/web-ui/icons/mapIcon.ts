import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Map a string name to a lucide-react icon component.
// Returns a fallback icon (Activity) when name is not found.
export function mapIcon(name?: string): LucideIcon {
  if (!name) return Icons.Activity as unknown as LucideIcon;
  const Icon = (Icons as any)[name];
  return (Icon ?? Icons.Activity) as LucideIcon;
}

export default mapIcon;
