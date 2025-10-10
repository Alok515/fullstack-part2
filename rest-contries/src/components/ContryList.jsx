const ContryList = ({contries, showDetails }) => {
    return (
        <ul>
            {contries.map(contry => <li key={contry.name.common}>{contry.name.common} <button onClick={() => showDetails(contry)}>show</button></li>)}
        </ul>
    )
}

export default ContryList