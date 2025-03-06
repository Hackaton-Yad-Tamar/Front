const lightGreen = '#67B446';
const darkGreen = '#4C9A3F';

export const signInTextFieldStyle = {
    marginBottom: '15px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& fieldset': {
        borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
        borderColor: 'black',
        },
    },
};

export const signInButtonStyle = {
    justifySelf: 'center',
    backgroundColor: lightGreen,
    borderRadius: '18px',
    '&:hover': {
        backgroundColor: darkGreen,
    },
    '&:active': {
        backgroundColor: darkGreen,
    },
    color: 'white'
};

export const dialogStyle = {
    '&. .MuiFormControl-root': {
        dir: 'rtl'
    }
};