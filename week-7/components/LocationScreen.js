import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from "react-native";


export default function LocationScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        })();
    }, []);

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {location ? (
                <MapView 
                style={styles.map}
                region={mapRegion}
                showsUserLocation={true}
                >
                    <Marker 
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title = "You are here"
                    />
                </MapView>
            ) : (
                <Text>Fetching location...</Text>
                
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        width: '100%',
        height: '100%',
    },
    

});