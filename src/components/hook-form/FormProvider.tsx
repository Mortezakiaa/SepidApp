import { ReactNode } from 'react';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

type FormProviderPropTypes = {
  children: ReactNode;
  methods: any;
  onSubmit: () => void;
};

export default function FormProvider({ children, onSubmit, methods }: FormProviderPropTypes) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
