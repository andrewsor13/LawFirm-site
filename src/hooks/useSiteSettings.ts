import { useAppContext } from "@/context/AppContext";

export function useSiteSettings() {
  const { siteSettings } = useAppContext();
  return { isActive: siteSettings?.blogMode ?? false };
}
