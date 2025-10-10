const Notification = ({message}) => {
    const { isSuccess, value } = message;
    const successStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const errorStyle = {
        color: 'red',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (isSuccess) {
        return (
            <div style={successStyle}>
                {value}
            </div>
        )
    } else {
        return (
            <div style={errorStyle}>
                {value}
            </div>
        )
    }
}

export default Notification;