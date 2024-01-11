import { LinkProps, Link as MuiLink } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

const TopLevelLink = React.forwardRef<HTMLAnchorElement, NextLinkProps>(({ href, ...props }, ref) => (
  <NextLink href={href} ref={ref} {...props} />
));

type CombinedLinkProps = LinkProps<typeof NextLink>;
type MyLinkProps = Omit<CombinedLinkProps, 'href'> & {
  href: NextLinkProps['href'];
};
const Link = ({ href, ...props }: MyLinkProps) => <MuiLink {...props} component={TopLevelLink} href={href ?? '/'} />;
export default Link;
