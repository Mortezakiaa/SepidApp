import * as Yup from 'yup';
import { useEffect, useMemo, useRef } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker, LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Card, Grid, Stack, TextField } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// components
import { FormProvider, RHFTextField } from '@/components/hook-form';
import toast from 'react-hot-toast';
import useUpdateUser from '@/react-query/user/useUpdateUser';
import useFetchProvinces from '@/react-query/cities/useFetchProvinces';
import useFetchCities from '@/react-query/cities/useFetchCities';
import useChooseProvince from '@/zustand/cities/useChooseProvince.ts';
import { RHFSwitch } from '@components/hook-form';
import useCreatePharmacy from '@/react-query/pharmacy/useCreatePharmacy.ts';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import useUpdatePharmacy from '@/react-query/pharmacy/useUpdatePharmacy.ts';
import { useQueryClient } from '@tanstack/react-query';

// ----------------------------------------------------------------------

type PharmacyNewEditPropsType = {
  isEdit?: boolean;
  currentPharmacy?: Pharmacy;
};

export default function PharmacyNewEditForm({ isEdit = false, currentPharmacy }: PharmacyNewEditPropsType) {
  const { push } = useRouter();

  const NewPharmacySchema = Yup.object().shape({
    name: Yup.string().required('نام اجباری است'),
    info: Yup.object().shape({
      address: Yup.string().required('ادرس اجباری است'),
      phone_number: Yup.string().required('شماره تماس اجباری است'),
    }),
    software_info: Yup.object().shape({
      previous_version: Yup.string().required('ورژن قبلی نرم افزار اجباری است'),
      system_count: Yup.number().required('تعداد سیستم اجباری است'),
      printer_count: Yup.number().required('تعداد پرینتر اجباری است'),
    }),
    city: Yup.object().required('شهر اجباری است'),
    end_date: Yup.date().required('تاریخ پایان اجباری است'),
    is_active: Yup.boolean(),
  });

  const defaultValues = useMemo<Partial<Pharmacy>>(
    () => ({
      name: currentPharmacy?.name ?? '',
      info: {
        address: currentPharmacy?.info?.address ?? '',
        phone_number: currentPharmacy?.info?.phone_number ?? '',
      },
      software_info: {
        previous_version: currentPharmacy?.software_info?.previous_version ?? '',
        printer_count: currentPharmacy?.software_info?.printer_count ?? 0,
        system_count: currentPharmacy?.software_info?.system_count ?? 0,
      },
      phone_number: currentPharmacy?.info?.phone_number ?? '',
      city: currentPharmacy?.city ?? null,
      is_active: currentPharmacy?.is_active ?? false,
      end_date: currentPharmacy?.end_date ? new Date(currentPharmacy?.end_date) : new Date(),
    }),
    [currentPharmacy]
  );

  const methods = useForm({
    resolver: yupResolver(NewPharmacySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    control,
    formState: { isSubmitting, errors },
  } = methods;
  const { mutate: createPharmacy, isPending: isCreatePending, error: errorCreate } = useCreatePharmacy();
  const { mutate: updatePharmacy, isPending: isUpdatePending, error: errorUpdate } = useUpdatePharmacy();

  useEffect(() => {
    if (!isEdit) {
      reset(defaultValues);
    } else {
      if (currentPharmacy?.city?.province?.id) {
        setProvinceId(currentPharmacy?.city?.province?.id);
      }
    }
  }, [isEdit, currentPharmacy]);
  useEffect(() => {
    const e = errorCreate || errorUpdate;
    if (e) {
      if (typeof e.errorData === 'string') toast.error(e.errorData);
      if (typeof e.errorData === 'object') {
        for (let key in e.errorData) {
          setError(key as keyof Pharmacy, { message: e.errorData[key] });
        }
      }
    }
  }, [errorCreate, errorUpdate]);
  const onSubmit = async (data: Partial<Pharmacy>) => {
    console.log('Data', data);
    if (isEdit) {
      updatePharmacy({ id: currentPharmacy?.id, data });
    } else {
      createPharmacy(data);
    }
  };

  const { data: provinces, isLoading: isProvinceLoading } = useFetchProvinces();
  const { data: cities, isLoading: isCityLoading } = useFetchCities();
  const setProvinceId = useChooseProvince((state) => state.setProvinceId);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
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
              <RHFTextField name="name" label="نام داروخانه" />
              <RHFTextField name="info.phone_number" label="شماره تماس داروخانه" />
              <RHFTextField name="info.address" label="آدرس داروخانه" />

              <Autocomplete
                disabled={isProvinceLoading}
                options={provinces || []}
                defaultValue={currentPharmacy?.city?.province || null}
                autoHighlight
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => {
                  setProvinceId(value.id);
                }}
                renderInput={(params) => (
                  //@ts-ignore
                  <TextField
                    {...params}
                    value={params.id}
                    label="یک استان را انتخاب کنید"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />

              <Controller
                render={({ field, fieldState: { error }, formState }) => (
                  <Autocomplete
                    {...field}
                    onChange={(e, value) => {
                      field.onChange(value);
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    disabled={isCityLoading || !cities}
                    options={cities || []}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    noOptionsText={'ابتدا استان را انتخاب کنید'}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="یک شهر را انتخاب کنید"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
                name={'city'}
              />

              <RHFTextField name="software_info.previous_version" label="ورژن قبلی" />
              <RHFTextField name="software_info.printer_count" label="تعداد پرینتر" />

              <Controller
                name="end_date"
                control={control}
                render={({ field, fieldState: { error } }) => <DateTimePicker {...field} label="تاریخ پایان اعتبار" />}
              />
              <RHFTextField name="software_info.system_count" label="تعداد سیستم" />

              <RHFSwitch name="is_active" label="فعال" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isUpdatePending || isCreatePending}>
                {!isEdit ? 'ساخت داروخانه' : 'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
