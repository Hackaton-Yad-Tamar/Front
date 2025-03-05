export const signInTextFieldStyle = {
    marginBottom: '15px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& fieldset': {
        borderColor: 'black', // Set the border color to black
        },
        '&.Mui-focused fieldset': {
        borderColor: 'black', // Keep black border when focused
        },
    }
};

export const signInButtonStyle = {
    justifySelf: 'center',
    backgroundColor: '#67B446',
    borderRadius: '18px',
    '&:hover': {
        backgroundColor: '#4C9A3F',
    },
    '&:active': {
        backgroundColor: '#4C9A3F',
    },
};

export const forgotPasswordStyle = {
    textDecoration: 'none',
    color: '#4C9A3F',
    '&:hover': {
    color: '#67B446',
    },
}