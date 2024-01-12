// @mui
import { styled, Theme } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
//
import { NavListRoot } from './NavList';
import { OverrideProps } from '@mui/material/OverridableComponent';

// ----------------------------------------------------------------------

type ListSubheaderPropType = {
  theme?: Theme;
  children?: React.ReactNode;
};
export const ListSubheaderStyle = styled((props: ListSubheaderPropType) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type NavSectionVerticalPropTypes = {
  isCollapse: boolean;
  navConfig: any[];
};

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }: NavSectionVerticalPropTypes) {
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>
          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </List>
      ))}
    </Box>
  );
}
