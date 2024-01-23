import { Box, Card, Grid, Skeleton, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function SupportEditSkeleton() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <Skeleton width={'100%'} height={'100px'} />
            <Skeleton width={'100%'} height={'100px'} />
            <Skeleton width={'100%'} height={'100px'} />
            <Skeleton width={'100%'} height={'100px'} />
          </Box>
          <Skeleton
            width={'100px'}
            height={'50px'}
            sx={{ alignItems: 'flex-end', alignSelf: 'flex-start', marginLeft: 'auto' }}
          >
            <Stack>
              <LoadingButton type="submit" variant="contained"></LoadingButton>
            </Stack>
          </Skeleton>
        </Card>
      </Grid>
    </Grid>
  );
}
