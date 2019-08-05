import { useState, useCallback } from 'react';

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

export const useFormData = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrors, setEmailErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');
  const [shouldRemember, setShouldRemember] = useState(false);

  const inputHandlers = {
    email: setEmail,
    password: setPassword
  };

  const errorHandlers = {
    email: setEmailErrors,
    password: setPasswordErrors
  };

  const handleInputChange = useCallback((event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;

    if (hasKey(inputHandlers, target.name)) {
      const inputSetter = inputHandlers[target.name];
      inputSetter(target.value);
    }

    if (hasKey(errorHandlers, target.name)) {
      const errorSetter = errorHandlers[target.name];
      errorSetter('');
    }
  }, []);

  const handleCheckbox = (event: React.ChangeEvent) =>
    setShouldRemember(!shouldRemember);

  const handleErrors = useCallback((response: any) => {
    if (response.message === 'Invalid login credentials') {
      setEmailErrors(response.message);
      setPasswordErrors(response.message);
      return;
    }

    const { data } = response;
    for (const err in data) {
      if (hasKey(errorHandlers, err)) {
        const setter = errorHandlers[err];
        setter(data[err].msg);
      }
    }
  }, []);

  const formData = {
    email,
    password,
    shouldRemember
  };

  const requestErrors = {
    email: emailErrors,
    password: passwordErrors
  };

  return {
    formData,
    requestErrors,
    handleInputChange,
    handleCheckbox,
    handleErrors
  };
};
