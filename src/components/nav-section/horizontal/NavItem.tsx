import { ForwardedRef, forwardRef } from 'react';
// next

// @mui
import { Box, Link } from '@mui/material';
// config
import { ICON } from '../../../config';
//
import Iconify from '../../Iconify';
import { ListItemStyle } from './style';
import { isExternalLink } from '..';

// ----------------------------------------------------------------------

export const NavItemRoot = forwardRef(({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <ListItemStyle ref={ref} open={open} activeRoot={active} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      <NavItemContent icon={icon} title={title} children={children} />
    </ListItemStyle>
  ) : (
    <Link href={path}>
      <ListItemStyle activeRoot={active}>
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    </Link>
  );
});

type NavItemRootPropTypes = {
  active: boolean;
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  item: {
    children: any[];
    icon: any;
    path: string;
    title: string;
  };
};

// ----------------------------------------------------------------------

export const NavItemSub = forwardRef(
  ({ item, active, open, onMouseEnter, onMouseLeave }: NavItemRootPropTypes, ref: ForwardedRef<null>) => {
    const { title, path, icon, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent icon={icon} title={title} children={children} subItem />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle subItem href={path} disableRipple rel="noopener" target="_blank" component={Link}>
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    ) : (
      <Link href={path}>
        <ListItemStyle disableRipple activeSub={active} subItem>
          <NavItemContent icon={icon} title={title} children={children} subItem />
        </ListItemStyle>
      </Link>
    );
  }
);

type NavItemSubPropTypes = {
  active: boolean;
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  item: {
    children: any[];
    icon: any;
    path: string;
    title: string;
  };
};

// ----------------------------------------------------------------------

type propsType = {
  children?: [];
  icon?: any;
  subItem?: boolean;
  title?: string;
};

function NavItemContent({ icon, title, children, subItem }: propsType) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            '& svg': { width: '100%', height: '100%' },
          }}
        >
          {icon}
        </Box>
      )}
      {title}
      {children && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}
