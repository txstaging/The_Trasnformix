/** The site designs offered to the client side by side. All navbars list
    them under الرئيسية; once one design is chosen, delete the other version
    and drop this switch from the navbar that remains. */
export const HOME_VERSIONS = [
  { label: "Version 1", href: "/en" },
  { label: "Version 2", href: "/en/v2" },
  { label: "Version 3", href: "/en/v3" },
  { label: "Version 4", href: "/en/v4" },
] as const;
