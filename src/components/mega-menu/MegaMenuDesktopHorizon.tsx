import { useState } from 'react';

// @mui
import { Masonry } from '@mui/lab';
import { Paper, Typography, Divider, Stack } from '@mui/material';
import Link from '@components/Link';
// components
import Iconify from '../Iconify';
//
import MenuHotProducts from './MenuHotProducts';
import MegaMenuCarousel from './MenuCarousel';

// ----------------------------------------------------------------------

const ITEM_SPACING = 4;
const PARENT_ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

type MegaMenuDesktopHorizonPropTypes = {
  navConfig: any[];
};

export default function MegaMenuDesktopHorizon({ navConfig, ...other }: MegaMenuDesktopHorizonPropTypes) {
  return (
    <Stack direction="row" spacing={ITEM_SPACING} {...other}>
      {navConfig.map((parent) => (
        <MegaMenuItem key={parent.title} parent={parent} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

type MegaMenuItemPropTypes = {
  parent: {
    title: string;
    path: string;
    more: {
      title: string;
      path: string;
    };
    tags: any[];
    products: any[];
    children: any[];
  };
};

function MegaMenuItem({ parent }: MegaMenuItemPropTypes) {
  const { title, path, more, products, tags, children } = parent;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <>
        <ParentItem path={path} title={title} open={open} hasSub />

        {open && (
          <Paper
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{
              p: 3,
              width: '100%',
              position: 'absolute',
              borderRadius: 2,
              top: PARENT_ITEM_HEIGHT,
              left: -ITEM_SPACING * 8,
              zIndex: (theme) => theme.zIndex.modal,
              boxShadow: (theme) => theme.customShadows.z20,
            }}
          >
            <Masonry columns={3} spacing={2}>
              {children.map((list) => (
                <Stack key={list.subheader} spacing={1.25} sx={{ mb: 2.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightBold' }} noWrap>
                    {list.subheader}
                  </Typography>
                  {list.items.map((link) => (
                    <Link
                      key={link.title}
                      href={link.path}
                      noWrap
                      underline="none"
                      sx={{
                        typography: 'body2',
                        color: 'text.primary',
                        fontSize: 13,
                        transition: (theme) => theme.transitions.create('all'),
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {link.title}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Masonry>

            {!!more && !!tags && !!products && (
              <Stack spacing={3}>
                <Link href={more?.path} sx={{ typography: 'body2', display: 'inline-flex', fontSize: 13 }}>
                  {more?.title}
                </Link>

                <Divider />
                <MegaMenuCarousel products={products} numberShow={8} />
                <Divider />

                <MenuHotProducts tags={tags} />
              </Stack>
            )}
          </Paper>
        )}
      </>
    );
  }

  return <ParentItem path={path} title={title} />;
}

// ----------------------------------------------------------------------

type ParentItemPropTypes = {
  hasSub?: boolean;
  open?: boolean;
  path?: string;
  title?: string;
};

function ParentItem({ title, path = '', open, hasSub, ...other }: ParentItemPropTypes) {
  const activeStyle = {
    color: 'primary.main',
  };

  return (
    <Link
      href={path}
      underline="none"
      color="inherit"
      variant="subtitle2"
      sx={{
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        textTransform: 'capitalize',
        height: PARENT_ITEM_HEIGHT,
        lineHeight: `${PARENT_ITEM_HEIGHT}px`,
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': activeStyle,
        ...(open && activeStyle),
      }}
      {...other}
    >
      {title}
      {hasSub && <Iconify icon={'eva:chevron-down-fill'} sx={{ ml: 1, width: 20, height: 20 }} />}
    </Link>
  );
}
