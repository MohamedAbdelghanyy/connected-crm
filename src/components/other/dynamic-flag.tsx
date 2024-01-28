import * as CountryFlags from 'country-flag-icons/react/3x2';

type DynamicFlagProps = {
  isoCode: string;
} & React.ComponentProps<React.ComponentType<any>>;

export default function DynamicFlag({ isoCode, ...props }: DynamicFlagProps) {
  const FlagComponent = CountryFlags[isoCode as keyof typeof CountryFlags];
  return FlagComponent ? <FlagComponent {...props} /> : <></>;
}