// next
import { useRouter } from 'next/router';
// @mui
import { Box, Container, Skeleton, Tab, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '@hooks/useSettings.tsx';
// layouts
import Layout from '@/layouts';
// components
import Page from '@components/Page.tsx';
import HeaderBreadcrumbs from '@components/HeaderBreadcrumbs.tsx';
// sections
import PharmacyNewEditForm from '@sections/@dashboard/pharmacy/PharmacyNewEditForm.tsx';
import useFetchSinglePharmacy from '@/react-query/pharmacy/useFetchSinglePharmacy.ts';
import { capitalCase } from 'change-case';
import useTabs from '@hooks/useTabs.tsx';
import Iconify from '@components/Iconify.tsx';
import { AccountBilling, AccountGeneral } from '@sections/@dashboard/user/account';
import { _userAddressBook, _userInvoices, _userPayment } from '@/_mock';
import { useMemo } from 'react';
import PharmacyEditSkeleton from '@pages/dashboard/pharmacy/edit/pharmacy-edit-skeleton.tsx';

// ----------------------------------------------------------------------

PharmacyEdit.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PharmacyEdit() {
  const { themeStretch } = useSettings();
  const { query } = useRouter();
  const { id } = query;
  const { data: pharmacy, isLoading } = useFetchSinglePharmacy(+id);
  const { currentTab, onChangeTab } = useTabs('general');

  const ACCOUNT_TABS = useMemo(
    () => [
      {
        value: 'general',
        icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
        component: isLoading ? <PharmacyEditSkeleton /> : <PharmacyNewEditForm isEdit currentPharmacy={pharmacy} />,
      },
      {
        value: 'billing',
        icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
        component: <AccountBilling cards={_userPayment} addressBook={_userAddressBook} invoices={_userInvoices} />,
      },
    ],
    [pharmacy]
  );
  return (
    <Page title="ویرایش داروخانه">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ویرایش داروخانه"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'داروخانه', href: PATH_DASHBOARD.pharmacy.list },
            { name: id.toString() },
          ]}
        />
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
