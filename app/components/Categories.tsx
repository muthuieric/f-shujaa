'use client';

import { useState } from 'react';
import Image from 'next/image';
import useSearchModal, {SearchQuery} from '../hooks/useSearchModal';

const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            category: _category
        }

        searchModal.setQuery(query);
    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div 
                onClick={() => _setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Courses"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>All</span>
            </div>
            
            <div 
                onClick={() => _setCategory('data')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'data' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Courses"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>Data</span>
            </div>

            <div 
                onClick={() => _setCategory('programming')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'programming' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Courses"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>Programming</span>
            </div>

            <div 
                onClick={() => _setCategory('design')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'design' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Courses"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>Design</span>
            </div>

            <div
                onClick={() => _setCategory('personal_development')} 
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'personal_development' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Courses"
                    width={20}
                    height={20}
                />

                <span className='text-xs'>Personal Development</span>
            </div>
        </div>
    )
}

export default Categories;