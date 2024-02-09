import { useState, Fragment } from 'react';
import { Icon, IconButton, styled } from '@mui/material'; // Assurez-vous d'avoir importé le bon Icon de MUI
import { topBarHeight } from 'app/utils/constant';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: topBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&::placeholder': {
    color: theme.palette.text.primary
  }
}));

const SearchInput = styled('input')(({ theme }) => ({
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  paddingLeft: '20px',
  height: 'calc(100% - 5px)',
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&::placeholder': { color: theme.palette.text.primary }
}));

const MatxSearchBox = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Utilisez la valeur de searchValue comme vous le souhaitez
    console.log('Valeur de recherche :', searchValue);
    const lien = `?keyWord=${searchValue}`;
    navigate(`/recherche${lien}`);
  };

  const toggle = () => {
    setSearchValue('');
    setOpen(!open);
  };

  return (
    <Fragment>
      {!open && (
        <IconButton onClick={toggle}>
          <Icon sx={{ color: 'text.primary' }}>search</Icon>
        </IconButton>
      )}

      {open && (
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search here..."
            autoFocus
            value={searchValue}
            onChange={handleChange}
          />
          <IconButton onClick={handleSearch}>
            <Icon sx={{ color: 'text.primary' }}>search</Icon>
          </IconButton>
          <IconButton onClick={toggle} sx={{ mx: 2, verticalAlign: 'middle' }}>
            <Icon sx={{ color: 'text.primary' }}>close</Icon>
          </IconButton>
        </SearchContainer>
      )}
    </Fragment>
  );
};

export default MatxSearchBox;
