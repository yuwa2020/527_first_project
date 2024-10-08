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

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image" onPress={pickImage} />
            {selectedImage && (
            <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
            </View>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        marginTop: 20,
        borderRadius: 75,
        overflow: 'hidden',
        width: 150,
        height: 150, 
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
});

export default ImagePickerScreen;