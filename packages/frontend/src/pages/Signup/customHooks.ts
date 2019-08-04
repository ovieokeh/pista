import { useState, useCallback } from 'react';

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

export const useFormData = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameErrors, setFirstNameErrors] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState('');
  const [emailErrors, setEmailErrors] = useState('');
  const [passwordErrors, setPasswordErrors] = useState('');

  const inputHandlers = {
    firstName: setFirstName,
    lastName: setLastName,
    email: setEmail,
    password: setPassword
  };

  const errorHandlers = {
    firstName: setFirstNameErrors,
    lastName: setLastNameErrors,
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

  const handleErrors = useCallback((response: any) => {
    if (response.message === 'Email address already in use') {
      setEmailErrors(response.message);
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
    firstName,
    lastName,
    email,
    password
  };

  const requestErrors = {
    firstName: firstNameErrors,
    lastName: lastNameErrors,
    email: emailErrors,
    password: passwordErrors
  };

  return { formData, requestErrors, handleInputChange, handleErrors };
};
