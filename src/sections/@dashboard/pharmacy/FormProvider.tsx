import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useCreatePharmacy from '@/react-query/pharmacy/useCreatePharmacy.ts';
import useUpdatePharmacy from '@/react-query/pharmacy/useUpdatePharmacy.ts';
import useChooseProvince from '@/zustand/cities/useChooseProvince.ts';
import { FormProvider } from '@components/hook-form';

type propsType = {
  isEdit?: boolean;
  currentPharmacy?: Pharmacy;
  children: React.ReactNode;
};
export default function PharmacyFormProvider({ currentPharmacy, children, isEdit }: propsType) {
  const setProvinceId = useChooseProvince((state) => state.setProvinceId);

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

  const onSubmit = async (data: Partial<Pharmacy>) => {
    console.log('Data', data);
    if (isEdit) {
      updatePharmacy({ id: currentPharmacy?.id, data });
    } else {
      createPharmacy(data);
    }
  };

  const { mutate: createPharmacy, isPending: isCreatePending } = useCreatePharmacy();
  const { mutate: updatePharmacy, isPending: isUpdatePending } = useUpdatePharmacy();

  useEffect(() => {
    if (!isEdit) {
      reset(defaultValues);
    } else {
      if (currentPharmacy?.city?.province?.id) {
        setProvinceId(currentPharmacy?.city?.province?.id);
      }
    }
  }, [isEdit, currentPharmacy]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {children}
    </FormProvider>
  );
}
