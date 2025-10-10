import { useState, useEffect } from "react";
import { getData } from './API';
import ContryList from "./components/ContryList";
import ContryDetails from "./components/ContryDetails";

const App = () => {
    const [ search, setSearch ] = useState('');
    const [ contries, setContries ] = useState('');
    const [ filteredContries, setFilteredContries ] = useState('');
    const [ filteredLen, setFilteredLen ] = useState(0);
    const [ details, setDetails ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const showDetails = (contry) => {
        setDetails(contry);
    }

    const searchCountries = (e) => {
        setDetails('');
        const searchData = e.target.value;
        if(searchData.trim() === '') {
            setSearch('');
            setFilteredContries('');
            setFilteredLen(0);
            return;
        };
        setSearch(searchData);

        const filtered = contries.filter(contry => contry.name.common.toLowerCase().includes(searchData.toLowerCase()));
        setFilteredContries(filtered);
        setFilteredLen(filtered.length);
    }

    //use effect to fetch data
    useEffect(() => {
        const contriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
        setLoading(true);
        async function fetchContries() {
            const data = await getData(contriesUrl);
            if(data) setContries(data);
            setLoading(false);
        }
        fetchContries();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}

            <h1>Rest Countries</h1>
            Find Contires:
            <input value={search} onChange={searchCountries} disabled={loading} />
            <div>
                {
                    filteredLen > 10 && <p>Too many matches, specify another filter</p>
                }
                {
                    filteredLen < 10 && filteredLen > 1 && <ContryList contries={filteredContries} showDetails={showDetails} />
                }
                {
                    filteredLen === 1 && <ContryDetails contry={filteredContries[0]} />
                }
                {
                    details && <ContryDetails contry={details} />
                }
            </div>
        </div>
    )
}

export default App