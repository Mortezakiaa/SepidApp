import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type SearchNotFoundPropTypes = {
  searchQuery: string;
} & PaperProps;

export default function SearchNotFound({ searchQuery = '', ...other }: SearchNotFoundPropTypes) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> Please enter keywords</Typography>
  );
}
