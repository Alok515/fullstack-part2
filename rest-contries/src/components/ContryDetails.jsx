import Weather from "./Weather"

const Languages = ({languages}) => {
    return (
        <ul>
            {Object.values(languages).map(language => <li key={language}>{language}</li>)}
        </ul>
    )
}

const ContryDetails = ({contry}) => {
    const flagStyle = {
        width: '300px',
        height: '250px'
    }
    return (
        <div>
            <h2>{contry.name.common}</h2>
            <p>Capital: {contry.capital}</p>
            <p>Area: {contry.area}</p>
            <h3>Languages</h3>
            <Languages languages={contry.languages} />
            <img style={flagStyle} src={contry.flags.png} alt={contry.name.common} />
            <Weather city={contry.capital} />
        </div>
    )
}

export default ContryDetails