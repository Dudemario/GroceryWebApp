import { useEffect , useState} from 'react';

function useGeoLocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coords: {lat: "", lng: ""},
    })

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }, [])

    function onSuccess(location){
        setLocation({
            loaded: true,
            coords: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        })
    }

    function onError(error) {
        setLocation({
            loaded: true,
            error,
        })
    }

    return location;
}

export default useGeoLocation;