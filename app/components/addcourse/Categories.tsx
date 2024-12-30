import Image from 'next/image';

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
                <div 
                    onClick={() => setCategory('data')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'data' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_beach.jpeg"
                        alt="Category - Data"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Data</span>
                </div>

                <div 
                    onClick={() => setCategory('programming')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'programming' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_beach.jpeg"
                        alt="Category - Programming"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Programming</span>
                </div>

                <div 
                    onClick={() => setCategory('design')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'design' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_beach.jpeg"
                        alt="Category - Design"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Design</span>
                </div>

                <div 
                    onClick={() => setCategory('personal_development')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'personal_development' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image
                        src="/icn_category_beach.jpeg"
                        alt="Category - Personal Development"
                        width={20}
                        height={20}
                    />

                    <span className='text-xs'>Personal Development</span>
                </div>
            </div>
        </>
    )
}

export default Categories;