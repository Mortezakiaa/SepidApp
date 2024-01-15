import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '@utils/formatNumber.tsx';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// components
import Label from '@components/Label';
import { FormProvider, RHFCheckbox, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '@/components/hook-form';
import useFetchProvinces from '@/react-query/cities/useFetchProvinces.ts';
import useFetchCities from '@/react-query/cities/useFetchCities.ts';
import useChooseProvince from '@/zustand/cities/useChooseProvince.ts';
import useFetchPharmacies from '@/react-query/pharmacy/useFetchPharmacies.ts';
import useCreateUser from '@/react-query/user/useCreateUser.ts';
import toast from 'react-hot-toast';
import { RoleEnum } from '@/enums/role.enum.ts';
import useUpdateUser from '@/react-query/user/useUpdateUser';
import { UserStatusEnum } from '@/types/enums/user-status.enum';

// ----------------------------------------------------------------------

type UserNewEditFormPropTypes = {
  isEdit?: boolean;
  currentUser?: User;
};

export default function UserNewEditForm({ isEdit = false, currentUser }: UserNewEditFormPropTypes) {
  const { push } = useRouter();

  const { data: pharmacies } = useFetchPharmacies();

  const NewUserSchema = Yup.object().shape({
    full_name: Yup.string().required('نام اجباری است'),
    phone_number: Yup.string().required('شماره تماس اجباری است'),
    pharmacy_id: Yup.number().nullable().optional(),
  });

  const defaultValues = useMemo(
    () => ({
      full_name: currentUser?.full_name || '',
      pharmacy_id: currentUser?.pharmacy_id || null,
      phone_number: currentUser?.phone_number || '',
      status: currentUser?.status || UserStatusEnum.ACTIVE,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,

    formState: { isSubmitting, errors },
  } = methods;
  console.log(errors);

  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  useEffect(() => {
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser]);

  const onSubmit = async (data: Partial<User>) => {
    try {
      if (isEdit) {
        await updateUser({ id: currentUser?.id, body: data });
      } else {
        await createUser(data);
      }
      reset();
      toast.success(!isEdit ? 'کاربر با موفقیت ساخته شد!' : 'اطلاعات کاربر با موفقیت تغییر کرد!');
      push(PATH_DASHBOARD.user.list);
    } catch (e) {
      console.error(e);
      if (typeof e.errorData === 'string') toast.error(e.errorData);
      if (typeof e.errorData === 'object') {
        for (let key in e.errorData) {
          setError(key as 'full_name' | 'pharmacy_id' | 'root' | `root.${string}`, { message: e.errorData[key] });
        }
      }
    }
  };

  // const { data: provinces } = useFetchProvinces();
  // const { data: cities } = useFetchCities();
  // const setProvinceId = useChooseProvince((state) => state.setProvinceId);
  // const provinceId = useChooseProvince((state) => state.provinceId);

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //
  //     if (file) {
  //       setValue(
  //         'avatarUrl',
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       );
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit((data) => {
        console.log(data);
        onSubmit(data);
      })}
    >
      <Grid container spacing={3}>
        {/*<Grid item xs={12} md={4}>*/}
        {/*  <Card sx={{ py: 10, px: 3 }}>*/}
        {/*    {isEdit && (*/}
        {/*      <Label*/}
        {/*        color={values.status !== 'active' ? 'error' : 'success'}*/}
        {/*        sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}*/}
        {/*      >*/}
        {/*        {values.status}*/}
        {/*      </Label>*/}
        {/*    )}*/}

        {/*    <Box sx={{ mb: 5 }}>*/}
        {/*      <RHFUploadAvatar*/}
        {/*        name="avatarUrl"*/}
        {/*        accept="image/*"*/}
        {/*        maxSize={3145728}*/}
        {/*        onDrop={handleDrop}*/}
        {/*        helperText={*/}
        {/*          <Typography*/}
        {/*            variant="caption"*/}
        {/*            sx={{*/}
        {/*              mt: 2,*/}
        {/*              mx: 'auto',*/}
        {/*              display: 'block',*/}
        {/*              textAlign: 'center',*/}
        {/*              color: 'text.secondary',*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            Allowed *.jpeg, *.jpg, *.png, *.gif*/}
        {/*            <br /> max size of {fData(3145728)}*/}
        {/*          </Typography>*/}
        {/*        }*/}
        {/*      />*/}
        {/*    </Box>*/}

        {/*    {isEdit && (*/}
        {/*      <FormControlLabel*/}
        {/*        labelPlacement="start"*/}
        {/*        control={*/}
        {/*          <Controller*/}
        {/*            name="status"*/}
        {/*            control={control}*/}
        {/*            render={({ field }) => (*/}
        {/*              <Switch*/}
        {/*                {...field}*/}
        {/*                checked={field.value !== 'active'}*/}
        {/*                onChange={(event) => field.onChange(event.target.checked ? 'banned' : 'active')}*/}
        {/*              />*/}
        {/*            )}*/}
        {/*          />*/}
        {/*        }*/}
        {/*        label={*/}
        {/*          <>*/}
        {/*            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>*/}
        {/*              Banned*/}
        {/*            </Typography>*/}
        {/*            <Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
        {/*              Apply disable account*/}
        {/*            </Typography>*/}
        {/*          </>*/}
        {/*        }*/}
        {/*        sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}*/}
        {/*      />*/}
        {/*    )}*/}

        {/*    <RHFSwitch*/}
        {/*      name="isVerified"*/}
        {/*      labelPlacement="start"*/}
        {/*      label={*/}
        {/*        <>*/}
        {/*          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>*/}
        {/*            Email Verified*/}
        {/*          </Typography>*/}
        {/*          <Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
        {/*            Disabling this will automatically send the user a verification email*/}
        {/*          </Typography>*/}
        {/*        </>*/}
        {/*      }*/}
        {/*      sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}*/}
        {/*    />*/}
        {/*  </Card>*/}
        {/*</Grid>*/}

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="full_name" label="نام و نام خانوادگی" />
              <RHFTextField name="phone_number" label="شماره تماس" />

              {/*<RHFSelect*/}
              {/*  onChange={(e) => {*/}
              {/*    setProvinceId(+e.target.value);*/}
              {/*  }}*/}
              {/*  name="province"*/}
              {/*  label="استان"*/}
              {/*  placeholder="استان"*/}
              {/*>*/}
              {/*  <option value="" />*/}
              {/*  {provinces?.map((option) => (*/}
              {/*    <option key={option.id} value={option.id}>*/}
              {/*      {option.name}*/}
              {/*    </option>*/}
              {/*  ))}*/}
              {/*</RHFSelect>*/}

              <RHFSelect
                disabled={!pharmacies?.result?.length}
                name="pharmacy_id"
                label="داروخانه"
                placeholder="یک داروخانه انتخاب کنید"
              >
                <option value={null} />
                {pharmacies?.result?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="role" label="نقش" placeholder="یک نقش انتخاب کنید">
                {Object.values(RoleEnum)?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="status" label="وضعیت" placeholder="یک وضعیت انتخاب کنید">
                {Object.values(UserStatusEnum)?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              {/*<RHFTextField name="state" label="State/Region" />*/}
              {/*<RHFTextField name="city" label="City" />*/}
              {/*<RHFTextField name="address" label="Address" />*/}
              {/*<RHFTextField name="zipCode" label="Zip/Code" />*/}
              {/*<RHFTextField name="company" label="Company" />*/}
              {/*<RHFTextField name="role" label="Role" />*/}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'ساخت کاربر' : 'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
