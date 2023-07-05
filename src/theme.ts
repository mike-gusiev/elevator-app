const theme = {
    colors: {
        primary: "#1677ff",
        secondary: "#00ff00",
        danger: "#ff4d4f",
        borderColor: "#d9d9d9",
        backgroundColor: "#fff",
        textWhite: "#fff",
        textBlack: "#000",
        selected: "#0958d9",
        success: "#73d13d"
    },
    paddings: {
        small: "12px",
        default: "24px"
    },
    borderRadius: {
        small: "8px",
        meduim: "12px",
        default: "22px"
    },
    fontSize: {
        fontSizeSM: "14px",
        fontSize: "16px",
        fontSizeLG: "24px",
        fontSizeXL: "28px",
        fontSizeHeading1: "48px",
        fontSizeHeading2: "42px",
        fontSizeHeading3: "36px",
        fontSizeHeading4: "32px",
        fontSizeHeading5: "28px"
    }
} as const;

export default theme;
