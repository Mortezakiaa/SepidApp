// components
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
import { PATH_AFTER_LOGIN } from '@/config';
// routes

// ----------------------------------------------------------------------

export default function HomePage() {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    replace(PATH_AFTER_LOGIN);
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
  }, []);

  return null;
}

// export default function HomePage() {
//   return (
//     <Page title="The starting point for your next project">
//       <RootStyle>
//         <HomeHero />
//         <ContentStyle>
//           <HomeMinimal />

//           <HomeHugePackElements />

//           <HomeDarkMode />

//           <HomeColorPresets />

//           <HomeCleanInterfaces />

//           <HomePricingPlans />

//           <HomeLookingFor />

//           <HomeAdvertisement />
//         </ContentStyle>
//       </RootStyle>
//     </Page>
//   );
// }
