'use client';

import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import CustomButton from '@/app/components/forms/CustomButton';
import Categories from '@/app/components/addcourse/Categories';
import apiService from '@/app/services/apiService';
import Image from 'next/image';

interface Section {
    title: string;
    description: string;
    videoLink: string;
    lessons: string[];
    quillRef: React.MutableRefObject<Quill | null>; // Add a ref for Quill
}

const CreateCoursePage = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataImage, setDataImage] = useState<File | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [newSectionDescription, setNewSectionDescription] = useState('');
    const [newSectionVideoLink, setNewSectionVideoLink] = useState('');
    const [newLesson, setNewLesson] = useState('');
    const router = useRouter();

    const quillRef = useRef<Quill | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            // Initialize Quill for the main course description
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Enter course description...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                    ],
                },
            });

            quillRef.current.root.innerHTML = dataDescription;

            quillRef.current.on('text-change', () => {
                setDataDescription(quillRef.current?.root.innerHTML || '');
            });
        }

        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    const setCategory = (category: string) => {
        setDataCategory(category);
    };

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setDataImage(event.target.files[0]);
        }
    };

    const addSection = () => {
        if (newSectionTitle.trim()) {
            const sectionQuillRef = useRef<Quill | null>(null); // Create a new Quill ref for the section

            const newSection: Section = {
                title: newSectionTitle,
                description: newSectionDescription,
                videoLink: newSectionVideoLink,
                lessons: [],
                quillRef: sectionQuillRef, // Assign the Quill ref to the section
            };

            setSections([...sections, newSection]);
            setNewSectionTitle('');
            setNewSectionDescription('');
            setNewSectionVideoLink('');
        }
    };

    const addLesson = (sectionIndex: number) => {
        if (newLesson.trim()) {
            const updatedSections = [...sections];
            updatedSections[sectionIndex].lessons.push(newLesson);
            setSections(updatedSections);
            setNewLesson('');
        }
    };

    const submitForm = async () => {
        if (!dataCategory || !dataTitle || !dataDescription || !dataImage || sections.length === 0) {
            setErrors(['Please fill out all fields and add at least one section.']);
            return;
        }

        const formData = new FormData();
        formData.append('category', dataCategory);
        formData.append('title', dataTitle);
        formData.append('description', dataDescription);
        formData.append('image', dataImage);
        formData.append('sections', JSON.stringify(sections));

        const response = await apiService.post('/api/courses/create/', formData);

        if (response.success) {
            router.push('/instructor/courses');
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => error);
            setErrors(tmpErrors);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create a New Course</h1>

            {errors.length > 0 && (
                <div className="mb-4">
                    {errors.map((error, index) => (
                        <div key={index} className="p-2 bg-red-100 text-red-600 rounded mb-2">
                            {error}
                        </div>
                    ))}
                </div>
            )}

            <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                    <label>Category</label>
                    <Categories
                        dataCategory={dataCategory}
                        setCategory={setCategory}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label>Title</label>
                    <input
                        type="text"
                        value={dataTitle}
                        onChange={(e) => setDataTitle(e.target.value)}
                        className="w-full p-4 border border-gray-600 rounded-xl"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label>Description</label>
                    <div ref={editorRef} className="bg-white"></div> {/* Quill editor container */}
                </div>

                <div className="flex flex-col space-y-2">
                    <label>Course Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={setImage}
                        className="py-4 px-6 bg-gray-600 text-white rounded-xl"
                    />
                    {dataImage && (
                        <div className="w-[200px] h-[150px] relative">
                            <Image
                                fill
                                alt="Uploaded image"
                                src={URL.createObjectURL(dataImage)}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Curriculum</h2>

                    {sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="border p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                            <div ref={(el) => {
                                if (el && !section.quillRef.current) {
                                    section.quillRef.current = new Quill(el, {
                                        theme: 'snow',
                                        placeholder: 'Enter section description...',
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                [{ list: 'ordered' }, { list: 'bullet' }],
                                                ['link', 'image'],
                                            ],
                                        },
                                    });

                                    section.quillRef.current.root.innerHTML = section.description;

                                    section.quillRef.current.on('text-change', () => {
                                        const updatedSections = [...sections];
                                        updatedSections[sectionIndex].description = section.quillRef.current?.root.innerHTML || '';
                                        setSections(updatedSections);
                                    });
                                }
                            }} className="bg-white mb-4"></div> {/* Quill editor container for section description */}
                            {section.videoLink && (
                                <div className="mb-4">
                                    <a
                                        href={section.videoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Watch Video
                                    </a>
                                </div>
                            )}

                            <div className="space-y-2">
                                {section.lessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                                        <span>{lesson}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex space-x-2">
                                <input
                                    type="text"
                                    value={newLesson}
                                    onChange={(e) => setNewLesson(e.target.value)}
                                    placeholder="Add a lesson"
                                    className="flex-1 p-2 border rounded"
                                />
                                <CustomButton
                                    label="Add Lesson"
                                    onClick={() => addLesson(sectionIndex)}
                                />
                            </div>
                        </div>
                    ))}

                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Section Title</label>
                            <input
                                type="text"
                                value={newSectionTitle}
                                onChange={(e) => setNewSectionTitle(e.target.value)}
                                placeholder="Enter section title"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Section Description</label>
                            <div ref={(el) => {
                                if (el && !quillRef.current) {
                                    quillRef.current = new Quill(el, {
                                        theme: 'snow',
                                        placeholder: 'Enter section description...',
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                [{ list: 'ordered' }, { list: 'bullet' }],
                                                ['link', 'image'],
                                            ],
                                        },
                                    });

                                    quillRef.current.root.innerHTML = newSectionDescription;

                                    quillRef.current.on('text-change', () => {
                                        setNewSectionDescription(quillRef.current?.root.innerHTML || '');
                                    });
                                }
                            }} className="bg-white"></div> {/* Quill editor container for new section description */}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Video Link</label>
                            <input
                                type="text"
                                value={newSectionVideoLink}
                                onChange={(e) => setNewSectionVideoLink(e.target.value)}
                                placeholder="Enter video link (optional)"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <CustomButton
                            label="Add Section"
                            onClick={addSection}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <CustomButton
                        label="Create Course"
                        onClick={submitForm}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateCoursePage;