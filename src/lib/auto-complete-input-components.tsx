import { AutocompleteGetTagProps, autocompleteClasses, styled } from "@mui/material";
import { XCircleIcon } from "lucide-react";

const getColor = (theme: any) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)');

const getBackgroundColor = (theme: any, colorDark: string, colorLight: string) => (theme.palette.mode === 'dark' ? colorDark : colorLight);

export const Root = styled('div')(({ theme }) => `
  color: ${getColor(theme)};
  font-size: 14px;
`);

export const InputWrapper = styled('div')(({ theme }) => `
  width: 100%;
  border: 1px solid;
  border-color: inherit;
  background-color: ${getBackgroundColor(theme, '#09090b', '#fff')};
  border-radius: 15px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${getBackgroundColor(theme, '#177ddc', '#40a9ff')};
  }

  &.focused {
    border-color: ${getBackgroundColor(theme, '#177ddc', '#40a9ff')};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${getBackgroundColor(theme, '#09090b', '#fff')};
    color: ${getColor(theme)};
    height: 38px;
    box-sizing: border-box;
    border-radius: 15px;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}

function Tag(props: TagProps) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <XCircleIcon onClick={onDelete} />
        </div>
    );
}

export const StyledTag = styled(Tag)<TagProps>(({ theme }) => `
  display: flex;
  align-items: center;
  height: 29px;
  margin-left: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
  line-height: 22px;
  color: ${getBackgroundColor(theme, '#fff', '#000')};
  border: 1px solid ${getBackgroundColor(theme, '#303030', '#e8e8e8')};
  border-radius: 10px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${getBackgroundColor(theme, '#177ddc', '#40a9ff')};
    background-color: ${getBackgroundColor(theme, '#003b57', '#e6f7ff')};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
    color: '#fafafa';
  }
`);

export const Listbox = styled('ul')(({ theme }) => `
  width: 98%;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${getBackgroundColor(theme, '#09090b', '#fff')};
  overflow: auto;
  max-height: 250px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${getBackgroundColor(theme, '#2b2b2b', '#fafafa')};
    font-weight: 600;
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${getBackgroundColor(theme, '#003b57', '#e6f7ff')};
    cursor: pointer;
  }
`);
