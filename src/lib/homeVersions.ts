/** The site designs offered to the client side by side. All navbars list
    them under الرئيسية; once one design is chosen, delete the other version
    and drop this switch from the navbar that remains. */
export const HOME_VERSIONS = [
  { label: "الرئيسية 1", href: "/" },
  { label: "الرئيسية 2", href: "/v2" },
  { label: "الرئيسية 3", href: "/v3" },
  { label: "الرئيسية 4", href: "/v4" },
] as const;
