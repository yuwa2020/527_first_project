import React, {useState} from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {

        const permissonResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissonResult.granted === false) {
            Alert.alert('Permission to access the medica library is required');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync()({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image" onPress={pickImage} />
            {selectedImage && 
            <Image source={{ uri: selectedImage }} style={styles.thumbnail} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        width: 200,
        height: 200,
        boarderRadius: 100,
        marginTop: 20,
        resizeMode: 'cover',
    },
});

export default ImagePickerScreen;