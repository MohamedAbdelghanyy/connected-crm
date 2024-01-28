import { InputWrapper, Listbox, Root, StyledTag } from '@/lib/auto-complete-input-components';
import axios from "@/services/axios";
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { errorHandler } from '../other/error-handler';
import { Skeleton } from './skeleton';
import { toast } from './use-toast';
import { useTheme } from '@/lib/theme-provider';

interface BrandsCategoriesInputProps {
  defaultValue: CategoryOptionType[];
  onChange: Function;
}

interface CategoryOptionType {
  id: number;
  name: string;
}

export default function BrandsCategoriesInput({ defaultValue, onChange }: BrandsCategoriesInputProps) {
  const [categories, setCategories] = useState<CategoryOptionType[]>([]);
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'autocomplete-input',
    multiple: true,
    options: categories,
    getOptionLabel: (option) => option.name,
  });
  const [currentTheme, setCurrentTheme] = useState<Theme>();
  const { theme } = useTheme();

  useEffect(() => {
    const newTheme = createTheme({
      palette: {
        mode: theme === 'light' ? 'light' : 'dark',
      },
    });
    setCurrentTheme(newTheme);
  }, [theme]);

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0 && value.length == 0) {
      value.push(...defaultValue);
    }
  }, [categories, defaultValue, value]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    axios.get('/app/category')
      .then(function (response) {
        setCategories(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, []);

  return (
    categories && currentTheme ? (
      <Root>
        <div {...getRootProps()}>
          <InputWrapper ref={setAnchorEl} theme={currentTheme} className={focused ? 'focused' : ''}>
            {value.map((option: CategoryOptionType, index: number) => (
              <div key={index}>
                <StyledTag label={option.name} theme={currentTheme} {...getTagProps({ index })} />
              </div>
            ))}
            <input {...getInputProps()} placeholder='Type and select category' />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()} theme={currentTheme}>
            {(groupedOptions as typeof categories).map((option, index) => (
              <li key={index} {...getOptionProps({ option, index })}>
                <span style={{ color: theme === "dark" ? "#fff" : "#000" }}>{option.name}</span>
              </li>
            ))}
          </Listbox>
        ) : null}
      </Root >
    ) : <Skeleton className="h-10" />
  );
}