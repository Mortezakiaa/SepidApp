// next

// @mui
import { Box, ListItemText } from '@mui/material';
import Link from '@components/Link';
//
import Iconify from '../../Iconify';
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from './style';
import { isExternalLink } from '..';

// ----------------------------------------------------------------------

type NavItemRootPropTypes = {
  active: boolean;
  open: boolean;
  isCollapse: boolean;
  onOpen: () => void;
  item: {
    children: any[];
    icon: any;
    info: any;
    path: string;
    title: string;
  };
};

export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }: NavItemRootPropTypes) {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle disableTypography primary={title} isCollapse={isCollapse} />
      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      {renderContent}
    </ListItemStyle>
  ) : (
    <Link href={path}>
      <ListItemStyle activeRoot={active}>{renderContent}</ListItemStyle>
    </Link>
  );
}

// ----------------------------------------------------------------------

type NavItemSubPropTypes = {
  active: boolean;
  open: boolean;
  onOpen: () => void;
  item: {
    children: any[];
    info: any;
    path: string;
    title: string;
  };
};

export function NavItemSub({ item, open = false, active = false, onOpen }: NavItemSubPropTypes) {
  const { title, path, info, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title} />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener" subItem>
      {renderContent}
    </ListItemStyle>
  ) : (
    <Link href={path}>
      <ListItemStyle activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    </Link>
  );
}

// ----------------------------------------------------------------------

type DotIconPropTypes = {
  active: boolean;
};

export function DotIcon({ active }: DotIconPropTypes) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

type ArrowIconPropTypes = {
  open: boolean;
};

export function ArrowIcon({ open }: ArrowIconPropTypes) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
