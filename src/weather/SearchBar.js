import { useRef, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce';

const SearchBar = ({ city }) => {

    const apikey = 'b6135fa9cdeb231961b63c035e2d8911';

    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [location, setLocation] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef(null);

    const fetchLocations = async (query) => {
        if (!query) {
            setLocation([]);
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apikey}`
            );
            setLocation(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            alert('Не удалось загрузить данные. Попробуйте позже.');
        } finally {
            setIsLoading(false);
        }
    };

    // Debounce wrapper
    const handleInputChange = debounce((value) => {
        fetchLocations(value);
    }, 1000);

    const handleKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            fetchLocations(value);
        }
        return;
    }

    const handleInputClick = () => {
        setIsVisible(true);
        inputRef.current.focus();
    }

    const handleSelection = (selectedCity) => {
        city(selectedCity);
        setIsVisible(false);
        setValue(selectedCity);
    }

    const renderSuggestions = () => {
        if (isLoading) {
            return <li>Загрузка...</li>;
        }

        if (!location.length) {
            return <li>Нет результатов</li>;
        }

        return location.map((loc) => (
            <li
                key={`${loc.lat}-${loc.lon}`}
                onClick={() =>
                    handleSelection(
                        loc.local_names?.en || loc.name || ''
                    )
                }
            >
                {loc.local_names?.en || loc.name}, {loc.state}, {loc.country}
            </li>
        ));
    };

    return (
        <div className='search-container'>
            <div>
                <input className='search-input'
                    ref={inputRef}
                    value={value}
                    onChange={(ev) => {
                        setValue(ev.target.value);
                        handleInputChange(ev.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputClick}
                    placeholder='Введите город...'
                />
            </div>
            {isVisible && (
                <ul className='result-list'>{renderSuggestions()}</ul>
            )}
            </div>
    )
}

export default SearchBar;