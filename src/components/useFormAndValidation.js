import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [ formValues, setFormValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setFormValues({...formValues, [name]: value });
    setErrors({...errors, [name]: event.target.validationMessage});
    setIsValid(event.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newformValues = {}, newErrors = {}, newIsValid = false) => {
    setFormValues(newformValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setFormValues, setErrors, setIsValid]);

  return { formValues, handleChange, errors, isValid, resetForm, setFormValues, setIsValid };
}
