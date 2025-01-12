'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, Check } from 'lucide-react-native';
import { Button } from '@rneui/themed';
import PropertyCard from './PropertyCard';

const DEMO_PROPERTIES = [
    {
        id: '1',
        imageUrl: '/placeholder.svg?height=400&width=300',
        location: 'Donholm, Nairobi Kenya',
        price: 320,
        bedrooms: 3,
        bathrooms: 2,
        features: ['Backyard'],
    },
    {
        id: '2',
        imageUrl: '/placeholder.svg?height=400&width=300',
        location: 'Westlands, Nairobi Kenya',
        price: 450,
        bedrooms: 4,
        bathrooms: 3,
        features: ['Pool', 'Garden'],
    },
    {
        id: '3',
        imageUrl: '/placeholder.svg?height=400&width=300',
        location: 'Kilimani, Nairobi Kenya',
        price: 380,
        bedrooms: 3,
        bathrooms: 2,
        features: ['Balcony', 'Gym'],
    },
    {
        id: '4',
        imageUrl: '/placeholder.svg?height=400&width=300',
        location: 'Karen, Nairobi Kenya',
        price: 550,
        bedrooms: 5,
        bathrooms: 4,
        features: ['Large Garden', 'Swimming Pool'],
    },
];

export default function PropertyStack() {
    const [properties, setProperties] = useState(DEMO_PROPERTIES);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSwipe = (direction: 'left' | 'right') => {
        console.log(
            `Swiped ${direction} on property ${properties[currentIndex].id}`
        );
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleDragEnd = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const swipeThreshold = 100;
        const direction = info.offset.x > 0 ? 'right' : 'left';
        if (Math.abs(info.offset.x) > swipeThreshold) {
            handleSwipe(direction);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-100 via-yellow-50 to-cyan-800">
            <div className="relative w-full max-w-sm aspect-[3/4]">
                <AnimatePresence initial={false}>
                    {properties.slice(currentIndex).map((property, index) => (
                        <motion.div
                            key={property.id}
                            style={{
                                zIndex: properties.length - index,
                            }}
                            initial={{
                                scale: index === 0 ? 1 : 0.9,
                                y: index === 0 ? 0 : -10 * index,
                            }}
                            animate={{
                                scale: index === 0 ? 1 : 0.9 - index * 0.05,
                                y: index === 0 ? 0 : -10 * index,
                            }}
                            exit={(custom) => ({
                                x: custom === 'left' ? -300 : 300,
                                opacity: 0,
                                transition: { duration: 0.2 },
                            })}
                            transition={{ duration: 0.3 }}
                            drag={index === 0 ? 'x' : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={handleDragEnd}
                            custom={(info) =>
                                info.offset.x > 0 ? 'right' : 'left'
                            }
                            className="absolute inset-0"
                        >
                            <PropertyCard
                                property={property}
                                isActive={index === 0}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {currentIndex < properties.length && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="bg-white/80 backdrop-blur-sm"
                            onClick={() => handleSwipe('left')}
                        >
                            <X className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="bg-white/80 backdrop-blur-sm"
                            onClick={() => handleSwipe('right')}
                        >
                            <Check className="h-4 w-4 text-green-500" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
