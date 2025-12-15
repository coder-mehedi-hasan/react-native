import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1e90ff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        margin: 4,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Button;
