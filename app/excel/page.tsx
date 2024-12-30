'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // For App Router

const IntroductionToMSExcel = () => {
    const router = useRouter(); // Initialize router

    const handleNext = () => {
        router.push('/excel1'); // Replace with your actual next page route
    };

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            {/* Title */}
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-600">Introduction to Microsoft Excel</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Discover the powerful world of spreadsheets for organizing, analyzing, and visualizing data.
                </p>
            </header>

            {/* Content Section */}
            <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {/* Overview */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">What is Microsoft Excel?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Microsoft Excel is a spreadsheet program developed by Microsoft. It is widely used for 
                        data organization, analysis, and visualization. With its robust set of features, 
                        Excel has become a vital tool for individuals, businesses, and researchers alike.
                    </p>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Key Features of Excel</h2>
                    <ul className="list-disc list-inside text-gray-600">
                        <li><strong>Data Organization:</strong> Manage data in rows, columns, and sheets.</li>
                        <li><strong>Formulas & Functions:</strong> Perform calculations and automate tasks.</li>
                        <li><strong>Charts & Graphs:</strong> Create visual representations of data.</li>
                        <li><strong>Pivot Tables:</strong> Summarize and analyze large datasets.</li>
                        <li><strong>Conditional Formatting:</strong> Highlight data based on conditions.</li>
                    </ul>
                </div>

                {/* Getting Started */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Getting Started with Excel</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To get started with Excel, follow these steps:
                    </p>
                    <ol className="list-decimal list-inside text-gray-600 mt-4">
                        <li>Open Excel and create a new workbook.</li>
                        <li>Enter data into rows and columns.</li>
                        <li>Use basic formulas like <code>=SUM(A1:A5)</code> to perform calculations.</li>
                        <li>Apply formatting to make your data visually appealing.</li>
                        <li>Save your work frequently to avoid data loss.</li>
                    </ol>
                </div>

                {/* Examples */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Examples of Excel Usage</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Microsoft Excel is used in various domains for tasks such as:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mt-4">
                        <li><strong>Finance:</strong> Budget tracking, financial analysis, and forecasting.</li>
                        <li><strong>Education:</strong> Grade calculation and attendance tracking.</li>
                        <li><strong>Business:</strong> Inventory management, sales analysis, and project planning.</li>
                        <li><strong>Research:</strong> Data analysis and visualization.</li>
                    </ul>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-8">
                    <a
                        href="https://www.microsoft.com/en-us/microsoft-365/excel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
                    >
                        Learn More & Download Excel
                    </a>
                </div>

                {/* Next Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={handleNext}
                        className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
                    >
                        Next
                    </button>
                </div>
            </section>
        </main>
    );
};

export default IntroductionToMSExcel;
