import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Box,
  CableIcon,
  CalendarClockIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  CreditCard,
  CreditCardIcon,
  File,
  FileHeartIcon,
  FileLock2Icon,
  FileQuestionIcon,
  FileText,
  FileType2,
  Flashlight,
  GlobeIcon,
  Grid,
  HeartIcon,
  HelpCircle,
  Image,
  LanguagesIcon,
  Laptop,
  LayoutList,
  LayoutPanelTopIcon,
  Loader2,
  LucideProps,
  MailIcon,
  MapPinIcon,
  MedalIcon,
  MessageCircleIcon,
  Moon,
  MoreVertical,
  PhoneCallIcon,
  Pizza,
  Plus,
  ScrollTextIcon,
  Settings,
  ShieldCheckIcon,
  StickyNoteIcon,
  SunMedium,
  Tags,
  ThumbsUpIcon,
  Trash,
  Twitter,
  UploadIcon,
  User,
  Workflow,
  X,
  Zap,
  type IconNode as LucideIcon,
  Package,
  Trash2,
  BanknoteIcon,
  FlagIcon,
  Edit,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: ({ width, height, style, color }: LucideProps) => (
    <svg id="svg" xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={style}
      viewBox="0, 0, 400,400">
      <g id="svgg">
        <path id="path0" d="M188.374 3.688 C 76.090 9.420,-6.577 108.693,5.593 223.186 C 16.016 321.236,95.520 395.115,193.174 397.495 C 255.598 399.017,304.188 376.987,350.460 326.187 L 351.943 324.558 351.440 324.071 C 350.678 323.334,316.677 291.464,316.361 291.191 C 316.089 290.955,316.032 291.007,310.260 296.784 C 278.103 328.965,245.450 344.938,207.750 346.928 C 131.923 350.931,68.817 292.711,62.730 213.136 C 55.252 115.378,129.883 40.302,219.886 55.044 C 250.675 60.087,276.147 74.662,305.681 104.137 C 309.791 108.238,311.710 110.068,311.823 109.993 C 312.147 109.780,348.900 70.787,348.900 70.657 C 348.900 70.066,336.401 57.844,330.441 52.605 C 295.330 21.750,258.953 6.898,210.903 3.799 C 208.053 3.616,191.405 3.533,188.374 3.688 M201.511 89.021 C 146.357 90.350,101.361 132.823,95.769 188.834 C 89.222 254.398,137.775 310.138,202.430 311.286 C 232.217 311.815,256.457 302.772,278.686 282.839 C 282.520 279.402,291.342 270.367,291.157 270.067 C 291.101 269.977,273.641 253.561,271.415 251.507 L 270.975 251.100 269.051 253.085 C 249.704 273.039,228.953 282.823,205.977 282.823 C 160.253 282.823,125.407 243.643,127.934 195.074 C 130.520 145.397,170.014 110.880,216.094 118.024 C 233.525 120.727,248.177 128.994,264.822 145.518 C 268.352 149.022,268.574 149.218,268.780 149.000 C 268.899 148.872,273.616 143.874,279.261 137.892 C 284.905 131.910,289.524 126.956,289.524 126.882 C 289.524 126.808,288.297 125.504,286.798 123.984 C 265.505 102.396,243.209 91.677,214.845 89.393 C 212.342 89.191,205.155 88.914,203.678 88.962 C 203.245 88.977,202.269 89.003,201.511 89.021 M206.700 159.611 C 180.448 162.235,162.327 186.501,167.367 212.282 C 170.874 230.217,185.266 244.250,203.271 247.290 C 234.044 252.485,260.268 225.383,254.120 194.739 C 250.693 177.660,236.965 163.883,219.901 160.397 C 216.034 159.607,210.211 159.261,206.700 159.611 "
          stroke="none"
          fill={color ? color : "#fff"}
          fillRule="evenodd">
        </path>
      </g>
    </svg>
  ),
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  delete: Trash2,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  customers: User,
  merchants: User,
  inventory: Package,
  products: LayoutList,
  categories: Grid,
  highlights: Flashlight,
  brands: Box,
  tags: Tags,
  topics: FileText,
  locations: MapPinIcon,
  ads: Zap,
  advertisers: User,
  wishlists: FileHeartIcon,
  notifications: BellRing,
  integrations: Workflow,
  leads: CableIcon,
  requests: MailIcon,
  subscriptions: CreditCardIcon,
  calls: PhoneCallIcon,
  appointments: CalendarClockIcon,
  internalNotes: StickyNoteIcon,
  whatsapp: MessageCircleIcon,
  topActiveCustomers: MedalIcon,
  mostLikedItems: ThumbsUpIcon,
  mostWishlistedItems: HeartIcon,
  currencies: BanknoteIcon,
  countries: FlagIcon,
  organizationUnits: LayoutPanelTopIcon,
  roles: ShieldCheckIcon,
  users: User,
  claimTypes: FileQuestionIcon,
  securityLogs: FileLock2Icon,
  textTemplates: FileType2,
  auditLogs: ScrollTextIcon,
  developers: Code2,
  languages: GlobeIcon,
  languageTexts: LanguagesIcon,
  uploadFile: UploadIcon,
  edit: Edit,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check,
}
