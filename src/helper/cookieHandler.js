export const tokenGatherer = (props) => {
    const token = props.cookies.cookies.SESSION_ID;
    return token;
}