export const tokenGatherer = (props) => {
    const token = props.cookies.cookies.SESSION_ID;
    return token;
}

export const usernameGatherer = (props) => {
    const token = props.cookies.cookies.username;
    return token;
}