import { useRef, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce';

export const SearchBar = ({ city }) => {

    const apikey = 'b6135fa9cdeb231961b63c035e2d8911';

    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [location, setLocation] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef(null);
    const resultsRef = useRef(null);

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
    const handleInputChange = useCallback(debounce((value) => {
        fetchLocations(value);
    }, 1000), []);

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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsVisible(false);
            }
        };

        const handleClickOutside = (e) => {
            if (resultsRef.current && !resultsRef.current.contains(e.target)) {
                setIsVisible(false);
            }
        };

        handleInputChange(value);

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [value, handleInputChange]);

    return (
        <div className='search-container'>
            <div>
                <input className='search-input'
                    ref={inputRef}
                    value={value}
                    onChange={(ev) => {
                        setValue(ev.target.value);
                        // handleInputChange(ev.target.value);
                    }}
                    // onKeyDown={handleKeyDown}
                    onFocus={handleInputClick}
                    placeholder='Введите город...'
                />
            </div>
            {isVisible && (
                <ul className='result-list' ref={resultsRef}>{renderSuggestions()}</ul>
            )}
        </div>
    )
}