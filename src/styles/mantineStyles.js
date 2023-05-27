export const ms = {
    select: {
        input: {
            width: '100%',
            height: 42,

            marginBottom: 20,
            padding: '8px 12px',

            borderColor: '#D5D6DC',
            color: '#232134',
            font: 'normal 400 14px/20px Inter, sans-serif',
            '&:hover': {
                borderColor: '#5E96FC',
            },
        },
        dropdown: {
            border: 'none',
            borderRadius: 8,

            width: '100%',
            height: 188,

            padding: 4,
        },
        item: {
            width: '97%',
            height: 36,

            padding: 8,

            borderRadius: 8,
            font: 'normal 400 14px/20px Inter, sans-serif',
            color: '#232134',
            '&[data-hovered]': {
                backgroundColor: "#DEECFF",
                padding: '8px 12px',
            },
            '&[data-selected]': {
                backgroundColor: "#5E96FC",
                color: "white",
                padding: '8px 12px',
                font: 'normal 500 14px/20px Inter, sans-serif',
            },
        },
        rightSection: { pointerEvents: 'none' },
    },
    numberInput: {
        input: {
            width: '100%',
            height: 42,

            marginBottom: 8,
            padding: '8px 12px',

            backgroundColor: 'white',
            borderColor: '#D5D6DC',
            color: '#232134',
            font: 'normal 400 14px/20px Inter, sans-serif',
            '&:hover': {
                borderColor: '#5E96FC',
            },
        },
        control: {
            margin: -4,
            border: 'none',
            color: '#ACADB9',
        },
        controlUp: {
            padding: 3,
            marginTop: 4,
            cursor: 'pointer',
        },
        controlDown: {
            cursor: 'pointer',
            '&:disabled': {
                color: '#ACADB9',
            },
        },
    },
    textInput: {
        input: {
            border: '1px solid #EAEBED',

            width: 773,
            height: 48,

            padding: '0px 12px',

            color: '#232134',
            font: 'normal 400 14px/20px Inter, sans-serif',
            '&:hover': {
                borderColor: '#5E96FC',
            },
            [`@media (max-width: 1130px) and (min-width: 320px)`]: {
                width: '100%',
            },
        },
    }
};