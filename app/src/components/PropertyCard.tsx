import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from '@rneui/themed';

interface Property {
    id: string;
    imageUrl: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    features: string[];
}

interface PropertyCardProps {
    property: Property;
    isActive: boolean;
}

export default function PropertyCard({
    property,
    isActive,
}: PropertyCardProps) {
    return (
        <Card
            className={`overflow-hidden rounded-lg shadow-md ${
                isActive
                    ? 'border-2 border-green-500'
                    : 'border border-gray-300'
            } bg-white`}
        >
            <View className="relative h-56">
                <Image
                    source={{ uri: property.imageUrl }}
                    className="w-full h-full object-cover"
                />
                <View className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md">
                    <Text className="text-lg font-semibold text-gray-800">
                        {property.location}
                    </Text>
                    <Text className="text-2xl font-bold text-gray-900">
                        ${property.price}
                    </Text>
                    <Text className="text-sm text-gray-600">
                        {property.bedrooms} Bedroom
                        {property.bedrooms > 1 ? 's' : ''}, {property.bathrooms}{' '}
                        Bathroom
                        {property.bathrooms > 1 ? 's' : ''},{' '}
                        {property.features.join(', ')}
                    </Text>
                </View>
            </View>
        </Card>
    );
}
