import { Icons } from "@/components/other/icons";
import { useTheme } from "@/lib/theme-provider";
import { Box, styled } from "@mui/system";
import { HashLoader } from "react-spinners";

export default function AppLoading() {
  const theme = useTheme();
  const revColor = theme.theme == "light" ? "black" : "white";

  const LoadingContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
  });

  const IndicatorContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
  });

  const LoadingText = styled('div')({
    marginTop: '15px',
    marginBottom: '25px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: revColor,
  });

  return (
    <LoadingContainer>
      <div className="w-1/2 lg:w-[300px] md:w-[300px]">
        <div className="text-center pt-10 lg:pt-0">
          <Icons.logo
            className="mx-auto"
            width="75%"
            style={{ margin: "auto", marginBottom: "20px" }}
            color={revColor}
          />
        </div>
      </div>
      <LoadingText>Connected App</LoadingText>
      <IndicatorContainer>
        <HashLoader
          color={revColor}
          loading={true}
          size={40}
        />
      </IndicatorContainer>
    </LoadingContainer>
  );
}