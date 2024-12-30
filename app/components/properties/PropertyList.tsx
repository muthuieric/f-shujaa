'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyListItem from "./PropertyListItem";
import apiService from '@/app/services/apiService';
import useSearchModal from '@/app/hooks/useSearchModal';

export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites
}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const category = searchModal.query.category;
    const [properties, setProperties] = useState<PropertyType[]>([]);

    console.log('searchQUery:', searchModal.query);

    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id == id) {
                property.is_favorite = is_favorite

                if (is_favorite) {
                    console.log('added to list of favorited propreties')
                } else {
                    console.log('removed from list')
                }
            }

            return property;
        })

        setProperties(tmpProperties);
    }

    const getProperties = async () => {
        let url = '/api/properties/';

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`
        } else if (favorites) {
            url += '?is_favorites=true'
        } else {
            let urlQuery = '';

           

            if (category) {
                urlQuery += '&category=' + category
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery);

                urlQuery = '?' + urlQuery.substring(1);

                url += urlQuery;
            }
        }

        const tmpProperties = await apiService.get(url)

        setProperties(tmpProperties.data.map((property: PropertyType) => {
            if (tmpProperties.favorites.includes(property.id)) {
                property.is_favorite = true
            } else {
                property.is_favorite = false
            }

            return property
        }));
    };

    useEffect(() => {
        getProperties();
    }, [category, searchModal.query, params]);

    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem 
                        key={property.id}
                        property={property}
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}

export default PropertyList;